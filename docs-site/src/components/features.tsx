'use client';

import { motion } from 'framer-motion';
import { Code, Layers, MousePointer2, Settings2, Sparkles, Zap, ShieldCheck } from 'lucide-react';

const featuresData = [
    {
        title: "Declarative Schema",
        description: "Define your form structure once using Zod and let the library handle the rest. Complete type safety from schema to UI.",
        icon: Code,
        color: "text-blue-400",
    },
    {
        title: "Dynamic Logic",
        description: "Easily show or hide fields based on other field values. Complex conditional logic becomes simple and readable.",
        icon: Settings2,
        color: "text-purple-400",
    },
    {
        title: "Custom UI Components",
        description: "Plug in your own UI components or use our Shadcn-based defaults. Total control over look and feel.",
        icon: Layers,
        color: "text-indigo-400",
    },
    {
        title: "Interactive UX",
        description: "Built-in validation, error handling, and accessibility features provide a premium experience for end users.",
        icon: MousePointer2,
        color: "text-emerald-400",
    },
    {
        title: "Lightning Performance",
        description: "Optimized for speed with minimal re-renders. Handles even the most complex forms with ease.",
        icon: Zap,
        color: "text-primary",
    },
    {
        title: "Production Ready",
        description: "Tested and trusted for mission-critical applications. Built with security and reliability in mind.",
        icon: ShieldCheck,
        color: "text-indigo-500",
    }
];

export default function Features() {
    return (
        <section className="relative py-40 bg-[#030303] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[12px] font-bold text-primary mb-8 uppercase tracking-widest"
                    >
                        Features
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter"
                    >
                        Built for the modern <br />
                        <span className="text-white/30">developer experience.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto font-medium"
                    >
                        Everything you need to build robust, scalable, and user-friendly forms in record time.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresData.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group relative p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden backdrop-blur-3xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative z-10">
                                <div className="p-5 rounded-[1.5rem] bg-white/5 w-fit mb-10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-700 shadow-2xl">
                                    <feature.icon className="w-8 h-8 text-white group-hover:text-primary transition-colors duration-500" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-white/40 leading-relaxed font-medium text-lg">{feature.description}</p>
                            </div>

                            {/* Shimmer Effect */}
                            <div className="absolute -inset-full group-hover:animate-shimmer pointer-events-none bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skew-x-[25deg] transition-all duration-1000" />

                            <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-4 group-hover:translate-x-0 transition-transform">
                                <Sparkles className="w-6 h-6 text-primary/30" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/10 blur-[180px] rounded-full pointer-events-none opacity-50" />
            <div className="absolute bottom-[-10%] right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none opacity-50" />
        </section>
    );
}
