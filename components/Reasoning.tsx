'use client';

import { motion } from 'framer-motion';
import {
    GitBranch,
    Network,
    Brain,
    Sparkles,
    CircuitBoard
} from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';

const hypotheses = [
    {
        label: 'Bad deploy',
        state: 'refuted',
        note: 'git history quiet for 14h'
    },
    {
        label: 'DB pool exhausted',
        state: 'confirmed',
        note: 'pg_stat_activity diff +812'
    },
    {
        label: 'Upstream provider',
        state: 'refuted',
        note: 'downstream peers green'
    },
    { label: 'Cache stampede', state: 'refuted', note: 'hit-rate unchanged' }
];

const stateChip: Record<string, string> = {
    confirmed: 'chip-heal',
    refuted: 'chip'
};

export default function Reasoning() {
    return (
        <section className="section relative">
            <div className="absolute inset-0 grid-bg grid-bg-fade opacity-30 pointer-events-none" />

            <div className="container-x relative">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    className="max-w-3xl"
                >
                    <motion.div variants={fadeUp} className="eyebrow">
                        How selfheal reasons
                    </motion.div>
                    <motion.h2 variants={fadeUp} className="heading-lg mt-4">
                        Test every hypothesis in parallel.{' '}
                        <span className="text-ink-300">
                            Correlate every signal simultaneously. Land the
                            answer in seconds, not hours.
                        </span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="lead mt-5">
                        Manual investigation is sequential — open a dashboard,
                        eyeball a chart, page a colleague, repeat. selfheal fans
                        out the investigation across every candidate failure
                        mode at once, lets the evidence vote, and stops the
                        moment one hypothesis is decisively confirmed.
                    </motion.p>
                </motion.div>

                <div className="mt-14 grid lg:grid-cols-[1fr_1fr] gap-6">
                    {/* parallel hypothesis pane */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        className="glass-card p-6 sm:p-8"
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <CircuitBoard className="size-4 text-heal-400" />
                            <span className="font-mono text-[11px] tracking-widest uppercase text-ink-300">
                                4 hypotheses · running in parallel
                            </span>
                        </div>

                        <div className="space-y-3">
                            {hypotheses.map((h, i) => (
                                <motion.div
                                    key={h.label}
                                    initial={{ opacity: 0, x: -8 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: i * 0.08
                                    }}
                                    className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
                                        h.state === 'confirmed'
                                            ? 'border-heal-400/40 bg-heal-400/[0.04]'
                                            : 'border-ink-800 bg-ink-900/30'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <GitBranch
                                            className={`size-4 ${
                                                h.state === 'confirmed'
                                                    ? 'text-heal-400'
                                                    : 'text-ink-500'
                                            }`}
                                        />
                                        <span
                                            className={`font-mono text-[12.5px] ${
                                                h.state === 'confirmed'
                                                    ? 'text-ink-100'
                                                    : 'text-ink-300 line-through decoration-ink-500/60'
                                            }`}
                                        >
                                            {h.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="hidden sm:inline font-mono text-[11px] text-ink-400">
                                            {h.note}
                                        </span>
                                        <span className={stateChip[h.state]}>
                                            {h.state}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-5 flex items-center gap-2 text-ink-300 text-sm">
                            <Sparkles className="size-4 text-heal-400" />
                            Decisively confirmed in 8s — three branches
                            discarded with evidence, one survived with proof.
                        </div>
                    </motion.div>

                    {/* source of truth pane */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        className="glass-card p-6 sm:p-8 relative overflow-hidden"
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <Network className="size-4 text-signal-400" />
                            <span className="font-mono text-[11px] tracking-widest uppercase text-ink-300">
                                A single source of truth · connected
                            </span>
                        </div>

                        <h3 className="font-display text-[22px] font-medium leading-snug">
                            Investigations stop being scattered.
                        </h3>
                        <p className="mt-3 text-ink-200 leading-relaxed">
                            Logs in Datadog, metrics in Grafana, configs in Git,
                            runbooks in Notion, post-mortems in Slack. Each tool
                            saw part of what happened. None of them saw the
                            whole thing. selfheal reads them all and stitches
                            the evidence into one timeline — the same one that
                            ships in the PR.
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-2">
                            {[
                                {
                                    label: 'Observability',
                                    v: 'Datadog · Grafana · Sentry'
                                },
                                {
                                    label: 'Infrastructure',
                                    v: 'AWS · k8s · Vercel'
                                },
                                { label: 'Source', v: 'GitHub · GitLab' },
                                {
                                    label: 'Team knowledge',
                                    v: 'Slack · Notion · runbooks'
                                }
                            ].map((row) => (
                                <div
                                    key={row.label}
                                    className="rounded-lg border border-ink-800 bg-ink-900/40 p-3"
                                >
                                    <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-400">
                                        {row.label}
                                    </div>
                                    <div className="mt-1 text-[12.5px] text-ink-200">
                                        {row.v}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* learning row */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mt-6 glass-card p-7 sm:p-9 grid lg:grid-cols-[1fr_auto] items-center gap-6"
                >
                    <div className="flex items-start gap-4">
                        <div className="grid place-items-center size-11 rounded-lg bg-heal-400/10 ring-1 ring-heal-400/25 shrink-0">
                            <Brain className="size-5 text-heal-400" />
                        </div>
                        <div>
                            <h3 className="font-display text-[22px] font-medium leading-snug">
                                Every closed incident makes the next page
                                easier.
                            </h3>
                            <p className="mt-2 text-ink-200 leading-relaxed max-w-2xl">
                                The verified fix becomes a runbook entry, a
                                regression test, and a memorised pattern.
                                Re-occurrences are investigated in a fraction of
                                the original time — or prevented before the page
                                ever fires. selfheal gets quieter every quarter,
                                on purpose.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 sm:flex sm:flex-col gap-3 lg:min-w-[200px]">
                        <Stat
                            label="Repeat incidents"
                            value="↓ 73%"
                            tone="heal"
                        />
                        <Stat label="P1 pages / wk" value="↓ 41%" tone="heal" />
                        <Stat
                            label="MTTR drift"
                            value="−0.4× / qtr"
                            tone="signal"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Stat({
    label,
    value,
    tone
}: {
    label: string;
    value: string;
    tone: 'heal' | 'signal';
}) {
    const tones = { heal: 'text-heal-300', signal: 'text-signal-400' };
    return (
        <div className="rounded-lg border border-ink-800 bg-ink-900/40 p-3">
            <div className="font-mono text-[10px] tracking-widest uppercase text-ink-400">
                {label}
            </div>
            <div className={`mt-1 font-display text-[18px] ${tones[tone]}`}>
                {value}
            </div>
        </div>
    );
}
