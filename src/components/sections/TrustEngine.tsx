"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Zap, Eye, Shield,
    CheckCircle2, Circle, Loader2,
    FileText, Sparkles, Layout,
    Rocket, BarChart3, Globe,
    ArrowRight, MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"

// Theme configurations for each step
const THEMES = [
    {
        id: 'request',
        color: 'blue',
        primary: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        glow: 'shadow-[0_0_30px_rgba(59,130,246,0.15)]',
        gradient: 'from-blue-500/20 to-indigo-500/20'
    },
    {
        id: 'track',
        color: 'purple',
        primary: 'text-purple-500',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
        glow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]',
        gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
        id: 'launch',
        color: 'emerald',
        primary: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
        gradient: 'from-emerald-500/20 to-teal-500/20'
    }
]

export function TrustEngine() {
    const [activeStep, setActiveStep] = useState(0)
    const theme = THEMES[activeStep]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 3)
        }, 6000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Dynamic Background Gradient */}
            <motion.div
                animate={{
                    background: `radial-gradient(circle at 50% 50%, ${activeStep === 0 ? 'rgba(59,130,246,0.08)' :
                        activeStep === 1 ? 'rgba(168,85,247,0.08)' :
                            'rgba(16,185,129,0.08)'
                        } 0%, transparent 70%)`
                }}
                className="absolute inset-0 transition-colors duration-1000 -z-10"
            />

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        We Build <span className={cn("transition-colors duration-500", theme.primary)}>Trust</span>, Not Just Code.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Experience a transparent development journey. From idea to launch, you&apos;re always in the loop with our interactive platform.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Narrative Cards */}
                    <div className="space-y-4">
                        <TrustCard
                            icon={Zap}
                            title="1. Request & Plan"
                            desc="Share your vision. We analyze it instantly and craft a precise roadmap."
                            isActive={activeStep === 0}
                            onClick={() => setActiveStep(0)}
                            theme={THEMES[0]}
                        />
                        <TrustCard
                            icon={Eye}
                            title="2. Track Progress"
                            desc="Watch your project come to life with real-time updates and previews."
                            isActive={activeStep === 1}
                            onClick={() => setActiveStep(1)}
                            theme={THEMES[1]}
                        />
                        <TrustCard
                            icon={Shield}
                            title="3. Verify & Launch"
                            desc="Validate the results. We deploy to production only when you say 'Go'."
                            isActive={activeStep === 2}
                            onClick={() => setActiveStep(2)}
                            theme={THEMES[2]}
                        />
                    </div>

                    {/* Dynamic Mock Demo */}
                    <div className="relative h-[450px] w-full">
                        <div className={cn(
                            "absolute inset-0 rounded-2xl border backdrop-blur-xl transition-all duration-500 overflow-hidden",
                            "bg-black/40", // Base background
                            theme.border,
                            theme.glow
                        )}>
                            {/* Window Controls */}
                            <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                <div className={cn("ml-auto text-xs font-medium px-2 py-1 rounded-full bg-white/5 transition-colors duration-500", theme.primary)}>
                                    {activeStep === 0 ? 'Analysis Mode' : activeStep === 1 ? 'Live Tracker' : 'Production View'}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-6 h-[calc(100%-3rem)]">
                                <AnimatePresence mode="wait">
                                    {activeStep === 0 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full"
                                        >
                                            <MockRequestUI />
                                        </motion.div>
                                    )}
                                    {activeStep === 1 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full"
                                        >
                                            <MockAIProgressTracker />
                                        </motion.div>
                                    )}
                                    {activeStep === 2 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full"
                                        >
                                            <MockLaunchUI />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
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
    theme: typeof THEMES[0]
}

