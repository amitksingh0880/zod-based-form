'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Package } from 'lucide-react';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-xl"
        >
            <div className="flex items-center gap-2">
                <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px]">
                        <div className="w-full h-full rounded-[6px] bg-black flex items-center justify-center font-mono text-sm">Z</div>
                    </div>
                    <span className="hidden sm:inline">zod-based-form</span>
                </Link>
            </div>

            <div className="flex items-center gap-6">
                <Link href="/docs" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    Documentation
                </Link>
                <Link href="/walkthrough" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    Walkthrough
                </Link>
                <div className="h-4 w-[1px] bg-zinc-800" />
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
                </Link>
                <Link href="https://npmjs.com" target="_blank" rel="noopener noreferrer">
                    <Package className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
                </Link>
                <Button className="rounded-full bg-white text-black hover:bg-zinc-200 transition-all font-semibold">
                    Get Started
                </Button>
            </div>
        </motion.nav>
    );
}
