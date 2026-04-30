import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { jobberGraphQL } from "@/lib/jobber";
import { Redis } from "@upstash/redis";

// 3 submissions per IP per minute
const RATE_LIMIT = 3;
const RATE_WINDOW = 60; // seconds

let _rl_redis: Redis | null | undefined = undefined;
function getRLRedis(): Redis | null {
  if (_rl_redis !== undefined) return _rl_redis;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  _rl_redis = url && token ? new Redis({ url, token }) : null;
  return _rl_redis;
}

async function isRateLimited(ip: string): Promise<boolean> {
  const redis = getRLRedis();
  if (!redis) return false; // no KV in local dev — allow all
  const key = `rl:submit-quote:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, RATE_WINDOW);
  return count > RATE_LIMIT;
}

// ---------------------------------------------------------------------------
// Jobber — create client + request via GraphQL (two-step flow)
// ---------------------------------------------------------------------------
async function createJobberRequest(data: SubmitPayload) {
  // Step 1 — Create the client
  const clientMutation = `
    mutation ClientCreate($input: ClientCreateInput!) {
      clientCreate(input: $input) {
        client { id properties { id } }
        userErrors { message }
      }
    }
  `;

  const clientInput: Record<string, unknown> = {
    firstName: data.firstName,
    lastName: data.lastName,
    phones: [{ number: data.phone, primary: true }],
    properties: [{
      address: {
        street1: data.streetAddress,
        city: data.city,
        province: "PA",
        country: "US",
      },
    }],
  };
  if (data.email) {
    clientInput.emails = [{ address: data.email, primary: true }];
  }

  const clientJson = await jobberGraphQL(clientMutation, { input: clientInput }) as Record<string, unknown>;
  console.log("[submit-quote] clientCreate response:", JSON.stringify(clientJson));

  const clientData = clientJson.data as Record<string, unknown> | undefined;
  const clientErrors = (clientData?.clientCreate as Record<string, unknown> | undefined)?.userErrors as { message: string }[] | undefined;
  if (clientErrors?.length) throw new Error(`Jobber client errors: ${clientErrors.map((e) => e.message).join(", ")}`);

  const clientId = ((clientData?.clientCreate as Record<string, unknown> | undefined)?.client as Record<string, unknown> | undefined)?.id as string;
  if (!clientId) throw new Error("Jobber clientCreate returned no client ID");

  const propertyId = (((clientData?.clientCreate as Record<string, unknown> | undefined)?.client as Record<string, unknown> | undefined)?.properties as Record<string, unknown>[] | undefined)?.[0]?.id as string | undefined;

  // Step 2 — Create the request linked to the new client
  const requestMutation = `
    mutation RequestCreate($input: RequestCreateInput!) {
      requestCreate(input: $input) {
        request { id }
        userErrors { message path }
      }
    }
  `;

  const requestJson = await jobberGraphQL(requestMutation, {
    input: {
      clientId,
      ...(propertyId ? { propertyId } : {}),
      title: `Quote Request — ${data.serviceNeeded} [Flyer: ${data.referredBy}]`,
    },
  }) as Record<string, unknown>;
  console.log("[submit-quote] requestCreate response:", JSON.stringify(requestJson));

  const requestData = requestJson.data as Record<string, unknown> | undefined;
  const requestErrors = (requestData?.requestCreate as Record<string, unknown> | undefined)?.userErrors as { message: string }[] | undefined;
  if (requestErrors?.length) throw new Error(`Jobber request errors: ${requestErrors.map((e) => e.message).join(", ")}`);

  const requestId = ((requestData?.requestCreate as Record<string, unknown> | undefined)?.request as Record<string, unknown> | undefined)?.id as string;

  // Add a note so the crew referral is visible on the quote, job, and invoice
  if (requestId) {
    try {
      const lines = [
        "Initial request via flyer form",
        "──────────────────────────────",
        `Service interest: ${data.serviceNeeded}`,
        data.referredBy !== "unknown" ? `Referred by crew: ${data.referredBy}` : null,
        data.notes ? `Customer notes: "${data.notes}"` : null,
        "",
        "Scope is unconfirmed — verify during assessment.",
      ].filter((l) => l !== null).join("\n");
      await addJobberNote(requestId, lines);
    } catch (err) {
      // Note failure is non-fatal — the request was already created successfully.
      console.warn("[submit-quote] Could not add note:", err);
    }
  }

  return requestId;
}

// ---------------------------------------------------------------------------
// Jobber — attach a pinned internal note to the request
// ---------------------------------------------------------------------------
async function addJobberNote(requestId: string, message: string) {
  const mutation = `
    mutation RequestCreateNote($requestId: EncodedId!, $input: RequestCreateNoteInput!) {
      requestCreateNote(requestId: $requestId, input: $input) {
        requestNote { id }
        userErrors { message }
      }
    }
  `;

  const json = await jobberGraphQL(mutation, {
    requestId,
    input: { message, pinned: true },
  }) as Record<string, unknown>;

  console.log("[submit-quote] requestCreateNote response:", JSON.stringify(json));
  const noteData = json.data as Record<string, unknown> | undefined;
  const userErrors = (noteData?.requestCreateNote as Record<string, unknown> | undefined)?.userErrors as { message: string }[] | undefined;
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
    secure: false,
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
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (await isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

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
    await createJobberRequest(data);
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
