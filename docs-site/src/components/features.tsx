'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Code, Layers, MousePointer2, Settings2 } from 'lucide-react';

const features = [
    {
        title: "Declarative Schema",
        description: "Define your form structure once using Zod and let the library handle the rest. Complete type safety from schema to UI.",
        icon: Code,
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Dynamic Logic",
        description: "Easily show or hide fields based on other field values. Complex conditional logic becomes simple and readable.",
        icon: Settings2,
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Custom UI Components",
        description: "Plug in your own UI components or use our Shadcn-based defaults. Total control over look and feel.",
        icon: Layers,
        color: "from-orange-500 to-amber-500",
    },
    {
        title: "Interactive UX",
        description: "Built-in validation, error handling, and accessibility features provide a premium experience for end users.",
        icon: MousePointer2,
        color: "from-emerald-500 to-teal-500",
    }
];

export default function Features() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
                    >
                        Built for modern engineering teams
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-zinc-500 max-w-2xl mx-auto"
                    >
                        Everything you need to build robust, scalable, and user-friendly forms in record time.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full" />
        </section>
    );
}

function FeatureCard({ feature, index }: { feature: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
            className="group p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
        >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-[1px] mb-6 shadow-lg shadow-black/20`}>
                <div className="w-full h-full rounded-[15px] bg-black flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-white" />
                </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
                {feature.description}
            </p>
        </motion.div>
    );
}
