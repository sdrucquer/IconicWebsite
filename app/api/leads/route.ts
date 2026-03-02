import { NextResponse } from "next/server";

type LeadPayload = {
  fullName: string;
  phone: string;
  services: string[];
  email?: string;
  address?: string;
  timeline?: string;
  message?: string;
  preferredContact?: string;
  website?: string;
  sourcePage?: string;
  pageUrl?: string;
};

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function cleanStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => clean(item))
    .filter(Boolean);
}

function validate(payload: LeadPayload) {
  const fullName = clean(payload.fullName);
  const phone = clean(payload.phone);
  const services = cleanStringArray(payload.services);
  const email = clean(payload.email);
  const address = clean(payload.address);
  const timeline = clean(payload.timeline);
  const message = clean(payload.message);
  const preferredContact = clean(payload.preferredContact);
  const sourcePage = clean(payload.sourcePage);
  const pageUrl = clean(payload.pageUrl);
  const website = clean(payload.website);

  if (!fullName) {
    return { ok: false as const, error: "Name is required." };
  }

  if (!phone || phone.length < 10) {
    return { ok: false as const, error: "Valid phone is required." };
  }

  if (services.length === 0) {
    return { ok: false as const, error: "At least one service is required." };
  }

  return {
    ok: true as const,
    data: {
      fullName,
      phone,
      services,
      email,
      address,
      timeline,
      message,
      preferredContact,
      sourcePage,
      pageUrl,
      website
    }
  };
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = validate(payload);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  // Honeypot: silently accept bots but do not forward.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ ok: false, error: "Missing ZAPIER_WEBHOOK_URL." }, { status: 503 });
  }

  const leadEvent = {
    event: "lead_capture_submitted",
    submittedAt: new Date().toISOString(),
    fullName: parsed.data.fullName,
    phone: parsed.data.phone,
    services: parsed.data.services,
    service: parsed.data.services.join(", "),
    email: parsed.data.email || null,
    address: parsed.data.address || null,
    timeline: parsed.data.timeline || null,
    message: parsed.data.message || null,
    preferredContact: parsed.data.preferredContact || null,
    sourcePage: parsed.data.sourcePage || "unknown",
    pageUrl: parsed.data.pageUrl || null,
    metadata: {
      userAgent: request.headers.get("user-agent") ?? null,
      referer: request.headers.get("referer") ?? null,
      ip:
        request.headers.get("x-forwarded-for") ??
        request.headers.get("x-real-ip") ??
        null
    }
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(leadEvent),
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Zapier webhook rejected request." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not reach Zapier webhook." },
      { status: 502 }
    );
  }
}
