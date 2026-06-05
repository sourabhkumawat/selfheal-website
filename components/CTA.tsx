'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';
import { BOOKING_URL, FOUNDERS_EMAIL } from '@/lib/links';

export default function CTA() {
    return (
        <section id="cta" className="section">
            <div className="container-x">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    className="relative overflow-hidden rounded-3xl border border-ink-800 bg-ink-900/40 p-10 sm:p-16"
                >
                    {/* glow */}
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[80%] rounded-full bg-heal-400/20 blur-3xl pointer-events-none" />
                    <div className="absolute inset-0 grid-bg grid-bg-fade opacity-30 pointer-events-none" />

                    <div className="relative max-w-3xl">
                        <motion.div variants={fadeUp} className="eyebrow">
                            Put selfheal on shift tonight
                        </motion.div>
                        <motion.h2
                            variants={fadeUp}
                            className="heading-lg mt-4"
                        >
                            Connect a read-only role. Get your first PR by{' '}
                            <span className="text-heal-400">
                                morning standup.
                            </span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="lead mt-5">
                            Twenty minutes to connect. Forty minutes to verify
                            the agent against a synthetic failure. After that —
                            every page comes with a draft fix attached.
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
                                <Calendar className="size-4" />
                                Book a demo
                                <ArrowRight className="size-4" />
                            </a>
                            <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-ghost"
                            >
                                Request early access
                            </a>
                            <a
                                href={`mailto:${FOUNDERS_EMAIL}`}
                                className="text-sm text-ink-300 hover:text-ink-100 ml-1"
                            >
                                or email the founders →
                            </a>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            className="mt-10 grid sm:grid-cols-3 gap-6 font-mono text-[12px] text-ink-300"
                        >
                            <div>
                                <div className="text-ink-100">20m</div>
                                <div className="text-ink-400">
                                    to connect a read-only role
                                </div>
                            </div>
                            <div>
                                <div className="text-ink-100">1h</div>
                                <div className="text-ink-400">
                                    to validate against a synthetic incident
                                </div>
                            </div>
                            <div>
                                <div className="text-ink-100">0</div>
                                <div className="text-ink-400">
                                    bytes of logs leaving your cloud at rest
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
