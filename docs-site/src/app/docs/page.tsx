'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <div className="mb-12">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-4">Stable</Badge>
                <h1 className="text-4xl font-bold text-white mb-4">Introduction</h1>
                <p className="text-xl text-zinc-400 leading-relaxed">
                    zod-based-form is a high-performance, type-safe form generation library built on top of Zod and React Hook Form.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <Link href="/walkthrough">
                    <Card className="p-6 bg-zinc-900/50 border-white/5 hover:bg-zinc-900/80 transition-all group cursor-pointer">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 flex items-center gap-2">
                            Quick Start
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                        </h3>
                        <p className="text-zinc-400 text-sm">Get up and running with a basic form in under 2 minutes.</p>
                    </Card>
                </Link>
                <Link href="/docs">
                    <Card className="p-6 bg-zinc-900/50 border-white/5 hover:bg-zinc-900/80 transition-all group cursor-pointer">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 flex items-center gap-2">
                            Why use it?
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                        </h3>
                        <p className="text-zinc-400 text-sm">Understand the philosophy behind declarative form generation.</p>
                    </Card>
                </Link>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">Philosophy</h2>
            <p className="text-zinc-400 leading-relaxed mb-8 text-lg">
                We believe that forms are mostly data structures. By treating them as such, we can automate most of the boilerplate
                while keeping the full flexibility of manual implementation. Simple to use, hard to break.
            </p>

            <Card className="bg-black border-zinc-800 p-8 rounded-3xl mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
                <h3 className="text-xl font-bold text-white mb-4">Core Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-400 list-none p-0">
                    <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        Automatic Type Inference
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Zero-Config Validation
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                        Conditional Rendering
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Plugable UI System
                    </li>
                </ul>
            </Card>

            <div className="flex items-center justify-between pt-12 border-t border-white/5">
                <div />
                <Link href="/docs/components/input">
                    <Button variant="ghost" className="group text-zinc-400 hover:text-white">
                        Components
                        <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}
