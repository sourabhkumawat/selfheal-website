"use client";

import { motion } from "framer-motion";
import { Gauge, GitMerge, Brain } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

const stats = [
  {
    icon: Gauge,
    headline: "10× faster",
    sub: "Mean time to resolution — investigation that lands while you're still loading the dashboard.",
  },
  {
    icon: GitMerge,
    headline: "Durable fixes, not patches",
    sub: "The PR description ships with a regression test that reproduces the incident in under two seconds.",
  },
  {
    icon: Brain,
    headline: "Senior context for everyone",
    sub: "Every on-call gets the depth of investigation that used to live in a single staff engineer's head.",
  },
];

export default function StatsStrip() {
  return (
    <section className="relative -mt-6 pb-12">
      <div className="container-x">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.headline}
                variants={fadeUp}
                custom={i}
                className="glass-card p-6 group"
              >
                <div className="flex items-center justify-between">
                  <div className="grid place-items-center size-10 rounded-lg bg-heal-400/10 ring-1 ring-heal-400/25">
                    <Icon className="size-5 text-heal-400" strokeWidth={1.8} />
                  </div>
                  <span className="font-mono text-[10.5px] tracking-widest text-ink-400 uppercase">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-5 font-display text-[22px] font-medium leading-snug">
                  {s.headline}
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-300">
                  {s.sub}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
