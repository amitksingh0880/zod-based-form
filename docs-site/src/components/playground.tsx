'use client';

import { useState, useEffect, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DynamicForm } from 'zod-based-form';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultCode = `z.object({
  username: z.string().min(3).describe("Username"),
  email: z.string().email().describe("Email Address"),
  role: z.enum(["user", "admin", "guest"]).default("user").describe("User Role"),
  bio: z.string().optional().describe("Bio"),
  terms: z.boolean().describe("I accept the terms")
})`;

export default function Playground() {
    const [code, setCode] = useState(defaultCode);
    const [schema, setSchema] = useState<z.ZodObject<any> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>(null);

    useEffect(() => {
        try {
            // safe-ish eval
            const func = new Function('z', `return ${code}`);
            const result = func(z);

            if (result instanceof z.ZodSchema) {
                setSchema(result as z.ZodObject<any>);
                setError(null);
            } else {
                setError('Code must return a valid Zod schema');
            }
        } catch (e: any) {
            setError(e.message);
        }
    }, [code]);

    return (
        <section className="py-24 bg-black relative overflow-hidden" id="playground">
            <div className="container mx-auto px-4 z-10 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-4">
                        Try it Live
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Edit the schema on the left, see the form update instantly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
                    {/* Editor */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-2xl flex flex-col">
                        <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
                            <span className="text-xs font-mono text-zinc-400">schema.ts</span>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-[8px]"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-[8px]"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-[8px]"></div>
                            </div>
                        </div>
                        <Editor
                            height="100%"
                            defaultLanguage="typescript"
                            defaultValue={defaultCode}
                            theme="vs-dark"
                            onChange={(value) => setCode(value || '')}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: 'on',
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16, bottom: 16 },
                            }}
                        />
                    </div>

                    {/* Preview */}
                    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl shadow-2xl flex flex-col relative overflow-hidden">
                        <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
                            <span className="text-xs font-mono text-zinc-400">Preview</span>
                            {error ? (
                                <span className="text-xs text-red-400 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> Error
                                </span>
                            ) : (
                                <span className="text-xs text-green-400 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Live
                                </span>
                            )}
                        </div>

                        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                            <AnimatePresence mode="wait">
                                {error ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm font-mono"
                                    >
                                        {error}
                                    </motion.div>
                                ) : schema ? (
                                    <FormPreview schema={schema} onSubmit={setFormData} />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-zinc-500">
                                        <Loader2 className="w-6 h-6 animate-spin mr-2" />
                                        Generating form...
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Result Preview (if submitted) */}
                        {formData && (
                            <div className="absolute inset-x-0 bottom-0 bg-zinc-950 border-t border-white/10 p-4 transform transition-transform">
                                <div className="text-xs font-mono text-zinc-500 mb-2">Submitted Data:</div>
                                <pre className="text-xs text-green-400 font-mono overflow-auto max-h-32">
                                    {JSON.stringify(formData, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}

function FormPreview({ schema, onSubmit }: { schema: z.ZodObject<any>, onSubmit: (data: any) => void }) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {}
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <DynamicForm
                    schema={schema}
                    form={form}
                    onSubmit={onSubmit}
                    className="space-y-4"
                />
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
                >
                    Submit Form
                </button>
            </form>
        </motion.div>
    );
}
