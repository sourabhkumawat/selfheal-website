'use client';

import { motion } from 'framer-motion';
import {
    AlertTriangle,
    Database,
    FlaskConical,
    Search,
    GitPullRequest,
    GraduationCap
} from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';

const steps = [
    {
        n: '01',
        title: 'Detect',
        body: 'Ingest the alert from Datadog, Grafana, Sentry, CloudWatch or PagerDuty. selfheal reads the page like a human on-call — context first.',
        icon: AlertTriangle,
        tone: 'warn'
    },
    {
        n: '02',
        title: 'Correlate',
        body: "Assemble evidence from logs, metrics, traces, configs and dependency graphs. Only what's tied to this incident — nothing else leaves your cloud.",
        icon: Database,
        tone: 'signal'
    },
    {
        n: '03',
        title: 'Hypothesize',
        body: 'Frame the candidate failure modes — bad deploy, dependency flake, leak, quota, regression. Each becomes a parallel investigation branch.',
        icon: FlaskConical,
        tone: 'signal'
    },
    {
        n: '04',
        title: 'Investigate',
        body: 'Run all hypotheses in parallel against your observability stack. Drop the ones the evidence refutes. Lock in the one it confirms.',
        icon: Search,
        tone: 'signal'
    },
    {
        n: '05',
        title: 'Heal',
        body: 'Open a pull request on the source repo — minimal diff, regression test, RCA in the description, every claim linked to the evidence that produced it.',
        icon: GitPullRequest,
        tone: 'heal',
        accent: true
    },
    {
        n: '06',
        title: 'Learn',
        body: 'Promote the verified fix into a runbook entry and a continuous regression check. The next incident of this shape never makes it to PagerDuty.',
        icon: GraduationCap,
        tone: 'heal'
    }
];

const toneStyles: Record<string, { ring: string; icon: string; chip: string }> =
    {
        warn: {
            ring: 'ring-warn-400/20',
            icon: 'text-warn-400 bg-warn-400/10 ring-warn-400/30',
            chip: 'text-warn-400'
        },
        signal: {
            ring: 'ring-signal-400/20',
            icon: 'text-signal-400 bg-signal-400/10 ring-signal-400/30',
            chip: 'text-signal-400'
        },
        heal: {
            ring: 'ring-heal-400/30',
            icon: 'text-heal-400 bg-heal-400/10 ring-heal-400/30',
            chip: 'text-heal-400'
        }
    };

export default function HowItWorks() {
    return (
        <section id="loop" className="section">
            <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40 pointer-events-none" />
            <div className="container-x relative">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    className="max-w-3xl"
                >
                    <motion.div variants={fadeUp} className="eyebrow">
                        The Heal Loop · six steps · one agent
                    </motion.div>
                    <motion.h2 variants={fadeUp} className="heading-lg mt-4">
                        Alert in. Pull request out.{' '}
                        <span className="text-ink-300">
                            Everything in between is automated, auditable, and
                            parallel.
                        </span>
                    </motion.h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative mt-16">
                    {/* connector line */}
                    <div className="pointer-events-none absolute left-0 right-0 top-[44px] hidden lg:block">
                        <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-heal-400/40 to-transparent" />
                    </div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 relative"
                    >
                        {steps.map((s, idx) => {
                            const Icon = s.icon;
                            const t = toneStyles[s.tone];
                            return (
                                <motion.div
                                    key={s.n}
                                    variants={fadeUp}
                                    custom={idx}
                                    className={`relative glass-card p-5 ${s.accent ? 'ring-1 ring-heal-400/30' : ''}`}
                                >
                                    <div
                                        className={`grid place-items-center size-10 rounded-lg ring-1 ${t.icon}`}
                                    >
                                        <Icon
                                            className="size-5"
                                            strokeWidth={1.8}
                                        />
                                    </div>
                                    <div className="mt-4 font-mono text-[11px] tracking-widest text-ink-400">
                                        STEP {s.n}
                                    </div>
                                    <h3 className="mt-1 font-display text-[18px] font-medium">
                                        {s.title}
                                    </h3>
                                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-300">
                                        {s.body}
                                    </p>
                                    {s.accent && (
                                        <div className="mt-4 chip-heal w-fit">
                                            closes the page
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mt-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch"
                >
                    <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
                        <div className="eyebrow">
                            Why one agent for the whole loop
                        </div>
                        <div className="mt-3 font-display text-[22px] font-medium">
                            Investigation and remediation are the same job.
                        </div>
                        <p className="mt-3 text-ink-200 max-w-xl leading-relaxed">
                            Tools that stop at "root cause report" force someone
                            to re-derive the patch from the evidence — at 3 AM,
                            under pager pressure, with the context already
                            half-gone. selfheal keeps every link between
                            symptom, hypothesis, evidence and diff in one
                            continuous chain, so the PR description is just the
                            investigation, written down.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            <span className="chip-signal">
                                01 → 04 · investigate
                            </span>
                            <span className="chip-heal">
                                05 → 06 · heal &amp; learn
                            </span>
                            <span className="chip">
                                one agent · one chain of custody
                            </span>
                        </div>
                    </div>

                    <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
                        <div className="eyebrow">
                            A real PR description, written by selfheal
                        </div>
                        <pre className="mt-4 rounded-lg border border-ink-800 bg-ink-900/60 p-4 font-mono text-[12px] leading-relaxed text-ink-200 overflow-x-auto">
                            {`fix(payments-worker): close DB connection on retry-after-error path

incident:    incident-9f3a · checkout-api p99 6.2s (SLO 1.5s)
root cause:  pool exhausted — connections leaked when a retry was
             scheduled before close() ran. confirmed against
             40m of cloudtrail + pg_stat_activity diff.

evidence:    https://selfheal.ai/i/9f3a   (auditable trail)
regression:  added e2e test that reproduces the leak in <2s.

verified:    canary held 320ms p99 for 12m. ready to merge.

Co-authored-by: heal-agent <agent@selfheal.ai>`}
                        </pre>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
