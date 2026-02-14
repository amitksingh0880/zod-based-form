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

    const scrollToPlayground = () => {
        const playground = document.getElementById('playground');
        if (playground) {
            playground.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsOpen(false);
        } else {
            window.location.href = '/#playground';
        }
    };

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 top-[73px]"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-[73px] bottom-0 w-[280px] bg-zinc-950 border-l border-white/10 z-50 p-6 overflow-y-auto"
                        >
                            <nav className="space-y-6">
                                {/* Navigation Links */}
                                <div className="space-y-2">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${pathname === link.href
                                                    ? 'bg-white/10 text-white'
                                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {link.title}
                                        </Link>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="h-[1px] bg-zinc-800" />

                                {/* External Links */}
                                <div className="space-y-2">
                                    <Link
                                        href="https://github.com/amitksingh0880/zod-based-form"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        <Github className="w-5 h-5" />
                                        GitHub
                                    </Link>
                                    <Link
                                        href="https://www.npmjs.com/package/zod-based-form"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        <Package className="w-5 h-5" />
                                        npm Package
                                    </Link>
                                </div>

                                {/* Divider */}
                                <div className="h-[1px] bg-zinc-800" />

                                {/* CTA Button */}
                                <Button
                                    onClick={scrollToPlayground}
                                    className="w-full rounded-full bg-white text-black hover:bg-zinc-200 transition-all font-semibold"
                                >
                                    Get Started
                                </Button>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
