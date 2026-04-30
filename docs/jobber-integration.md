# Jobber Integration — How It Works

## Overview

The site connects to Jobber (the field service CRM) to automatically create client records and quote requests when someone fills out the flyer form at `/quote`. The referral dashboard at `/admin/referrals` also reads from Jobber to show crew stats.

All Jobber API calls flow through a single shared library: **`lib/jobber.ts`**.

---

## Architecture

```
lib/jobber.ts                   ← single source of truth for all Jobber auth
  getJobberAccessToken()        ← handles caching, rotation, distributed lock
  jobberGraphQL()               ← convenience wrapper for all GraphQL calls

app/api/submit-quote/route.ts   ← flyer form submission → creates client + request in Jobber
app/admin/referrals/page.tsx    ← reads requests from Jobber, shows crew stats
```

Any future Jobber integration (financial dashboard, job tracker, etc.) should import from `lib/jobber.ts` — never manage tokens inline.

---

## Authentication Flow

Jobber uses OAuth2 with **refresh token rotation**. Every time you exchange a refresh token for an access token, Jobber invalidates the old refresh token and issues a new one. This means the refresh token must be saved after every exchange, or the next request will fail with 401.

### Token Storage

Tokens are stored in **Upstash KV** (Redis), connected to the Vercel project:

| KV Key | Contents |
|--------|----------|
| `jobber:access_token` | Current access token (TTL: 1 hour) |
| `jobber:access_token_expires_at` | Unix timestamp in ms when it expires |
| `jobber:refresh_token` | Latest refresh token (no TTL — must always exist) |
| `jobber:token_refresh_lock` | Distributed lock (TTL: 15 s) |

The `JOBBER_REFRESH_TOKEN` environment variable is only used as a **bootstrap seed** — on the very first request after a new token is generated, the lib reads it from the env var and saves it to KV. After that, KV is the source of truth.

### What Happens on Each Request

1. Check KV for a cached access token with > 60 s left → return it immediately
2. Try to acquire a distributed lock (Redis SETNX)
   - If another instance holds the lock: wait 2 s, re-read the cache (the lock holder updated it), return
3. Re-check cache (another instance may have refreshed while we waited for the lock)
4. Read the refresh token from KV (falls back to `JOBBER_REFRESH_TOKEN` env var if KV is empty)
5. Exchange refresh token → Jobber returns a new access token + new refresh token
6. Save new access token and new refresh token to KV
7. Release the lock

### Why the Distributed Lock?

Vercel runs each API route / page in an isolated serverless function. If two cold-start instances both try to exchange the refresh token simultaneously, one will succeed and one will get a 401 — because Jobber invalidates the token the moment the first exchange completes. The lock ensures only one instance exchanges at a time; the other waits and reuses the result.

---

## Flyer Form → Jobber (`/api/submit-quote`)

When someone submits the form at `/quote?ref=<crewslug>`:

1. The `ref` param is captured client-side and sent as `referredBy` in the POST body
2. The API route validates all required fields and checks the honeypot (`_hp` field)
3. **Jobber — Step 1:** Creates a new client with name, phone, email, and address
4. **Jobber — Step 2:** Creates a request titled `Quote Request — <service> [Flyer: <slug>]` linked to that client
5. **Jobber — Step 3:** Attaches a pinned internal note with service interest, crew referral, and customer notes
6. If Jobber fails for any reason: sends a fallback email to `contact@iconic.land` via Gmail SMTP so no lead is ever lost
7. Returns `{ ok: true }` to the client in both cases (Jobber success or fallback email)

### The `[Flyer: <slug>]` Title Format

The title pattern `[Flyer: jaydenh]` is how the referral dashboard identifies which crew member referred the lead. The regex `/\[Flyer:/i` filters all Jobber requests down to flyer submissions only.

---

## Referral Dashboard (`/admin/referrals`)

- Protected by the admin cookie middleware (`middleware.ts`) — redirects to `/admin/login` if not authenticated
- Server component — fetches all Jobber requests at page load, no client-side data fetching
- Paginates through all Jobber requests (100 at a time) and filters for `[Flyer:` titles
- Aggregates stats per crew member: total requests, this month, converted
- Crew list is defined in `data/crew.ts` — all known crew show even at zero submissions

