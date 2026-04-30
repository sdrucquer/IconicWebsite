/**
 * One-time OAuth setup for the Jobber READER app (leaderboard + admin).
 * This is a separate Jobber app from the writer app (submit-quote).
 *
 * Usage:
 *   JOBBER2_CLIENT_ID=<id> JOBBER2_CLIENT_SECRET=<secret> node scripts/jobber-auth-reader.mjs
 *
 * Before running:
 *   1. In your new Jobber reader app → Redirect URIs, add:
 *        http://localhost:3333/callback
 *   2. Run this script, open the URL it prints, authorize the app
 *   3. Copy the JOBBER2_REFRESH_TOKEN it prints into Vercel env vars
 */

import { createServer } from "http";

const CLIENT_ID = process.env.JOBBER2_CLIENT_ID;
const CLIENT_SECRET = process.env.JOBBER2_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3333/callback";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\nMissing credentials.\nRun with:\n  JOBBER2_CLIENT_ID=<id> JOBBER2_CLIENT_SECRET=<secret> node scripts/jobber-auth-reader.mjs\n"
  );
  process.exit(1);
}

const authUrl =
  `https://api.getjobber.com/api/oauth/authorize` +
  `?response_type=code` +
  `&client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  Jobber Reader App — One-Time Authorization");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("\nStep 1: Open this URL in your browser and click Authorize:\n");
console.log(authUrl);
console.log("\nStep 2: Waiting for Jobber to redirect back...\n");

const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost:3333");
  const code = url.searchParams.get("code");

  if (!code) {
    res.writeHead(400);
    res.end("No authorization code found in the URL.");
    return;
  }

  try {
    const tokenRes = await fetch("https://api.getjobber.com/api/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokens = await tokenRes.json();

    if (!tokens.refresh_token) {
      res.writeHead(500);
      res.end("Token exchange failed. Check terminal for details.");
      console.error("\nJobber response:", JSON.stringify(tokens, null, 2));
      server.close();
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html><body style="font-family:sans-serif;padding:2rem;background:#f5f1e8">
        <h2 style="color:#1F4A22">✅ Authorization complete!</h2>
        <p>Check your terminal for the refresh token to add to Vercel.</p>
        <p>You can close this tab.</p>
      </body></html>
    `);

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("  ✅ SUCCESS — Add these to Vercel Environment Variables:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    console.log(`JOBBER2_CLIENT_ID=${CLIENT_ID}`);
    console.log(`JOBBER2_CLIENT_SECRET=${CLIENT_SECRET}`);
    console.log(`JOBBER2_REFRESH_TOKEN=${tokens.refresh_token}\n`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  } catch (err) {
    res.writeHead(500);
    res.end("Error. Check terminal.");
    console.error("\nError during token exchange:", err);
  } finally {
    server.close();
  }
});

server.listen(3333, () => {});
