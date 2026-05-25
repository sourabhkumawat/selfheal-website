import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HealOps — the AI SRE that ships the fix",
  description:
    "HealOps is an autonomous SRE agent that investigates production incidents, finds the root cause, and opens a reviewed pull request that closes the loop.",
  metadataBase: new URL("https://healops.ai"),
  openGraph: {
    title: "HealOps — the AI SRE that ships the fix",
    description:
      "Investigation, root cause, and the pull request that closes the incident. One agent.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-ink-950 text-ink-100 antialiased selection:bg-heal-400/30 selection:text-heal-200">
        {children}
      </body>
    </html>
  );
}
