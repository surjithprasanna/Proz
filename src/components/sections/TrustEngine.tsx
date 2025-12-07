"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Shield, Zap, Eye, CheckCircle2, Circle, Loader2, FileCode, Rocket, Server } from "lucide-react"
import { cn } from "@/lib/utils"

export function TrustEngine() {
    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 3)
        }, 5000) // Switch every 5 seconds
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        We Build <span className="text-green-500">Trust</span>, Not Just Code.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Transparency is our core feature. Watch your project evolve in real-time with our AI-powered progress tracker. No guessing, no ghosting.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Narrative Cards */}
                    <div className="space-y-6">
                        <TrustCard
                            icon={Zap}
                            title="1. Request & Plan"
                            desc="Submit your idea. We instantly analyze requirements and create a detailed roadmap."
                            isActive={activeStep === 0}
                            onClick={() => setActiveStep(0)}
                        />
                        <TrustCard
                            icon={Eye}
                            title="2. Track in Real-Time"
                            desc="Log in to your dashboard. See every phase, every update, and every milestone as it happens."
                            isActive={activeStep === 1}
                            onClick={() => setActiveStep(1)}
                        />
                        <TrustCard
                            icon={Shield}
                            title="3. Verify & Launch"
                            desc="Review the final build. We deploy only when you are 100% satisfied with the result."
                            isActive={activeStep === 2}
                            onClick={() => setActiveStep(2)}
                        />
                    </div>

                    {/* Dynamic Mock Demo */}
                    <div className="relative h-[400px]">
                        <AnimatePresence mode="wait">
                            {activeStep === 0 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0"
                                >
                                    <MockRequestUI />
                                </motion.div>
                            )}
                            {activeStep === 1 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0"
                                >
                                    <MockAIProgressTracker />
                                </motion.div>
                            )}
                            {activeStep === 2 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0"
                                >
                                    <MockLaunchUI />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}

interface TrustCardProps {
    icon: React.ElementType
    title: string
    desc: string
    isActive: boolean
    onClick: () => void
}

