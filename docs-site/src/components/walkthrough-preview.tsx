'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function WalkthroughPreview() {
    return (
        <section className="py-32 bg-zinc-950 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-xs font-semibold text-indigo-400 mb-6"
                        >
                            Step-by-step Guide
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
                        >
                            Get started in seconds, <br />
                            <span className="text-zinc-500">master it in minutes.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-zinc-400 mb-8 max-w-lg leading-relaxed"
                        >
                            Our comprehensive walkthrough takes you from zero to a production-ready dynamic form.
                            Learn how to leverage Zod schemas to their full potential.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link href="/walkthrough">
                                <Button size="lg" className="rounded-full bg-white text-black hover:bg-zinc-200 px-8 group">
                                    View Walkthrough
                                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    <div className="flex-1 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10 p-4 rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden aspect-video flex items-center justify-center font-mono text-sm text-indigo-400"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
                            <div className="space-y-2">
                                <div className="flex gap-2"><span className="text-zinc-600">const</span> schema = z.object({`{`}</div>
                                <div className="pl-4 flex gap-2">name: z.string().min(2),</div>
                                <div className="pl-4 flex gap-2">email: z.string().email(),</div>
                                <div className="pl-4 flex gap-2">age: z.number().optional(),</div>
                                <div className="">{`})`};</div>
                            </div>
                        </motion.div>

                        {/* Background Decorative Blobs */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full animate-pulse delay-1000" />
                    </div>
                </div>
            </div>
        </section>
    );
}
