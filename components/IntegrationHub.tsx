"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { fadeUp, stagger } from "@/lib/motion";
import Logo from "./Logo";
import Image from "next/image";

const COMPANY_LOGOS = [
  { name: "At The Rate", src: "/logos/attherate.svg", url: "https://attherate.ai" },
  { name: "Firecoach", src: "/logos/firecoach-logo.svg", url: "https://firecoach.ai" },
  { name: "FMH", src: "/logos/fmh.svg", url: "https://foodmarkethub.com" },
  { name: "Guardr AI", src: "/logos/guardr_ai_logo.png", url: "https://guardr.ai" },
  { name: "Tribe HQ AI", src: "/logos/tribehqai.png", url: "https://tribehq.ai" },
];

const MARQUEE_LOGOS = [
  ...COMPANY_LOGOS,
  ...COMPANY_LOGOS,
  ...COMPANY_LOGOS,
  ...COMPANY_LOGOS,
  ...COMPANY_LOGOS,
  ...COMPANY_LOGOS,
];

/**
 * Integration constellation
 * --------------------------------------------------
 * Every integration HealOps supports, arranged on an
 * ellipse around the central agent. Each chip shows
 * the actual brand logo (Iconify logos collection)
 * so the user can recognise every tool at a glance.
 *
 * Logos are fetched from the Iconify CDN, which serves
 * full-colour, official brand SVGs:
 *   https://api.iconify.design/logos:<slug>.svg
 *
 * To add a new integration, append to the relevant
 * category's `items` array with a {name, slug} pair.
 */

type Item = {
  name: string;
  /** Iconify slug under the `logos` collection */
  slug: string;
};

type Category = {
  key: string;
  label: string;
  color: {
    dot: string;
    chipBorder: string;
    stroke: string;
    label: string;
  };
  /** Arc range (degrees, 0 = top, clockwise) */
  arc: [number, number];
  items: Item[];
};

const CATEGORIES: Category[] = [
  {
    key: "observability",
    label: "Observability",
    color: {
      dot: "bg-signal-400",
      chipBorder: "border-signal-400/25 hover:border-signal-400/50",
      stroke: "rgba(34,211,238,0.55)",
      label: "text-signal-400",
    },
    arc: [318, 32],
    items: [
      { name: "Datadog", slug: "datadog" },
      { name: "Grafana", slug: "grafana" },
      { name: "Sentry", slug: "sentry-icon" },
      { name: "CloudWatch", slug: "aws-cloudwatch" },
      { name: "New Relic", slug: "new-relic" },
    ],
  },
  {
    key: "alerts",
    label: "Alerts",
    color: {
      dot: "bg-warn-400",
      chipBorder: "border-warn-400/25 hover:border-warn-400/50",
      stroke: "rgba(251,191,36,0.55)",
      label: "text-warn-400",
    },
    arc: [42, 95],
    items: [
      { name: "PagerDuty", slug: "pagerduty" },
      { name: "OpsGenie", slug: "opsgenie" },
      { name: "Grafana OnCall", slug: "grafana" },
      { name: "Splunk", slug: "splunk" },
    ],
  },
  {
    key: "comms",
    label: "Comms",
    color: {
      dot: "bg-heal-400",
      chipBorder: "border-heal-400/25 hover:border-heal-400/50",
      stroke: "rgba(52,211,153,0.55)",
      label: "text-heal-400",
    },
    arc: [108, 145],
    items: [
      { name: "Slack", slug: "slack-icon" },
      { name: "MS Teams", slug: "microsoft-teams" },
      { name: "Linear", slug: "linear-icon" },
    ],
  },
  {
    key: "source",
    label: "Source control",
    color: {
      dot: "bg-heal-300",
      chipBorder: "border-heal-400/25 hover:border-heal-400/50",
      stroke: "rgba(110,231,183,0.55)",
      label: "text-heal-300",
    },
    arc: [158, 198],
    items: [
      { name: "GitHub", slug: "github-icon" },
      { name: "GitLab", slug: "gitlab" },
      { name: "Bitbucket", slug: "bitbucket" },
    ],
  },
  {
    key: "data",
    label: "Data platform",
    color: {
      dot: "bg-[#a78bfa]",
      chipBorder: "border-[#a78bfa]/25 hover:border-[#a78bfa]/50",
      stroke: "rgba(167,139,250,0.55)",
      label: "text-[#c4b5fd]",
    },
    arc: [210, 258],
    items: [
      { name: "Airflow", slug: "airflow-icon" },
      { name: "Kafka", slug: "kafka-icon" },
      { name: "Spark", slug: "apache-spark" },
      { name: "dbt", slug: "dbt-icon" },
    ],
  },
  {
    key: "infra",
    label: "Infrastructure",
    color: {
      dot: "bg-ink-200",
      chipBorder: "border-ink-300/25 hover:border-ink-300/50",
      stroke: "rgba(184,188,196,0.55)",
      label: "text-ink-100",
    },
    arc: [270, 312],
    items: [
      { name: "AWS", slug: "aws" },
      { name: "GCP", slug: "google-cloud" },
      { name: "Azure", slug: "microsoft-azure" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Vercel", slug: "vercel-icon" },
    ],
  },
];

const ALL_NODES = CATEGORIES.flatMap((c) =>
  c.items.map((item, i) => ({
    item,
    category: c,
    idx: i,
    total: c.items.length,
  }))
);

const ICONIFY = (slug: string) => `https://api.iconify.design/logos:${slug}.svg`;

// SVG layout
const VB_W = 1400;
const VB_H = 720;
const CX = VB_W / 2;
const CY = VB_H / 2;
const RX = 560;
const RY = 280;
const HUB_R = 110;

function angleFor(category: Category, idx: number, total: number) {
  const [start, end] = category.arc;
  const span = end > start ? end - start : 360 - start + end;
  const step = span / Math.max(total, 1);
  const offset = idx * step + step / 2;
  return (start + offset) % 360;
}

function polar(angleDeg: number, rx = RX, ry = RY) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CX + rx * Math.cos(rad),
    y: CY + ry * Math.sin(rad),
  };
}

