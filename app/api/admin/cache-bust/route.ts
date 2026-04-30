import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export async function POST(request: Request) {
  // Require admin cookie
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/iconic_admin=([^;]+)/);
  const secret = process.env.ADMIN_COOKIE_SECRET ?? "";
  if (!secret || match?.[1] !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return NextResponse.json({ error: "KV not configured" }, { status: 500 });
  }

  const redis = new Redis({ url, token });
  await redis.del("leaderboard:stats", "admin:flyer_requests");

  return NextResponse.json({ ok: true });
}
