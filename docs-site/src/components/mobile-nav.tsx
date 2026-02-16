'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
    { title: 'Documentation', href: '/docs' },
    { title: 'Walkthrough', href: '/walkthrough' },
];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const menuVariants = {
        closed: {
            x: '100%',
            transition: {
                duration: 0.6,
                ease: "circOut"
            }
        },
        open: {
            x: 0,
            transition: {
                duration: 0.6,
                ease: "circOut"
            }
        }
    };

    const linkVariants = {
        closed: { opacity: 0, x: 20 },
        open: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.1 + i * 0.1,
                duration: 0.5,
                ease: "circOut"
            }
        })
    };

    const navLinks = [
        { href: '/docs', label: 'Documentation' },
        { href: '/walkthrough', label: 'Walkthrough' },
    ];

    const scrollToPlayground = () => {
        setIsOpen(false);
        if (pathname === '/') {
            const playground = document.getElementById('playground');
            if (playground) {
                playground.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            window.location.href = '/#playground';
        }
    };

    return (
        <div className="flex items-center">
            <button
                onClick={() => setIsOpen(true)}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all active:scale-90"
            >
                <Menu className="w-5 h-5" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed inset-y-4 right-4 z-50 w-[min(calc(100vw-32px),400px)] bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
                        >
                            <div className="flex flex-col h-full p-8 md:p-12">
                                <div className="flex items-center justify-between mb-16">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 p-[1px]">
                                            <div className="w-full h-full rounded-[11px] bg-black flex items-center justify-center font-bold text-lg text-white">Z</div>
                                        </div>
                                        <span className="font-bold text-xl text-white/90 tracking-tight">zod-based-form</span>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all active:scale-90"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-6">
                                    {navLinks.map((link, i) => (
                                        <motion.div
                                            key={link.href}
                                            custom={i}
                                            variants={linkVariants}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-4xl md:text-5xl font-bold text-white/40 hover:text-white transition-all block"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-12">
                                    <div className="flex gap-4 mb-8">
                                        <Link
                                            href="https://github.com/amitksingh0880/zod-based-form"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-4 rounded-3xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all flex-1 flex justify-center backdrop-blur-lg"
                                        >
                                            <Github className="w-7 h-7" />
                                        </Link>
                                        <Link
                                            href="https://www.npmjs.com/package/zod-based-form"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-4 rounded-3xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all flex-1 flex justify-center backdrop-blur-lg"
                                        >
                                            <Package className="w-7 h-7" />
                                        </Link>
                                    </div>
                                    <Button
                                        onClick={scrollToPlayground}
                                        className="w-full h-16 rounded-3xl bg-white text-black hover:bg-zinc-200 transition-all font-bold text-xl shadow-2xl shadow-white/10"
                                    >
                                        Get Started
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
