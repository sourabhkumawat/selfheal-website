"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

type Row = { label: string; before: string; after: string; healed?: boolean };

const rows: Row[] = [
  {
    label: "What lands on you at 3 AM",
    before: "Pager, stack trace, blank Slack thread",
    after: "PR draft, evidence trail, reviewer button",
    healed: true,
  },
  {
    label: "Time to first hypothesis",
    before: "15–40 min · human paging the team",
    after: "≈ 8 seconds · 4 hypotheses in parallel",
  },
  {
    label: "Output of the investigation",
    before: "A doc someone has to translate to a diff",
    after: "A diff someone just reviews",
    healed: true,
  },
  {
    label: "Regression coverage after the fix",
    before: "Maybe a Jira ticket, maybe never",
    after: "Test that reproduces the incident, in the PR",
  },
  {
    label: "Logs leaving your cloud",
    before: "All of them, on a billable pipe",
    after: "An incident slice. Audited.",
  },
  {
    label: "Standing prod write access",
    before: "Vendor agent has it",
    after: "Nobody — fixes go through your reviewer",
  },
];

export default function Comparison() {
  return (
    <section className="section">
      <div className="container-x">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="eyebrow">
            The on-call rota, before and after
          </motion.div>
          <motion.h2 variants={fadeUp} className="heading-lg mt-4">
            Page the on-call. Or merge the fix.
          </motion.h2>
          <motion.p variants={fadeUp} className="lead mt-5">
            Modern incident response is mostly handoff cost — pager to
            human, human to dashboard, dashboard to repo, repo to reviewer.
            HealOps removes every handoff that doesn't involve a human
            judgement call.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/30"
        >
          <div className="grid grid-cols-3 border-b border-ink-800/80 bg-ink-900/60">
            <div className="px-5 py-4 font-mono text-[11px] tracking-widest text-ink-400 uppercase">
              Dimension
            </div>
            <div className="px-5 py-4 font-mono text-[11px] tracking-widest text-ink-400 uppercase">
              Today's on-call
            </div>
            <div className="px-5 py-4 font-mono text-[11px] tracking-widest text-heal-400 uppercase">
              With HealOps
            </div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className={`grid grid-cols-3 border-t border-ink-800/60 ${
                row.healed ? "bg-heal-400/[0.02]" : ""
              }`}
            >
              <div className="px-5 py-5 text-[14px] text-ink-200">{row.label}</div>
              <div className="px-5 py-5 text-[14px] text-ink-300 flex items-start gap-2.5">
                <X className="mt-0.5 size-4 shrink-0 text-danger-400/70" />
                <span>{row.before}</span>
              </div>
              <div className="px-5 py-5 text-[14px] text-ink-100 flex items-start gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-heal-400" />
                <span>{row.after}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
