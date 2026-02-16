'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, Terminal, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const steps = [
    {
        title: "Installation",
        description: "Start by installing the core library and its peer dependencies. We recommend using Bun for the fastest experience.",
        content: "bun add zod-based-form zod react-hook-form",
        type: "code",
    },
    {
        title: "Define your Schema",
        description: "Create a Zod schema that describes your form's data structure and validation rules. This is your source of truth.",
        content: `const formSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
});`,
        type: "code",
    },
    {
        title: "Initialize the Form",
        description: "Use the DynamicForm component to render your form automatically. No more manual field mapping.",
        content: `<DynamicForm 
  schema={formSchema}
  onSubmit={(data) => console.log(data)}
/>`,
        type: "code",
    }
];

export default function WalkthroughPage() {
    return (
        <div className="min-h-screen bg-[#030303] pt-48 pb-32 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-32 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[11px] font-bold text-primary mb-8 uppercase tracking-widest">
                        Documentation Guide
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
                        Complete <br />
                        <span className="text-white/30 text-5xl md:text-7xl">Walkthrough.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed">
                        A step-by-step guide to building production-ready <br className="hidden md:block" />
                        forms with zero boilerplate.
                    </p>
                </motion.div>

                <div className="space-y-24">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex flex-col md:flex-row gap-12"
                        >
                            <div className="md:w-1/3">
                                <div className="sticky top-48">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-[1.25rem] bg-white text-black font-bold text-lg shadow-2xl shadow-white/20">
                                            {index + 1}
                                        </div>
                                        <div className="h-px w-8 bg-white/10" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                                    <p className="text-white/40 leading-relaxed font-medium">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                <Card className="bg-zinc-950 border-white/10 rounded-[2.5rem] overflow-hidden shadow-3xl ring-1 ring-white/5 group hover:border-primary/30 transition-all duration-500">
                                    <div className="px-8 py-5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Terminal className="w-4 h-4 text-white/40" />
                                            <span className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest">Snippet</span>
                                        </div>
                                        <div className="flex gap-1.5 opacity-30">
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <pre className="text-sm md:text-base font-mono text-primary/80 overflow-x-auto leading-relaxed">
                                            <code>{step.content}</code>
                                        </pre>
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-48 relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent blur-[80px] rounded-[4rem] group-hover:blur-[100px] transition-all duration-700" />
                    <div className="relative p-16 md:p-24 rounded-[3.5rem] border border-white/10 bg-zinc-950/50 backdrop-blur-3xl text-center shadow-3xl overflow-hidden ring-1 ring-white/10">
                        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sparkles className="w-32 h-32 text-primary" />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">Ready to <br className="md:hidden" /> scale up?</h2>
                        <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-2xl mx-auto font-medium">Dive into our comprehensive documentation to master advanced field types and logic.</p>
                        <Link href="/docs">
                            <Button size="lg" className="h-16 px-12 rounded-2xl bg-white text-black hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all font-bold text-xl shadow-2xl shadow-white/20 group">
                                Master the API
                                <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