function TrustCard({ icon: Icon, title, desc, isActive, onClick }: TrustCardProps) {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={cn(
                "p-6 rounded-xl border transition-all duration-300 cursor-pointer",
                isActive
                    ? "bg-green-500/10 border-green-500/50 shadow-[0_0_30px_rgba(0,255,0,0.1)] scale-105"
                    : "bg-card/50 border-border hover:border-green-500/30 opacity-60 hover:opacity-100"
            )}
        >
            <div className="flex items-start gap-4">
                <div className={cn(
                    "p-3 rounded-lg transition-colors",
                    isActive ? "bg-green-500/20 text-green-400" : "bg-primary/10 text-primary"
                )}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className={cn("text-xl font-bold mb-2 transition-colors", isActive ? "text-green-400" : "text-foreground")}>
                        {title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {desc}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

// --- MOCK UI COMPONENTS ---

function MockRequestUI() {
    return (
        <div className="w-full h-full bg-black/90 border border-green-500/30 rounded-lg overflow-hidden font-mono shadow-[0_0_40px_rgba(0,255,0,0.15)] flex flex-col">
            <div className="bg-green-900/20 border-b border-green-500/30 p-4 flex items-center gap-2 text-green-400">
                <FileCode className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wider">REQ_ANALYZER_V1.0</span>
            </div>
            <div className="p-6 space-y-4 flex-1 relative">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />

                <div className="space-y-2">
                    <div className="text-xs text-green-500/50">INPUT: PROJECT_IDEA</div>
                    <div className="p-3 bg-green-500/5 border border-green-500/20 rounded text-green-400 text-sm">
                        &quot;I need a SaaS platform for AI-driven marketing...&quot;
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="text-xs text-green-500/50">ANALYSIS_STATUS</div>
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-green-300">
                            <span>Scope Definition</span>
                            <span className="text-green-500">COMPLETE</span>
                        </div>
                        <div className="w-full bg-green-900/30 h-1 rounded-full"><div className="bg-green-500 h-full w-full" /></div>

                        <div className="flex items-center justify-between text-xs text-green-300 mt-2">
                            <span>Tech Stack Selection</span>
                            <span className="text-green-500">OPTIMIZED</span>
                        </div>
                        <div className="w-full bg-green-900/30 h-1 rounded-full"><div className="bg-green-500 h-full w-full" /></div>

                        <div className="flex items-center justify-between text-xs text-green-300 mt-2">
                            <span>Cost Estimation</span>
                            <span className="animate-pulse text-green-400">CALCULATING...</span>
                        </div>
                        <div className="w-full bg-green-900/30 h-1 rounded-full overflow-hidden">
                            <motion.div
                                className="bg-green-500 h-full w-full"
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MockLaunchUI() {
    return (
        <div className="w-full h-full bg-black/90 border border-green-500/30 rounded-lg overflow-hidden font-mono shadow-[0_0_40px_rgba(0,255,0,0.15)] flex flex-col">
            <div className="bg-green-900/20 border-b border-green-500/30 p-4 flex items-center gap-2 text-green-400">
                <Rocket className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wider">DEPLOYMENT_CONSOLE</span>
            </div>
            <div className="p-6 flex flex-col items-center justify-center flex-1 relative text-center space-y-6">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />

                <div className="relative">
                    <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 animate-pulse" />
                    <Server className="w-16 h-16 text-green-500" />
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-green-400 tracking-widest">SYSTEM ONLINE</h3>
                    <p className="text-xs text-green-500/60">DEPLOYMENT SUCCESSFUL</p>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full text-xs text-green-500/80">
                    <div className="p-2 border border-green-500/20 rounded bg-green-500/5">
                        <div className="font-bold">UPTIME</div>
                        <div>99.99%</div>
                    </div>
                    <div className="p-2 border border-green-500/20 rounded bg-green-500/5">
                        <div className="font-bold">LATENCY</div>
                        <div>24ms</div>
                    </div>
                    <div className="p-2 border border-green-500/20 rounded bg-green-500/5">
                        <div className="font-bold">SECURITY</div>
                        <div>MAX</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MockAIProgressTracker() {
    const [phases, setPhases] = useState([
        { id: 1, name: "System Architecture", status: "completed", desc: "Database schema and API routes defined." },
        { id: 2, name: "Frontend Development", status: "processing", desc: "Building responsive UI components..." },
        { id: 3, name: "Integration Testing", status: "pending", desc: "End-to-end verification." },
    ])

    // Simulate "Live" updates
    useEffect(() => {
        const interval = setInterval(() => {
            setPhases(prev => prev.map(p => {
                if (p.status === 'processing') {
                    // Toggle description to simulate activity
                    return {
                        ...p,
                        desc: p.desc.endsWith("...") ? p.desc.slice(0, -3) : p.desc + "."
                    }
                }
                return p
            }))
        }, 800)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full h-full bg-black/90 border border-green-500/30 rounded-lg overflow-hidden font-mono shadow-[0_0_40px_rgba(0,255,0,0.15)] flex flex-col">
            {/* Header */}
            <div className="bg-green-900/20 border-b border-green-500/30 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-400">
                    <Terminal className="w-4 h-4" />
                    <span className="text-sm font-bold tracking-wider">LIVE_DEMO_VIEWER</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 relative flex-1">
                {/* Scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />

                {phases.map((phase, index) => (
                    <div
                        key={phase.id}
                        className={cn(
                            "relative flex items-start gap-4 p-3 rounded border transition-all duration-300",
                            phase.status === 'processing' ? "bg-green-500/10 border-green-500/50" :
                                phase.status === 'completed' ? "bg-green-900/5 border-green-500/20 opacity-60" :
                                    "border-transparent opacity-40"
                        )}
                    >
                        <div className="mt-1">
                            {phase.status === 'completed' ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : phase.status === 'processing' ? (
                                <Loader2 className="w-5 h-5 text-green-400 animate-spin" />
                            ) : (
                                <Circle className="w-5 h-5 text-green-700" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h3 className={cn(
                                    "text-sm font-bold uppercase tracking-wide",
                                    phase.status === 'processing' ? "text-green-400" : "text-green-600"
                                )}>
                                    {`[PHASE_0${index + 1}]: ${phase.name}`}
                                </h3>
                                {phase.status === 'processing' && (
                                    <span className="text-[10px] text-green-400 animate-pulse">UPDATING...</span>
                                )}
                            </div>
                            <p className="text-xs text-green-500/70 mt-1 font-sans">
                                {phase.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
