"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin/referrals";

  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(from);
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-display text-3xl font-medium text-brand-ink">Iconic</p>
          <p className="mt-1 text-sm text-brand-ink/50">Admin access</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-[0_8px_32px_rgba(20,44,32,0.08)] px-8 py-8"
        >
          <label className="block text-sm font-medium text-brand-ink mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            className="w-full h-12 rounded-xl border border-brand-sage/35 bg-white px-4 text-brand-ink outline-none transition focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/10"
          />

          {error && (
            <p className="mt-3 text-sm text-red-600">Incorrect password.</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="mt-5 w-full h-12 rounded-xl bg-brand-forest text-brand-cream text-sm font-semibold transition hover:bg-brand-forest/90 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
