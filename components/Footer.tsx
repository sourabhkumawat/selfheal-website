"use client";

import Link from "next/link";
import Logo from "./Logo";
import { BOOKING_URL, FOUNDERS_EMAIL } from "@/lib/links";

const cols = [
  {
    title: "Platform",
    items: [
      { label: "How HealOps works", href: "#loop" },
      { label: "Architectural bets", href: "#bets" },
      { label: "Integrations", href: "#integrations" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "The Heal Loop", href: "#loop" },
      { label: "Architecture", href: "#bets" },
      { label: "Engineering blog", href: "#" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Book a demo", href: BOOKING_URL },
      { label: "Email the founders", href: `mailto:${FOUNDERS_EMAIL}` },
      { label: "Report a vulnerability", href: "mailto:security@healops.ai" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-10 border-t border-ink-800/80">
      <div className="container-x">
        <div className="grid lg:grid-cols-[1.2fr_2fr] gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Logo size={30} />
              <span className="font-display text-[15px] font-semibold tracking-tight">
                HealOps<span className="text-heal-400">.ai</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[14px] text-ink-300 leading-relaxed">
              The autonomous SRE that doesn't just find the bug — it ships
              the fix. One agent for the whole incident loop, from page to
              pull request.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip-heal">SOC 2 path</span>
              <span className="chip">Logs stay in your cloud</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-400">
                  {c.title}
                </div>
                <ul className="mt-3 space-y-2">
                  {c.items.map((it) => (
                    <li key={it.label}>
                      <Link
                        href={it.href}
                        className="text-[14px] text-ink-200 hover:text-heal-300"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="divider-glow mt-12" />

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11.5px] text-ink-400">
          <div>© {new Date().getFullYear()} HealOps, Inc. · all incidents close.</div>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-ink-200">Privacy</Link>
            <Link href="#" className="hover:text-ink-200">Acceptable use</Link>
            <Link href="#" className="hover:text-ink-200">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