### Adding a Crew Member

Open `data/crew.ts` and add one line:
```ts
{ slug: "newperson", name: "New Person" },
```
The `slug` must match the `?ref=` value in their QR code URL exactly. Commit and push — Vercel redeploys in ~30 seconds.

---

## Environment Variables

| Variable | Where Set | Purpose |
|----------|-----------|---------|
| `JOBBER_CLIENT_ID` | Vercel env vars | OAuth2 app client ID |
| `JOBBER_CLIENT_SECRET` | Vercel env vars | OAuth2 app client secret |
| `JOBBER_REFRESH_TOKEN` | Vercel env vars | Bootstrap seed only — KV takes over after first use |
| `KV_REST_API_URL` | Auto-set by Upstash integration | KV endpoint |
| `KV_REST_API_TOKEN` | Auto-set by Upstash integration | KV auth token |
| `SMTP_HOST` | Vercel env vars | Gmail SMTP host (smtp.gmail.com) |
| `SMTP_PORT` | Vercel env vars | 587 |
| `SMTP_USER` | Vercel env vars | Gmail address |
| `SMTP_PASS` | Vercel env vars | Gmail App Password (16 chars, no spaces) |
| `ADMIN_PASSWORD` | Vercel env vars | Password to log into /admin |
| `ADMIN_COOKIE_SECRET` | Vercel env vars | Random string used as the session cookie value |

---

## If the Dashboard Shows "Jobber auth failed: 401"

This means the refresh token is stale. Run the one-time setup script:

```bash
node scripts/jobber-auth.mjs
```

This opens a browser, you approve the Jobber OAuth flow, and it prints a fresh refresh token. Paste it into **Vercel → Environment Variables → `JOBBER_REFRESH_TOKEN`** and redeploy. After that, KV handles all rotation automatically.

This should only ever be needed once — unless the Jobber app is revoked or the KV database is deleted.

---

## Jobber GraphQL Field Name Reference

Hard-won field names discovered through API errors. Use these exactly — Jobber's naming is inconsistent.

### Request

| Field | Type | Notes |
|-------|------|-------|
| `id` | String | Encoded ID |
| `title` | String | Contains `[Flyer: slug]` pattern for referral requests |
| `createdAt` | String | ISO timestamp |
| `requestStatus` | String | `pending`, `converted`, `archived` |
| `quotes` | Connection | **Plural.** `quotes { nodes { ... } }` — NOT `quote` |

### Quote (inside `quotes.nodes`)

| Field | Type | Notes |
|-------|------|-------|
| `quoteStatus` | String | **`quoteStatus`** — NOT `status`. Values: `draft`, `sent`, `approved`, `changes_requested`, `archived`, `converted_to_job` |
| `jobs` | Connection | **Plural.** `jobs { nodes { id } }` — NOT `job` |

### Conversion detection logic

A referral counts as earned when:
```ts
const firstQuote = req.quotes?.nodes?.[0];
const quoteStatus = firstQuote?.quoteStatus ?? "";
const hasJob = (firstQuote?.jobs?.nodes?.length ?? 0) > 0;

const isEarned =
  quoteStatus === "approved" ||
  quoteStatus === "converted_to_job" ||
  hasJob;
```

### Full requests query used in leaderboard / admin dashboard

```graphql
query Requests($after: String) {
  requests(first: 100, after: $after) {
    nodes {
      id
      title
      createdAt
      requestStatus
      quotes {
        nodes {
          quoteStatus
          jobs { nodes { id } }
        }
      }
    }
    pageInfo { hasNextPage endCursor }
  }
}
```

---

## Adding a New Jobber Integration

Import from the shared lib:

```ts
import { jobberGraphQL } from "@/lib/jobber";

const result = await jobberGraphQL(`
  query {
    jobs(first: 10) {
      nodes { id title }
    }
  }
`);
```

That's it. Token management, caching, rotation, and race protection are all handled automatically.