function TrustCard({ icon: Icon, title, desc, isActive, onClick, theme }: TrustCardProps) {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={cn(
                "group p-5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden",
                isActive
                    ? cn("bg-black/40", theme.border, theme.glow)
                    : "bg-transparent border-transparent hover:bg-white/5"
            )}
        >
            {/* Active Indicator Line */}
            {isActive && (
                <motion.div
                    layoutId="activeIndicator"
                    className={cn("absolute left-0 top-0 bottom-0 w-1", theme.bg.replace('/10', ''))}
                />
            )}

            <div className="flex items-start gap-4 pl-2">
                <div className={cn(
                    "p-3 rounded-xl transition-colors duration-300",
                    isActive ? theme.bg : "bg-white/5 group-hover:bg-white/10"
                )}>
                    <Icon className={cn(
                        "w-6 h-6 transition-colors duration-300",
                        isActive ? theme.primary : "text-muted-foreground group-hover:text-foreground"
                    )} />
                </div>
                <div>
                    <h3 className={cn(
                        "text-lg font-semibold mb-1 transition-colors duration-300",
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {desc}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

// --- MODERN MOCK UI COMPONENTS ---

function MockRequestUI() {
    return (
        <div className="flex flex-col h-full gap-4">
            {/* Chat/Input Area */}
            <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-blue-500/10 rounded-2xl rounded-tl-none p-4 text-sm text-blue-100 max-w-[85%]">
                    I need a modern SaaS dashboard for my AI startup. It should have real-time analytics and a dark mode.
                </div>
            </div>

            {/* AI Processing Cards */}
            <div className="flex-1 space-y-3 mt-2">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider ml-1">
                    AI Analysis in progress...
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3"
                >
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        <Layout className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-white">Dashboard Layout</div>
                        <div className="text-xs text-white/50">Sidebar Navigation • Grid System</div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 ml-auto" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3"
                >
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                        <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-white">Analytics Module</div>
                        <div className="text-xs text-white/50">Recharts Integration • Real-time Data</div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-blue-500 ml-auto" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-xl p-3 flex items-center justify-between"
                >
                    <span className="text-sm font-medium text-blue-200">Estimated Timeline: 4 Weeks</span>
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                </motion.div>
            </div>
        </div>
    )
}

function MockAIProgressTracker() {
    const steps = [
        { title: "Database Schema", status: "complete", time: "2 days ago" },
        { title: "API Development", status: "complete", time: "Yesterday" },
        { title: "Frontend Integration", status: "current", time: "Now" },
        { title: "User Testing", status: "pending", time: "Upcoming" },
    ]

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h4 className="text-sm font-medium text-white">Project Timeline</h4>
                    <p className="text-xs text-white/50">Sprint 2 • 65% Complete</p>
                </div>
                <div className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded font-medium animate-pulse">
                    Live Updates
                </div>
            </div>

            <div className="relative pl-4 space-y-6">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-white/10" />

                {steps.map((step, i) => (
                    <div key={i} className="relative flex items-center gap-4">
                        {/* Dot */}
                        <div className={cn(
                            "relative z-10 w-3 h-3 rounded-full border-2",
                            step.status === 'complete' ? "bg-purple-500 border-purple-500" :
                                step.status === 'current' ? "bg-black border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]" :
                                    "bg-black border-white/20"
                        )} />

                        <div className={cn(
                            "flex-1 p-3 rounded-xl border transition-all",
                            step.status === 'current'
                                ? "bg-purple-500/10 border-purple-500/30 translate-x-2"
                                : "bg-white/5 border-white/5 opacity-60"
                        )}>
                            <div className="flex justify-between items-center mb-1">
                                <span className={cn(
                                    "text-sm font-medium",
                                    step.status === 'current' ? "text-purple-200" : "text-white/70"
                                )}>{step.title}</span>
                                {step.status === 'complete' && <CheckCircle2 className="w-3 h-3 text-purple-500" />}
                                {step.status === 'current' && <Loader2 className="w-3 h-3 text-purple-400 animate-spin" />}
                            </div>
                            <div className="text-[10px] text-white/40">{step.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function MockLaunchUI() {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                    <Rocket className="w-10 h-10 text-emerald-400" />
                </div>
                {/* Orbiting particles */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-emerald-500/30"
                />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Ready for Takeoff</h3>
            <p className="text-sm text-white/60 max-w-[250px] mb-8">
                All systems operational. Performance optimized. Security checks passed.
            </p>

            <div className="grid grid-cols-2 gap-3 w-full">
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl">
                    <div className="text-xs text-emerald-500/70 mb-1">Performance</div>
                    <div className="text-lg font-bold text-emerald-400">100/100</div>
                </div>
                <div className="bg-teal-500/5 border border-teal-500/20 p-3 rounded-xl">
                    <div className="text-xs text-teal-500/70 mb-1">Global CDN</div>
                    <div className="flex items-center justify-center gap-1 text-lg font-bold text-teal-400">
                        <Globe className="w-4 h-4" /> Active
                    </div>
                </div>
            </div>

            <div className="mt-6 w-full">
                <button className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold rounded-lg hover:opacity-90 transition-opacity">
                    Launch Project
                </button>
            </div>
        </div>
    )
}
