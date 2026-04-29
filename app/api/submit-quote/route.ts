import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ---------------------------------------------------------------------------
// Token cache — reused within a warm Vercel instance so we don't authenticate
// on every single request. Re-authenticates when expired or missing.
//
// Refresh token rotation: Jobber issues a new refresh_token on every exchange.
// We persist the latest one in JOBBER_REFRESH_TOKEN_LIVE (an env var we update
// via the Vercel API) so cold starts always have the current token.
// ---------------------------------------------------------------------------
let cachedToken: string | null = null;
let tokenExpiresAt = 0;
let cachedRefreshToken: string | null = null; // latest rotated token, in-memory

async function persistRefreshToken(token: string) {
  // Write the new refresh token back to the Vercel environment variable so
  // the next cold start picks it up. Requires VERCEL_ACCESS_TOKEN + VERCEL_PROJECT_ID.
  const accessToken = process.env.VERCEL_ACCESS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID; // optional, only needed for team projects
  if (!accessToken || !projectId) return; // skip silently if not configured

  const url = `https://api.vercel.com/v10/projects/${projectId}/env${teamId ? `?teamId=${teamId}` : ""}`;
  console.log(`[submit-quote] persistRefreshToken: listing env vars for project ${projectId.slice(0, 8)}...`);

  try {
    // Find the existing env var ID first
    const listRes = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    if (!listRes.ok) {
      console.log(`[submit-quote] persistRefreshToken: list failed (${listRes.status}): ${await listRes.text()}`);
      return;
    }
    const list = await listRes.json();
    const existing = (list.envs as { key: string; id: string }[])?.find(
      (e) => e.key === "JOBBER_REFRESH_TOKEN"
    );
    if (!existing) {
      console.log("[submit-quote] persistRefreshToken: JOBBER_REFRESH_TOKEN not found in env list");
      return;
    }

    // Patch the value
    const patchRes = await fetch(`https://api.vercel.com/v10/projects/${projectId}/env/${existing.id}${teamId ? `?teamId=${teamId}` : ""}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: token }),
      cache: "no-store",
    });
    if (patchRes.ok) {
      console.log(`[submit-quote] persistRefreshToken: updated JOBBER_REFRESH_TOKEN to ${token.slice(0, 8)}...`);
    } else {
      console.log(`[submit-quote] persistRefreshToken: patch failed (${patchRes.status}): ${await patchRes.text()}`);
    }
  } catch (err) {
    console.log("[submit-quote] persistRefreshToken error:", err);
  }
}

async function getJobberToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt - 60_000) {
    return cachedToken;
  }

  // Use the latest rotated refresh token if we have one in memory,
  // otherwise fall back to the env var (first cold start after deploy).
  const refreshToken = cachedRefreshToken ?? process.env.JOBBER_REFRESH_TOKEN ?? "";
  console.log(`[submit-quote] Using refresh token: ${refreshToken.slice(0, 8)}... client_id: ${(process.env.JOBBER_CLIENT_ID ?? "").slice(0, 8)}...`);

  const res = await fetch("https://api.getjobber.com/api/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.JOBBER_CLIENT_ID ?? "",
      client_secret: process.env.JOBBER_CLIENT_SECRET ?? "",
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Jobber auth failed (${res.status}): ${await res.text()}`);
  }

  const json = await res.json();
  cachedToken = json.access_token as string;
  tokenExpiresAt = now + (json.expires_in as number) * 1000;

  // Capture the new refresh token Jobber issued and persist it
  if (json.refresh_token && json.refresh_token !== refreshToken) {
    cachedRefreshToken = json.refresh_token as string;
    void persistRefreshToken(cachedRefreshToken);
  }

  return cachedToken;
}

