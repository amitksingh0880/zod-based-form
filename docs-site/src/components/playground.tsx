'use client';

import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DynamicForm } from 'zod-based-form';
import { Loader2, AlertCircle, CheckCircle2, Play, Terminal, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const defaultCode = `z.object({
  username: z.string().min(3).describe("Username"),
  email: z.string().email().describe("Email Address"),
  role: z.enum(["user", "admin", "guest"]).default("user").describe("User Role"),
  bio: z.string().optional().describe("Bio"),
  newsletter: z.boolean().default(true).describe("Subscribe to newsletter")
})`;

export default function Playground() {
    const [code, setCode] = useState(defaultCode);
    const [schema, setSchema] = useState<z.ZodObject<any> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        setIsGenerating(true);
        const timer = setTimeout(() => {
            try {
                const func = new Function('z', `return ${code}`);
                const result = func(z);

                if (result instanceof ZodType) {
                    setSchema(result as z.ZodObject<any>);
                    setError(null);
                } else {
                    setError('Code must return a valid Zod schema');
                }
            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsGenerating(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [code]);

    return (
        <section className="relative py-40 bg-[#030303] overflow-hidden" id="playground">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[12px] font-bold text-primary mb-8 uppercase tracking-widest"
                    >
                        Interactive Playground
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tighter"
                    >
                        Design your schema, <br />
                        <span className="text-white/30">see the magic happen.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 lg:h-[750px] items-stretch">
                    {/* Editor Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="xl:col-span-3 flex flex-col rounded-[2.5rem] bg-zinc-950 border border-white/10 shadow-3xl overflow-hidden ring-1 ring-white/5"
                    >
                        <div className="px-8 py-5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex gap-2">
                                    <div className="w-3.5 h-3.5 rounded-full bg-red-500/40" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-amber-500/40" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/40" />
                                </div>
                                <div className="h-4 w-px bg-white/10 mx-2" />
                                <div className="flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-white/40" />
                                    <span className="text-xs font-bold font-mono text-white/40 uppercase tracking-widest">schema.ts</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {isGenerating && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                                <Sparkles className="w-4 h-4 text-primary/40" />
                            </div>
                        </div>
                        <div className="flex-1 min-h-[400px]">
                            <Editor
                                height="100%"
                                defaultLanguage="typescript"
                                value={code}
                                theme="vs-dark"
                                onChange={(value) => setCode(value || '')}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 15,
                                    lineNumbers: 'on',
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: { top: 24, bottom: 24 },
                                    fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
                                    backgroundColor: '#09090b',
                                    fontWeight: '500',
                                    lineHeight: 1.6,
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Preview Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="xl:col-span-2 flex flex-col rounded-[2.5rem] bg-zinc-900 border border-white/10 shadow-3xl overflow-hidden relative ring-1 ring-white/5"
                    >
                        <div className="px-8 py-5 bg-white/[0.04] border-b border-white/5 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Live Preview</span>
                            <div className="flex items-center gap-2">
                                {error ? (
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                                        <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                                        <span className="text-[10px] font-bold text-red-500 uppercase">Error</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        <span className="text-[10px] font-bold text-emerald-500 uppercase">Synced</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 p-10 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.02),transparent)]">
                            <AnimatePresence mode="wait">
                                {error ? (
                                    <motion.div
                                        key="error"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="p-6 rounded-3xl bg-red-500/5 border border-red-500/20 text-red-400 font-mono text-xs leading-relaxed overflow-hidden"
                                    >
                                        <div className="font-bold mb-2 uppercase tracking-tight opacity-50 flex items-center gap-2">
                                            <AlertCircle className="w-3 h-3" /> Syntax Error
                                        </div>
                                        {error}
                                    </motion.div>
                                ) : schema ? (
                                    <FormPreview key="preview" schema={schema} onSubmit={setFormData} />
                                ) : (
                                    <div key="loading" className="flex flex-col items-center justify-center h-full text-white/20">
                                        <Loader2 className="w-8 h-8 animate-spin mb-4" />
                                        <span className="font-bold uppercase tracking-widest text-xs">Assembling Form...</span>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Submission Output */}
                        <AnimatePresence>
                            {formData && (
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 100, opacity: 0 }}
                                    className="absolute bottom-6 inset-x-6 z-20"
                                >
                                    <div className="p-6 rounded-3xl bg-black border border-white/10 shadow-2xl shadow-black backdrop-blur-3xl ring-1 ring-white/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Form Output</div>
                                            <button
                                                onClick={() => setFormData(null)}
                                                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                                            >
                                                <XIcon className="w-4 h-4 text-white/40" />
                                            </button>
                                        </div>
                                        <pre className="text-xs text-white/70 font-mono overflow-auto max-h-40 leading-relaxed">
                                            {JSON.stringify(formData, null, 2)}
                                        </pre>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function XIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
    );
}

function FormPreview({ schema, onSubmit }: { schema: z.ZodObject<any>, onSubmit: (data: any) => void }) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {}
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 space-y-6">
                    <DynamicForm
                        schema={schema}
                        form={form}
                        onSubmit={onSubmit}
                        className="space-y-6"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full h-14 rounded-2xl bg-white text-black hover:bg-zinc-200 transition-all font-bold text-lg shadow-xl shadow-white/5 group"
                >
                    Submit Form
                    <motion.div
                        whileHover={{ x: 5 }}
                        className="ml-2"
                    >
                        <Play className="w-4 h-4 fill-current transition-transform" />
                    </motion.div>
                </Button>
            </form>
        </motion.div>
    );
}
