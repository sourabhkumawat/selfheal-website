'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { BOOKING_URL } from '@/lib/links';

const links = [
    { href: '#platform', label: 'Platform' },
    { href: '#loop', label: 'Heal Loop' },
    { href: '#bets', label: 'Architecture' },
    { href: '#integrations', label: 'Integrations' }
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-x-0 top-0 z-50 transition-colors ${
                scrolled
                    ? 'border-b border-ink-800/70 bg-ink-950/70 backdrop-blur-xl'
                    : 'bg-transparent'
            }`}
        >
            <div className="container-x flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <Logo size={30} />
                    <span className="font-display text-[15px] font-semibold tracking-tight">
                        selfheal<span className="text-heal-400">.ai</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="rounded-md px-3 py-1.5 text-[13.5px] text-ink-200 transition hover:text-heal-300"
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="#loop"
                        className="text-[13.5px] text-ink-300 hover:text-ink-100"
                    >
                        How it works
                    </Link>
                    <Link
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary !py-2 !text-[13.5px]"
                    >
                        Book a demo
                        <span aria-hidden>→</span>
                    </Link>
                </div>

                <button
                    aria-label="Toggle menu"
                    className="md:hidden grid place-items-center size-9 rounded-md border border-ink-700/70 bg-ink-900/40"
                    onClick={() => setOpen((s) => !s)}
                >
                    {open ? (
                        <X className="size-4" />
                    ) : (
                        <Menu className="size-4" />
                    )}
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="md:hidden overflow-hidden border-t border-ink-800/70 bg-ink-950/90 backdrop-blur"
                    >
                        <div className="container-x py-3 flex flex-col">
                            {links.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="py-2.5 text-sm text-ink-200"
                                >
                                    {l.label}
                                </Link>
                            ))}
                            <Link
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => setOpen(false)}
                                className="mt-2 btn-primary justify-center"
                            >
                                Book a demo →
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
