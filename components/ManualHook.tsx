'use client';

import { motion } from 'framer-motion';
import { Coffee, Search, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';

const pains = [
    {
        icon: Search,
        title: 'Dig through logs across five tools',
        body: 'Pull traces from Datadog, switch to Grafana for metrics, drop into Sentry for the stack — context loss is the actual on-call tax.'
    },
    {
        icon: MessageCircle,
        title: 'Page colleagues who already left for the day',
        body: "The senior engineer who knows this corner of the stack is asleep. You write a Slack thread that won't be answered for six hours."
    },
    {
        icon: Coffee,
        title: 'Spend hours playing detective',
        body: 'Reproduce locally, eyeball charts, guess what changed. Under pager pressure, you ship a patch — not a fix — just to go to bed.'
    }
];

export default function ManualHook() {
    return (
        <section className="relative py-24 sm:py-28">
            <div className="container-x">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start"
                >
                    <div>
                        <motion.div
                            variants={fadeUp}
                            className="eyebrow flex items-center gap-2"
                        >
                            <Clock className="size-3" />
                            The on-call tax · 2026
                        </motion.div>
                        <motion.h2
                            variants={fadeUp}
                            className="heading-lg mt-4"
                        >
                            Sure, you can keep investigating alerts manually.{' '}
                            <span className="text-ink-300">
                                Or you can let selfheal do it before the page
                                even reaches your phone.
                            </span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="lead mt-5">
                            The cost of an incident isn't the bug — it's the
                            hours of human attention spent rebuilding context
                            every single time. selfheal was built to take that
                            work back.
                        </motion.p>
                        <motion.a
                            variants={fadeUp}
                            href="#loop"
                            className="mt-7 inline-flex items-center gap-2 text-heal-300 hover:text-heal-200 font-mono text-[13px] tracking-wider"
                        >
                            <span>See the Heal Loop</span>
                            <ArrowRight className="size-4" />
                        </motion.a>
                    </div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        className="space-y-3"
                    >
                        {pains.map((p, i) => {
                            const Icon = p.icon;
                            return (
                                <motion.div
                                    key={p.title}
                                    variants={fadeUp}
                                    custom={i}
                                    className="flex items-start gap-4 rounded-xl border border-ink-800/80 bg-ink-900/30 p-5 hover:border-ink-700 transition"
                                >
                                    <div className="grid place-items-center size-10 rounded-lg bg-danger-400/10 ring-1 ring-danger-400/20 shrink-0">
                                        <Icon
                                            className="size-5 text-danger-400/80"
                                            strokeWidth={1.7}
                                        />
                                    </div>
                                    <div>
                                        <div className="font-display text-[16px] font-medium text-ink-100">
                                            {p.title}
                                        </div>
                                        <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-300">
                                            {p.body}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                        <div className="mt-2 pl-2 font-mono text-[11px] tracking-wider text-ink-400">
                            ↑ this is the part selfheal replaces.
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
