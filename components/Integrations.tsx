"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const groups = [
  {
    label: "Alerts",
    items: ["PagerDuty", "OpsGenie", "Datadog", "Grafana OnCall"],
  },
  {
    label: "Observability",
    items: ["Datadog", "Grafana / Loki", "Sentry", "CloudWatch", "New Relic"],
  },
  {
    label: "Infra",
    items: ["AWS", "GCP", "Azure", "Kubernetes", "Vercel"],
  },
  {
    label: "Data platform",
    items: ["Apache Airflow", "Apache Kafka", "Apache Spark", "dbt"],
  },
  {
    label: "Source",
    items: ["GitHub", "GitLab", "Bitbucket"],
  },
  {
    label: "Comms",
    items: ["Slack", "Microsoft Teams", "Linear"],
  },
];

// The marquee row — we duplicate for a seamless loop
const allLogos = groups.flatMap((g) => g.items);

export default function Integrations() {
  return (
    <section id="integrations" className="section">
      <div className="container-x">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start"
        >
          <div>
            <motion.div variants={fadeUp} className="eyebrow">
              Integrations · plug into what you already run
            </motion.div>
            <motion.h2 variants={fadeUp} className="heading-lg mt-4">
              Reads from your stack.{" "}
              <span className="text-ink-300">Writes only to your repo.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="lead mt-5">
              60+ connectors across observability, infrastructure, source
              control and communication. Connect what you already run —
              HealOps does the correlation, the investigation and the
              fix-in-a-PR on top.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2">
              <span className="chip-heal">Read-only roles</span>
              <span className="chip-signal">No vendor data lake</span>
              <span className="chip">MCP-compatible</span>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-3">
            {groups.map((g) => (
              <div key={g.label} className="glass-card p-5">
                <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-400">
                  {g.label}
                </div>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((i) => (
                    <li
                      key={i}
                      className="rounded-md border border-ink-800/80 bg-ink-900/50 px-2 py-1 text-[12px] text-ink-200"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* marquee */}
        <div className="mt-14 mask-fade-x overflow-hidden">
          <div className="flex w-max gap-10 animate-marquee py-2 font-mono text-[12px] tracking-wider text-ink-400">
            {[...allLogos, ...allLogos].map((name, idx) => (
              <span
                key={`${name}-${idx}`}
                className="inline-flex items-center gap-2"
              >
                <span className="size-1.5 rounded-full bg-heal-400/60" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
