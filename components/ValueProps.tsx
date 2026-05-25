"use client";

import { motion } from "framer-motion";
import { Activity, GitPullRequest, ShieldCheck, BookOpen } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

const items = [
  {
    n: "01",
    icon: Activity,
    title: "Investigate",
    body:
      "Structured, deterministic investigation — parallel hypotheses, evidence collected from your logs, metrics and configs, with a fully auditable trail.",
    chip: "evidence-backed",
  },
  {
    n: "02",
    icon: GitPullRequest,
    title: "Heal",
    body:
      "The missing last mile. HealOps opens a reviewed pull request on the offending service with the minimal patch and a test that reproduces the incident.",
    chip: "the diff that closes the page",
    accent: true,
  },
  {
    n: "03",
    icon: ShieldCheck,
    title: "Verify",
    body:
      "The fix is canary-tested against the original failure mode before anyone sees a Slack message. Verified before it's escalated, not after it's merged.",
    chip: "canary held",
  },
  {
    n: "04",
    icon: BookOpen,
    title: "Learn",
    body:
      "Every closed incident becomes a runbook entry, a regression test, and a sharper signal for the next page. HealOps gets quieter over time on purpose.",
    chip: "quieter every quarter",
  },
];

export default function ValueProps() {
  return (
    <section id="platform" className="section">
      <div className="container-x">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="eyebrow">
            What HealOps does
          </motion.div>
          <motion.h2 variants={fadeUp} className="heading-lg mt-4">
            Most "AI SRE" tools find the root cause.
            <br />
            <span className="text-heal-400">HealOps closes the loop with a pull request.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="lead mt-5">
            Every page these days ends the same way — a tired engineer
            translating a great RCA into a small diff at 3 AM. HealOps
            writes that diff. Reviewed by you. Tested before you read it.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.n}
                variants={fadeUp}
                className={`glass-card relative p-6 transition-all duration-300 hover:-translate-y-1 ${
                  it.accent ? "ring-1 ring-heal-400/30 bg-heal-400/[0.03]" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[11px] tracking-widest text-ink-400">
                    {it.n}
                  </span>
                  <Icon
                    className={`size-5 ${
                      it.accent ? "text-heal-400" : "text-ink-300"
                    }`}
                    strokeWidth={1.7}
                  />
                </div>
                <h3 className="font-display text-[20px] font-medium">
                  {it.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-200">
                  {it.body}
                </p>
                <div className="mt-5 pt-5 border-t border-ink-800/80">
                  <span
                    className={`font-mono text-[11px] tracking-wider ${
                      it.accent ? "text-heal-300" : "text-ink-300"
                    }`}
                  >
                    {it.chip}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
