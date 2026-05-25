"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cloud, GitBranch, Lock, Workflow } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

export default function Platform() {
  return (
    <section id="bets" className="section">
      <div className="container-x">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="eyebrow">
            Two architectural bets
          </motion.div>
          <motion.h2 variants={fadeUp} className="heading-lg mt-4">
            Two decisions an incident-response vendor structurally
            can't copy without rebuilding from zero.
          </motion.h2>
          <motion.p variants={fadeUp} className="lead mt-5">
            Most "AI on-call" tools are wrappers around a chat window. They
            paste a stack trace into a model and hand the answer back to
            you. HealOps is built on two assumptions that change what an
            SRE agent is allowed to do — and what it's allowed to ship.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          {/* BET 01 */}
          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="glass-card p-7 sm:p-9 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-widest text-ink-400">
                BET 01 · TRUST
              </span>
              <ArrowUpRight className="size-4 text-ink-400" />
            </div>
            <h3 className="mt-4 font-display text-[26px] sm:text-[30px] font-medium leading-tight">
              The fix ships as a{" "}
              <span className="text-heal-400">pull request</span>, not a deploy.
            </h3>
            <p className="mt-4 text-ink-200 leading-relaxed">
              Auto-remediation tools want to push the change. We don't.
              HealOps opens a PR on your repo, with the diff, the
              regression test, and the evidence trail. Your reviewer is
              still the merge button. Production stays under human gates —
              the agent just removes the 3 AM typing.
            </p>

            <div className="mt-7 rounded-xl border border-ink-800 bg-ink-900/60 p-4 font-mono text-[12px] text-ink-200">
              <div className="flex items-center justify-between text-ink-400">
                <span>PR #4831 · payments-worker</span>
                <span className="chip-heal">awaiting review</span>
              </div>
              <div className="mt-3 grid grid-cols-[12px_1fr] gap-x-2 leading-relaxed">
                <span className="text-danger-400">-</span>
                <span className="text-ink-300">conn.retry(after).then(close)</span>
                <span className="text-heal-400">+</span>
                <span className="text-ink-100">await conn.close();  retry(after)</span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-ink-400">
                <span className="chip-heal">+12</span>
                <span className="chip-danger">-3</span>
                <span>ci · 14 checks · all green</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-ink-300 text-sm">
              <GitBranch className="size-4" />
              Reviewer keeps the merge button. Always.
            </div>
          </motion.article>

          {/* BET 02 */}
          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="glass-card p-7 sm:p-9 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-widest text-ink-400">
                BET 02 · CUSTODY
              </span>
              <ArrowUpRight className="size-4 text-ink-400" />
            </div>
            <h3 className="mt-4 font-display text-[26px] sm:text-[30px] font-medium leading-tight">
              Your logs <span className="text-heal-400">stay in your cloud.</span>{" "}
              We pull a slice, on-incident.
            </h3>
            <p className="mt-4 text-ink-200 leading-relaxed">
              The agent reads against a read-only role inside your account.
              There is no HealOps data lake. When an incident fires, we
              fetch the narrow time-and-actor slice the investigation
              needs — nothing else. Zero standing access to your code,
              zero bulk egress of your telemetry.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <Stat label="Logs egressed at rest" value="0 bytes" tone="heal" />
              <Stat label="Standing prod write access" value="None" tone="heal" />
              <Stat label="Slice pulled on incident" value="≈ 14m window" tone="signal" />
              <Stat label="Audit trail" value="every query" tone="signal" />
            </div>

            <div className="mt-6 flex items-center gap-4 text-ink-300 text-sm">
              <span className="flex items-center gap-2">
                <Lock className="size-4" />
                SOC 2 path
              </span>
              <span className="flex items-center gap-2">
                <Cloud className="size-4" />
                Your VPC, your role
              </span>
              <span className="flex items-center gap-2">
                <Workflow className="size-4" />
                No vendor lake
              </span>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "heal" | "signal";
}) {
  const tones = {
    heal: "text-heal-300",
    signal: "text-signal-400",
  };
  return (
    <div className="rounded-lg border border-ink-800/80 bg-ink-900/40 p-3">
      <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-400">
        {label}
      </div>
      <div className={`mt-1.5 font-display text-[18px] ${tones[tone]}`}>{value}</div>
    </div>
  );
}