function pathToCenter(x: number, y: number) {
  const dx = CX - x;
  const dy = CY - y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const ex = CX - (dx / dist) * (HUB_R + 4);
  const ey = CY - (dy / dist) * (HUB_R + 4);
  const mx = (x + ex) / 2;
  const my = (y + ey) / 2;
  const bowX = mx + (CX - mx) * 0.18;
  const bowY = my + (CY - my) * 0.18;
  return `M ${x} ${y} Q ${bowX} ${bowY} ${ex} ${ey}`;
}

function BrandLogo({
  slug,
  name,
  fallbackDotClass,
}: {
  slug: string;
  name: string;
  fallbackDotClass: string;
}) {
  const [errored, setErrored] = useState(false);
  const initial = name.charAt(0).toUpperCase();

  if (errored) {
    return (
      <span
        className="grid place-items-center size-5 rounded-md bg-ink-800 ring-1 ring-ink-700 shrink-0 font-mono text-[10px] text-ink-100"
        aria-hidden
      >
        <span className={`size-1.5 rounded-full ${fallbackDotClass}`} />
      </span>
    );
  }

  return (
    <span
      className="grid place-items-center size-5 rounded-md bg-white/95 ring-1 ring-white/20 shrink-0"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ICONIFY(slug)}
        alt={`${name} logo`}
        loading="lazy"
        width={14}
        height={14}
        className="size-3.5 object-contain"
        onError={() => setErrored(true)}
      />
    </span>
  );
}

