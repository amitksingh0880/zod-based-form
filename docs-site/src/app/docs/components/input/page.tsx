'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Terminal, Copy } from 'lucide-react';

export default function InputDocs() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert max-w-none"
        >
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Input</h1>
                <p className="text-xl text-zinc-400">
                    The standard text input component for your forms.
                </p>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">Preview</h2>
            <Card className="p-12 bg-zinc-900/30 border-white/5 mb-12 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-full max-w-sm space-y-4 relative z-10">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-400">Email Address</Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            className="bg-black border-zinc-800 focus:border-indigo-500 transition-all rounded-xl h-11"
                        />
                    </div>
                    <p className="text-[10px] text-zinc-600 font-mono text-center">Interactive Playground Preview</p>
                </div>
            </Card>

            <h2 className="text-2xl font-bold text-white mb-6">Usage</h2>
            <Card className="bg-black border-zinc-800 p-6 rounded-2xl mb-12">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>schema.ts</span>
                    </div>
                    <button className="text-zinc-500 hover:text-white transition-colors">
                        <Copy className="w-4 h-4" />
                    </button>
                </div>
                <pre className="text-sm font-mono text-indigo-300">
                    <code>{`const schema = z.object({
  email: z.string().email({
    message: "Explicit email validation error message"
  })
});`}</code>
                </pre>
            </Card>

            <h2 className="text-2xl font-bold text-white mb-6">Props</h2>
            <div className="overflow-x-auto border border-white/5 rounded-2xl bg-zinc-900/20 mb-12">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="px-6 py-4 font-semibold text-zinc-300">Prop</th>
                            <th className="px-6 py-4 font-semibold text-zinc-300">Type</th>
                            <th className="px-6 py-4 font-semibold text-zinc-300">Default</th>
                        </tr>
                    </thead>
                    <tbody className="text-zinc-400">
                        <tr className="border-b border-white/5">
                            <td className="px-6 py-4 font-mono text-xs text-indigo-400">name</td>
                            <td className="px-6 py-4">string</td>
                            <td className="px-6 py-4">-</td>
                        </tr>
                        <tr className="border-b border-white/5">
                            <td className="px-6 py-4 font-mono text-xs text-indigo-400">label</td>
                            <td className="px-6 py-4">string</td>
                            <td className="px-6 py-4">-</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-mono text-xs text-indigo-400">placeholder</td>
                            <td className="px-6 py-4">string</td>
                            <td className="px-6 py-4">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
