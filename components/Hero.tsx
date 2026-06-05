'use client';

import { motion } from 'framer-motion';
import { ArrowRight, GitPullRequest, PlayCircle } from 'lucide-react';
import LiveAgent from './LiveAgent';
import { fadeUp, stagger } from '@/lib/motion';
import { BOOKING_URL } from '@/lib/links';

export default function Hero() {
    return (
        <section className="relative pt-32 sm:pt-40 pb-20 overflow-hidden">
            {/* grid background */}
            <div className="absolute inset-0 grid-bg grid-bg-fade opacity-60 pointer-events-none" />
            {/* radial wash */}
            <div className="absolute inset-x-0 -top-40 h-[600px] bg-radial-fade pointer-events-none" />

            <div className="container-x relative">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center"
                >
                    <div>
                        <motion.div variants={fadeUp} className="pill mb-6">
                            <span className="pill-dot" />
                            The agentic SRE — now in private beta
                        </motion.div>

                        <motion.h1 variants={fadeUp} className="heading-xl">
                            The autonomous SRE that doesn't just{' '}
                            <span className="text-ink-300">find the bug.</span>{' '}
                            <span className="shimmer-text">
                                It ships the fix.
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="lead mt-6">
                            selfheal investigates the moment an alert fires —
                            correlates signals across logs, traces and configs,
                            tests hypotheses in parallel, isolates the root
                            cause, then{' '}
                            <span className="text-ink-100">
                                opens a reviewed pull request
                            </span>{' '}
                            with a regression test attached. Incident in. Diff
                            out. MTTR measured in seconds, not hours.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            className="mt-8 flex flex-wrap items-center gap-3"
                        >
                            <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-primary"
                            >
                                Book a demo
                                <ArrowRight className="size-4" />
                            </a>
                            <a href="#loop" className="btn-ghost">
                                <PlayCircle className="size-4" />
                                See the Heal Loop
                            </a>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11.5px] tracking-wider uppercase text-ink-400"
                        >
                            <span className="flex items-center gap-2">
                                <span className="size-1.5 rounded-full bg-heal-400" />
                                On-call MTTR · minutes → seconds
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="size-1.5 rounded-full bg-signal-400" />
                                Read-only access · no agent in your build
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="size-1.5 rounded-full bg-warn-400" />
                                Human-in-the-loop merge
                            </span>
                        </motion.div>
                    </div>

                    <motion.div variants={fadeUp} className="relative">
                        <LiveAgent />
                        <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 rounded-full border border-heal-400/30 bg-ink-900/80 px-3 py-1.5 font-mono text-[11px] text-heal-300 shadow-[0_10px_40px_-10px_rgba(52,211,153,0.4)]">
                            <GitPullRequest className="size-3.5" />
                            PR opened in 24s
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
