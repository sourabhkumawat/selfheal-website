"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, GitPullRequest, ShieldCheck, Sparkles } from "lucide-react";

type Step = {
  t: string;
  kind: "alert" | "investigate" | "rca" | "pr" | "verify";
  text: string;
  meta?: string;
};

const SCRIPT: Step[] = [
  { t: "00.00", kind: "alert", text: "PagerDuty · checkout-api p99 latency 6.2s (SLO 1.5s)", meta: "P1" },
  { t: "00.04", kind: "investigate", text: "Pulled 14m of logs · 9 services · 412 traces", meta: "context" },
  { t: "00.11", kind: "investigate", text: "Hypothesis 1/4 · DB connection pool exhausted — confirmed", meta: "evidence" },
  { t: "00.18", kind: "rca", text: "Root cause · idle connection leak in `payments-worker@4.12.1`", meta: "RCA" },
  { t: "00.22", kind: "pr", text: "Opened PR #4831 · close conn on retry-after-error path", meta: "+12 / -3" },
  { t: "00.24", kind: "verify", text: "CI green · canary holds 320ms p99 · rollout proposed", meta: "ready to merge" },
];

/** Delay before each step appears (ms). Tuned so the cadence reads naturally. */
const STEP_DELAYS = [900, 950, 1050, 950, 850, 950];
const HOLD_AT_END = 4400;
const RESET_FADE = 700;

/** Custom ease used across the site for a snappy-but-soft feel. */
const EASE = [0.16, 1, 0.3, 1] as const;

const KIND_STYLES: Record<Step["kind"], { chip: string; dot: string; label: string; icon: any }> = {
  alert: { chip: "chip-danger", dot: "bg-danger-400", label: "ALERT", icon: Activity },
  investigate: { chip: "chip-signal", dot: "bg-signal-400", label: "INVESTIGATE", icon: Sparkles },
  rca: { chip: "chip-warn", dot: "bg-warn-400", label: "RCA", icon: Sparkles },
  pr: { chip: "chip-heal", dot: "bg-heal-400", label: "PULL REQUEST", icon: GitPullRequest },
  verify: { chip: "chip-heal", dot: "bg-heal-400", label: "VERIFIED", icon: ShieldCheck },
};

export default function LiveAgent() {
  // How many script rows are currently visible (1..SCRIPT.length).
  const [shown, setShown] = useState(1);
  // Loop counter — only used to give exiting rows unique keys per cycle,
  // so the *appending* rows keep stable identities while the cycle runs.
  const [run, setRun] = useState(0);
  // Sweep-out phase before the loop resets.
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    // Phase 1: sweeping out — wait for exit animations, then reset state.
    if (resetting) {
      const id = setTimeout(() => {
        setShown(1);
        setResetting(false);
        setRun((r) => r + 1);
      }, RESET_FADE);
      return () => clearTimeout(id);
    }

    // Phase 2: end of run — hold the "Incident closed" badge, then trigger sweep.
    if (shown >= SCRIPT.length) {
      const id = setTimeout(() => setResetting(true), HOLD_AT_END);
      return () => clearTimeout(id);
    }

    // Phase 3: schedule the next row.
    const delay = STEP_DELAYS[shown - 1] ?? 900;
    const id = setTimeout(() => setShown((s) => s + 1), delay);
    return () => clearTimeout(id);
  }, [shown, resetting]);

  // What to render — empty during the sweep so AnimatePresence runs exits.
  const visible = resetting ? [] : SCRIPT.slice(0, shown);
  const showCursor = !resetting && shown < SCRIPT.length;
  const showClosed = !resetting && shown >= SCRIPT.length;

  return (
    <div className="glass-card relative overflow-hidden p-1">
      {/* terminal chrome */}
      <div className="flex items-center justify-between gap-3 rounded-t-xl bg-ink-900/80 px-4 py-2.5 border-b border-ink-800/80">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-danger-400/70" />
          <span className="size-2.5 rounded-full bg-warn-400/70" />
          <span className="size-2.5 rounded-full bg-heal-400/70" />
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-ink-300">
          <span className="relative inline-flex size-2 rounded-full bg-heal-400">
            <span className="absolute inset-0 rounded-full bg-heal-400 animate-ping opacity-60" />
          </span>
          heal-agent · on shift
        </div>
        <div className="font-mono text-[11px] text-ink-400">incident-9f3a</div>
      </div>

      {/* scan line */}
      <div className="pointer-events-none absolute inset-x-0 top-10 bottom-0 overflow-hidden rounded-b-xl">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-heal-400/60 to-transparent animate-scan" />
      </div>

      <div className="p-4 sm:p-5 font-mono text-[12.5px] leading-relaxed min-h-[320px]">
        {/* Rows */}
        <LayoutGroup>
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((step) => {
              const k = KIND_STYLES[step.kind];
              return (
                <motion.div
                  // Stable key tied to the loop run — re-render only when the
                  // loop restarts, never when sibling rows append.
                  key={`${run}-${step.t}`}
                  layout
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    y: -6,
                    filter: "blur(3px)",
                    transition: { duration: 0.32, ease: EASE },
                  }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="grid grid-cols-[64px_120px_1fr_auto] items-center gap-3 py-1.5 will-change-transform"
                >
                  <span className="text-ink-400">{step.t}</span>
                  <span className={k.chip}>
                    <span className={`size-1.5 rounded-full ${k.dot}`} />
                    {k.label}
                  </span>
                  <span className="text-ink-100 truncate">{step.text}</span>
                  {step.meta && (
                    <span className="hidden sm:inline text-ink-300 text-[11px]">
                      {step.meta}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </LayoutGroup>

        {/* Listening cursor / closed badge */}
        <AnimatePresence mode="wait">
          {showCursor && (
            <motion.div
              key={`cursor-${run}-${shown}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mt-2 flex items-center gap-2 text-ink-400"
            >
              <span>▍</span>
              <span className="animate-blink">_</span>
              <span className="text-ink-500">listening…</span>
            </motion.div>
          )}

          {showClosed && (
            <motion.div
              key={`closed-${run}`}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, transition: { duration: 0.25 } }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
              className="mt-3 flex items-center gap-2 rounded-md border border-heal-400/30 bg-heal-400/5 px-3 py-2 text-heal-300"
            >
              <ShieldCheck className="size-4" />
              Incident closed · MTTR 24s · 1 PR ready for review
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
