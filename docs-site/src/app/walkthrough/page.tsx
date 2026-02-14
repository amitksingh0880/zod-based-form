'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
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
        description: "Create a Zod schema that describes your form's data structure and validation rules.",
        content: `const formSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
});`,
        type: "code",
    },
    {
        title: "Initialize the Form",
        description: "Use the DynamicForm component to render your form automatically based on the schema.",
        content: `<DynamicForm 
  schema={formSchema}
  onSubmit={(data) => console.log(data)}
/>`,
        type: "code",
    }
];

export default function WalkthroughPage() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 mb-4 px-3 py-1">Guide</Badge>
                    <h1 className="text-5xl font-bold text-white mb-6">Complete Walkthrough</h1>
                    <p className="text-xl text-zinc-500">Learn how to build powerful forms from scratch.</p>
                </motion.div>

                <div className="space-y-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-12"
                        >
                            {/* Vertical Progress Line */}
                            <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-zinc-800" />
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm font-bold text-white z-10">
                                {index + 1}
                            </div>

                            <div className="mb-4 flex items-center gap-3">
                                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 opacity-50" />
                            </div>
                            <p className="text-zinc-400 mb-6 text-lg max-w-2xl">{step.description}</p>

                            <Card className="bg-zinc-900/50 border-white/5 p-6 rounded-2xl overflow-hidden group">
                                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-zinc-600">
                                    <Terminal className="w-3.5 h-3.5" />
                                    <span>Terminal</span>
                                </div>
                                <pre className="text-sm font-mono text-indigo-300 overflow-x-auto">
                                    <code>{step.content}</code>
                                </pre>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-purple-700 text-center"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to go deeper?</h2>
                    <p className="text-white/80 mb-8 text-lg">Check out our full API reference for advanced configuration.</p>
                    <Link href="/docs">
                        <Button size="lg" className="rounded-full bg-white text-black hover:bg-zinc-100 px-10 font-bold group">
                            Explore API reference
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