export default function IntegrationHub() {
  const nodes = useMemo(
    () =>
      ALL_NODES.map((n, i) => {
        const angle = angleFor(n.category, n.idx, n.total);
        const p = polar(angle);
        return { ...n, i, angle, x: p.x, y: p.y };
      }),
    []
  );

  return (
    <section className="relative pt-4 pb-24 sm:pb-32">
      {/* Moving Logo Stripe */}
      <div className="w-full mb-12 sm:mb-16 relative">
        <div className="text-center font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-ink-400 uppercase mb-4">
          Trusted by high-performance engineering teams
        </div>
        <div className="mask-fade-x overflow-hidden border-y border-ink-800/40 bg-ink-950/20 py-5 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-heal-500/5 to-transparent pointer-events-none" />
          <div className="flex w-max gap-12 sm:gap-20 animate-marquee py-1 hover:[animation-play-state:paused]">
            {MARQUEE_LOGOS.map((logo, idx) => (
              <a
                key={`${logo.name}-${idx}`}
                href={logo.url}
                target="_blank"
                rel="noreferrer"
                className="relative h-7 w-28 sm:h-9 sm:w-36 shrink-0 flex items-center justify-center filter grayscale opacity-45 hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 112px, 144px"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="eyebrow">
            One agent · every signal · live
          </motion.div>
          <motion.h2 variants={fadeUp} className="heading-lg mt-3">
            HealOps sits in the middle of your stack —{" "}
            <span className="text-ink-300">
              {ALL_NODES.length} integrations, one continuous chain of
              custody from page to pull request.
            </span>
          </motion.h2>
        </motion.div>
      </div>

      {/* ===== Desktop / tablet: full-bleed radial constellation ===== */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="hidden md:block relative mt-10"
      >
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none mask-fade-x" />

        <div className="relative">
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            className="block w-full h-[560px] lg:h-[640px] xl:h-[680px]"
            aria-hidden
          >
            <defs>
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(52,211,153,0.32)" />
                <stop offset="60%" stopColor="rgba(52,211,153,0.05)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>

            <circle cx={CX} cy={CY} r={260} fill="url(#hubGlow)" />

            <ellipse
              cx={CX}
              cy={CY}
              rx={RX}
              ry={RY}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />

            {/* every connector line flows at the same time, slightly offset begin */}
            {nodes.map((n) => {
              const d = pathToCenter(n.x, n.y);
              const c = n.category.color;
              const beginOffset = (n.i % 6) * 0.18;
              return (
                <g key={`line-${n.i}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke={c.stroke}
                    strokeOpacity="0.45"
                    strokeWidth="1.1"
                    strokeDasharray="3 7"
                    strokeLinecap="round"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-200"
                      dur="3s"
                      begin={`-${beginOffset}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                  <circle cx={n.x} cy={n.y} r="2.5" fill={c.stroke} opacity="0.75" />
                </g>
              );
            })}

            {/* central hub disk */}
            <circle
              cx={CX}
              cy={CY}
              r={HUB_R}
              fill="rgba(8,8,10,0.92)"
              stroke="rgba(52,211,153,0.35)"
              strokeWidth="1"
            />
            <circle
              cx={CX}
              cy={CY}
              r={HUB_R + 22}
              fill="none"
              stroke="rgba(52,211,153,0.16)"
              strokeWidth="1"
              strokeDasharray="2 6"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${CX} ${CY}`}
                to={`360 ${CX} ${CY}`}
                dur="40s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* integration chips with real brand logos */}
          {nodes.map((n) => {
            const xPct = (n.x / VB_W) * 100;
            const yPct = (n.y / VB_H) * 100;
            const cc = n.category.color;

            const onLeft = n.x < CX;
            const translateX = onLeft ? "-100%" : "0%";

            return (
              <div
                key={`chip-${n.i}`}
                className="absolute"
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  transform: `translate(${translateX}, -50%) translateX(${onLeft ? "-8px" : "8px"})`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.05 + n.i * 0.025 }}
                  className={`inline-flex items-center gap-2 rounded-full border bg-ink-900/80 backdrop-blur pl-1 pr-3 py-1 font-mono text-[11px] tracking-wide whitespace-nowrap transition-colors ${cc.chipBorder}`}
                >
                  <BrandLogo slug={n.item.slug} name={n.item.name} fallbackDotClass={cc.dot} />
                  <span className="text-ink-100">{n.item.name}</span>
                </motion.div>
              </div>
            );
          })}

          {/* hub centerpiece */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid place-items-center"
            >
              <span className="absolute inset-[-16px] rounded-full border border-heal-400/20 animate-pulse-slow" />
              <span className="absolute inset-[-32px] rounded-full border border-heal-400/10" />
              <div className="relative size-[180px] lg:size-[200px] rounded-full border border-heal-400/30 bg-ink-900/95 backdrop-blur grid place-items-center text-center px-6">
                <div>
                  <div className="flex justify-center">
                    <Logo size={36} withBackground={false} />
                  </div>
                  <div className="mt-2 font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-400">
                    HealOps
                  </div>
                  <div className="mt-0.5 font-display text-[18px] lg:text-[20px] font-medium">
                    heal-agent
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-widest uppercase text-heal-300">
                    <span className="relative inline-flex size-1.5 rounded-full bg-heal-400">
                      <span className="absolute inset-0 rounded-full bg-heal-400 animate-ping opacity-60" />
                    </span>
                    on shift
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* legend strip */}
        <div className="container-x mt-2">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11.5px] font-mono text-ink-300 border-t border-ink-800/60 pt-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {CATEGORIES.map((c) => (
                <span key={c.key} className="flex items-center gap-1.5">
                  <span className={`size-1.5 rounded-full ${c.color.dot}`} />
                  <span className={c.color.label}>{c.label}</span>
                  <span className="text-ink-500">· {c.items.length}</span>
                </span>
              ))}
            </div>
            <div className="text-ink-400">
              {ALL_NODES.length} integrations · 1 agent · live
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===== Mobile fallback: clean grid by category, also with logos ===== */}
      <div className="container-x">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="md:hidden mt-10 space-y-3"
        >
          <div className="glass-card p-5 flex items-center gap-4">
            <Logo size={40} />
            <div>
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink-400">
                HealOps
              </div>
              <div className="font-display text-[18px] font-medium">
                heal-agent · on shift
              </div>
            </div>
            <div className="ml-auto font-mono text-[10.5px] text-ink-400">
              {ALL_NODES.length} live
            </div>
          </div>

          {CATEGORIES.map((c) => (
            <div key={c.key} className="glass-card p-4">
              <div
                className={`font-mono text-[10.5px] tracking-[0.22em] uppercase ${c.color.label}`}
              >
                {c.label}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.items.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-ink-800/80 bg-ink-900/50 pl-1 pr-2 py-1 font-mono text-[11px] text-ink-100"
                  >
                    <BrandLogo slug={item.slug} name={item.name} fallbackDotClass={c.color.dot} />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
