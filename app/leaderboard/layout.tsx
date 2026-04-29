import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral Leaderboard | Iconic Landscaping",
  robots: { index: false, follow: false },
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-brand-cream text-brand-ink antialiased">
        {children}
      </body>
    </html>
  );
}
