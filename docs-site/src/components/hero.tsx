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
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

    return (
        <section ref={containerRef} className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden bg-[#030303] pt-32 pb-20">
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse delay-1000" />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse delay-500" />
            </div>

            {/* Noise Texture */}
            <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 flex flex-col items-center text-center px-6"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-default inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-2xl text-[13px] font-semibold text-white/70 mb-10 hover:border-white/20 transition-all hover:bg-white/10"
                >
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span>Revolutionizing Form Development with Zod</span>
                    <div className="w-1 h-1 rounded-full bg-white/20 mx-1" />
                    <span className="text-white/40">v0.1.0</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-7xl md:text-[10rem] font-bold tracking-[-0.04em] leading-[0.9] text-white mb-10 max-w-6xl drop-shadow-2xl"
                >
                    Build Forms at <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/20">
                        The Speed of Thought.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl md:text-2xl text-white/50 mb-14 max-w-3xl leading-relaxed font-medium"
                >
                    The most powerful form engine for React. Generate complex, type-safe, <br className="hidden md:block" />
                    and extremely beautiful forms directly from your Zod schemas.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-6 mb-32"
                >
                    <Button
                        size="lg"
                        onClick={() => {
                            const playground = document.getElementById('playground');
                            if (playground) {
                                playground.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }}
                        className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all font-bold text-lg shadow-2xl shadow-white/20 group"
                    >
                        Explore Playground
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={async () => {
                            await navigator.clipboard.writeText('npm install zod-based-form');
                            const { toast } = await import('sonner');
                            toast.success('Copied to clipboard!', {
                                description: 'npm install zod-based-form',
                            });
                        }}
                        className="h-16 px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all font-bold text-lg backdrop-blur-xl group relative overflow-hidden"
                    >
                        <span className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-primary group-hover:scale-125 transition-transform" />
                            npm install zod-based-form
                        </span>
                    </Button>
                </motion.div>

                {/* Refined Feature Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full"
                >
                    {[
                        { icon: Zap, color: "text-primary", title: "Instant Setup", desc: "From schema to working form in seconds." },
                        { icon: ShieldCheck, color: "text-purple-400", title: "Type Safety", desc: "No more runtime errors. Pure TypeScript bliss." },
                        { icon: Sparkles, color: "text-indigo-400", title: "Dynamic Logic", desc: "Complex conditional fields, made simple." }
                    ].map((feature, i) => (
                        <div key={i} className="group text-left p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:bg-white/[0.05] hover:border-white/10 transition-all">
                            <div className={`p-3 rounded-2xl bg-white/5 w-fit mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                            <p className="text-white/40 leading-relaxed font-medium">{feature.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Bottom Glow */}
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-primary/10 blur-[150px] rounded-full" />
        </section>
    );
}
