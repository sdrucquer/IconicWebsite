/**
 * One-time Jobber OAuth setup script.
 * Run this once to get your JOBBER_REFRESH_TOKEN, then add it to Vercel.
 *
 * Usage:
 *   node scripts/jobber-auth.mjs
 *
 * Before running:
 *   1. In Jobber → Settings → Developer Tools → your app → Redirect URIs
 *      Add:  http://localhost:3333/callback
 *   2. Run this script, open the URL it prints, authorize the app
 *   3. Copy the JOBBER_REFRESH_TOKEN it prints into Vercel env vars
 */

import { createServer } from "http";

const CLIENT_ID = "c92a7b7e-08bf-4ae8-839d-9efec7c2b6e1";
const CLIENT_SECRET = process.env.JOBBER_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3333/callback";

if (!CLIENT_SECRET) {
  console.error(
    "\nMissing JOBBER_CLIENT_SECRET.\nRun with:\n  JOBBER_CLIENT_SECRET=your_secret node scripts/jobber-auth.mjs\n"
  );
  process.exit(1);
}

const authUrl =
  `https://api.getjobber.com/api/oauth/authorize` +
  `?response_type=code` +
  `&client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  Jobber One-Time Authorization");
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
    console.log("  ✅ SUCCESS — Add this to Vercel Environment Variables:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    console.log(`JOBBER_REFRESH_TOKEN=${tokens.refresh_token}\n`);
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
