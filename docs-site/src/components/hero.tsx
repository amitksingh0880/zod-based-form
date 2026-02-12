'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-20">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full delay-700" />

            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 flex flex-col items-center text-center px-4"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-zinc-300 mb-8"
                >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>The most powerful form library for Zod</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 max-w-4xl"
                >
                    Forms built for <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                        Speed and Safety.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed"
                >
                    Generate complex, type-safe React forms from your favorite Zod schemas.
                    Dynamic, flexible, and developer-friendly.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Button size="lg" className="h-14 px-8 rounded-full bg-white text-black hover:bg-zinc-200 transition-all font-bold group">
                        Start Building
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="h-14 px-8 rounded-full border-zinc-800 bg-black hover:bg-zinc-900 text-white transition-all font-semibold">
                        npm install zod-based-form
                    </Button>
                </motion.div>

                {/* Feature Grid Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl"
                >
                    <div className="flex flex-col items-center p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md">
                        <Zap className="w-8 h-8 text-indigo-400 mb-4" />
                        <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
                        <p className="text-sm text-zinc-500">Optimized for performance with minimal re-renders.</p>
                    </div>
                    <div className="flex flex-col items-center p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md">
                        <ShieldCheck className="w-8 h-8 text-purple-400 mb-4" />
                        <h3 className="text-white font-semibold mb-2">Type Safe</h3>
                        <p className="text-sm text-zinc-500">Full TypeScript support and Zod validation integration.</p>
                    </div>
                    <div className="flex flex-col items-center p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md">
                        <Sparkles className="w-8 h-8 text-pink-400 mb-4" />
                        <h3 className="text-white font-semibold mb-2">Dynamic</h3>
                        <p className="text-sm text-zinc-500">Easily create complex forms with dynamic field logic.</p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Decorative Gradient Line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        </section>
    );
}