// ---------------------------------------------------------------------------
// Jobber — create the request via GraphQL
// ---------------------------------------------------------------------------
async function createJobberRequest(data: SubmitPayload, token: string) {
  const mutation = `
    mutation RequestCreate($input: RequestCreateInput!) {
      requestCreate(input: $input) {
        request { id }
        userErrors { message path }
      }
    }
  `;

  // Jobber requests don't support custom fields — we embed the crew referral
  // in the title and details so it's visible immediately in Jobber.
  const referralNote = data.referredBy !== "unknown"
    ? `Flyer referral: ${data.referredBy}\n\n`
    : "";

  const variables = {
    input: {
      title: `Quote Request — ${data.serviceNeeded} [Flyer: ${data.referredBy}]`,
      clientFirstName: data.firstName,
      clientLastName: data.lastName,
      clientPhone: data.phone,
      ...(data.email ? { clientEmail: data.email } : {}),
      property: {
        address: {
          street: data.streetAddress,
          city: data.city,
          province: "PA",
          country: "US",
        },
      },
      details: `${referralNote}${data.notes || ""}`.trim(),
    },
  };

  const res = await fetch("https://api.getjobber.com/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-JOBBER-GRAPHQL-VERSION": "2026-04-16",
    },
    body: JSON.stringify({ query: mutation, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Jobber GraphQL HTTP error: ${res.status}`);
  }

  const json = await res.json();
  console.log("[submit-quote] Jobber GraphQL response:", JSON.stringify(json));

  const userErrors = json.data?.requestCreate?.userErrors as
    | { message: string }[]
    | undefined;
  if (userErrors && userErrors.length > 0) {
    throw new Error(`Jobber user errors: ${userErrors.map((e) => e.message).join(", ")}`);
  }

  const requestId = json.data?.requestCreate?.request?.id as string;

  // Add a note to the request so the crew referral is visible on the quote,
  // job, and invoice when the request is converted through the workflow.
  if (requestId && data.referredBy !== "unknown") {
    try {
      await addJobberNote(requestId, `Flyer referral: ${data.referredBy}`, token);
    } catch (err) {
      // Note failure is non-fatal — the request was already created successfully.
      console.warn("[submit-quote] Could not add referral note:", err);
    }
  }

  return requestId;
}

// ---------------------------------------------------------------------------
// Jobber — attach a note to the request (carries through to quote/job/invoice)
// ---------------------------------------------------------------------------
async function addJobberNote(subjectId: string, content: string, token: string) {
  const mutation = `
    mutation NoteCreate($input: NoteCreateInput!) {
      noteCreate(input: $input) {
        note { id }
        userErrors { message }
      }
    }
  `;

  const res = await fetch("https://api.getjobber.com/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-JOBBER-GRAPHQL-VERSION": "2026-04-16",
    },
    body: JSON.stringify({
      query: mutation,
      variables: { input: { subjectId, content } },
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Note HTTP error: ${res.status}`);

  const json = await res.json();
  const userErrors = json.data?.noteCreate?.userErrors as { message: string }[] | undefined;
  if (userErrors?.length) throw new Error(userErrors.map((e) => e.message).join(", "));
}

// ---------------------------------------------------------------------------
// Fallback email via Gmail SMTP
// Fires only when Jobber is unreachable — no lead is ever lost.
// ---------------------------------------------------------------------------
async function sendFallbackEmail(data: SubmitPayload, reason: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false, // TLS via STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: "contact@iconic.land",
    subject: `[FALLBACK] New Quote Request — ${data.firstName} ${data.lastName}`,
    html: `
      <h2 style="color:#1F4A22">New Quote Request (Jobber Fallback)</h2>
      <p><strong>Jobber error:</strong> ${reason}</p>
      <hr />
      <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:6px 12px;font-weight:bold">Name</td><td style="padding:6px 12px">${data.firstName} ${data.lastName}</td></tr>
        <tr style="background:#f5f1e8"><td style="padding:6px 12px;font-weight:bold">Phone</td><td style="padding:6px 12px">${data.phone}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold">Email</td><td style="padding:6px 12px">${data.email || "—"}</td></tr>
        <tr style="background:#f5f1e8"><td style="padding:6px 12px;font-weight:bold">Address</td><td style="padding:6px 12px">${data.streetAddress}, ${data.city}, PA</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold">Service</td><td style="padding:6px 12px">${data.serviceNeeded}</td></tr>
        <tr style="background:#f5f1e8"><td style="padding:6px 12px;font-weight:bold">Notes</td><td style="padding:6px 12px">${data.notes || "—"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold">Referred By</td><td style="padding:6px 12px">${data.referredBy}</td></tr>
        <tr style="background:#f5f1e8"><td style="padding:6px 12px;font-weight:bold">Submitted</td><td style="padding:6px 12px">${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}</td></tr>
      </table>
    `,
  });
}

// ---------------------------------------------------------------------------
// Request validation
// ---------------------------------------------------------------------------
type SubmitPayload = {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  phone: string;
  serviceNeeded: string;
  notes?: string;
  email?: string;
  referredBy: string;
  _hp?: string; // honeypot
};

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  let raw: SubmitPayload;

  try {
    raw = (await request.json()) as SubmitPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const firstName = clean(raw.firstName);
  const lastName = clean(raw.lastName);
  const streetAddress = clean(raw.streetAddress);
  const city = clean(raw.city);
  const phone = clean(raw.phone);
  const serviceNeeded = clean(raw.serviceNeeded);
  const referredBy = clean(raw.referredBy) || "unknown";
  const notes = clean(raw.notes);
  const email = clean(raw.email);
  const hp = clean(raw._hp);

  if (!firstName || !lastName)
    return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
  if (!phone || phone.length < 10)
    return NextResponse.json({ ok: false, error: "Valid phone is required." }, { status: 400 });
  if (!streetAddress || !city)
    return NextResponse.json({ ok: false, error: "Address is required." }, { status: 400 });
  if (!serviceNeeded)
    return NextResponse.json({ ok: false, error: "Service is required." }, { status: 400 });

  // Honeypot — silently accept bot submissions without processing them
  if (hp) {
    return NextResponse.json({ ok: true });
  }

  const data: SubmitPayload = {
    firstName,
    lastName,
    streetAddress,
    city,
    phone,
    serviceNeeded,
    referredBy,
    notes,
    email,
  };

  // Step 1 — Try Jobber
  try {
    const token = await getJobberToken();
    await createJobberRequest(data, token);
    return NextResponse.json({ ok: true });
  } catch (jobberError) {
    const reason =
      jobberError instanceof Error ? jobberError.message : "Unknown Jobber error";
    console.error("[submit-quote] Jobber failed:", reason);

    // Step 2 — Fallback email so the lead is never lost
    try {
      await sendFallbackEmail(data, reason);
      console.log("[submit-quote] Fallback email sent successfully.");
      return NextResponse.json({ ok: true });
    } catch (emailError) {
      console.error("[submit-quote] Fallback email also failed:", emailError);
      return NextResponse.json(
        { ok: false, error: "Submission failed. Please call us directly." },
        { status: 500 }
      );
    }
  }
}
