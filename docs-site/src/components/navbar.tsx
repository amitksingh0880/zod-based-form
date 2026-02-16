'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Package } from 'lucide-react';
import MobileNav from '@/components/mobile-nav';

export default function Navbar() {
    const pathname = usePathname();

    const scrollToPlayground = () => {
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
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto flex items-center justify-between w-full max-w-7xl px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl shadow-black/40 ring-1 ring-white/5"
            >
                <div className="flex items-center gap-2">
                    <Link href="/" className="group flex items-center gap-3">
                        <motion.div
                            whileHover={{ rotate: 90 }}
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-purple-500 to-indigo-500 p-[1px] shadow-lg shadow-primary/20"
                        >
                            <div className="w-full h-full rounded-[11px] bg-black flex items-center justify-center font-bold text-lg text-white">Z</div>
                        </motion.div>
                        <span className="hidden sm:inline font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">zod-based-form</span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-1">
                    <Link href="/docs" className="px-4 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all">
                        Docs
                    </Link>
                    <Link href="/walkthrough" className="px-4 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all">
                        Walkthrough
                    </Link>
                    <div className="w-px h-4 bg-white/10 mx-2" />
                    <Link
                        href="https://github.com/amitksingh0880/zod-based-form"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <Github className="w-5 h-5" />
                    </Link>
                    <Link
                        href="https://www.npmjs.com/package/zod-based-form"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <Package className="w-5 h-5" />
                    </Link>
                    <div className="ml-2">
                        <Button
                            onClick={scrollToPlayground}
                            className="h-10 px-6 rounded-full bg-white text-black hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all font-bold shadow-lg shadow-white/10"
                        >
                            Get Started
                        </Button>
                    </div>
                </div>

                <div className="md:hidden">
                    <MobileNav />
                </div>
            </motion.nav>
        </div>
    );
}
