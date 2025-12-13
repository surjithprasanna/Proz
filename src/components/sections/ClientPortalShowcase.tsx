"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Lock,
    FileText, Code2, Layout, Network, // File Type Icons
    CheckCircle2, Clock, AlertCircle, // Status Icons
    Bell, Search, MoreHorizontal
} from "lucide-react"
import { cn } from "@/lib/utils"

type Phase = 'idle' | 'ingest' | 'chip_entry' | 'chip_snap' | 'expand' | 'dashboard'

export function ClientPortalShowcase() {
    const [phase, setPhase] = useState<Phase>('idle')

    // Auto-play sequence logic
    useEffect(() => {
        const timings = {
            idle: 1000,
            ingest: 4000,     // Files flying in
            chip_entry: 2500, // Chip wind path
            chip_snap: 1500,  // Chip connecting
            expand: 1000,     // Expansion
            dashboard: 8000   // Live demo (longer for reading)
        }

        const timeout = setTimeout(() => {
            if (phase === 'idle') setPhase('ingest')
            else if (phase === 'ingest') setPhase('chip_entry')
            else if (phase === 'chip_entry') setPhase('chip_snap')
            else if (phase === 'chip_snap') setPhase('expand')
            else if (phase === 'expand') setPhase('dashboard')
            else if (phase === 'dashboard') {
                // Stop the loop, stay on dashboard
            }
        }, timings[phase])

        return () => clearTimeout(timeout)
    }, [phase])

    return (
        <section className="py-16 relative overflow-hidden bg-black/40 min-h-[800px] flex flex-col items-center justify-center">
            <div className="container mx-auto px-4 text-center mb-12 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Transparent <span className="text-primary">Progress</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Each client receives secure dashboard access for transparent, real-time project tracking and ongoing updates from our developers.
                </p>
            </div>

            <div className="relative w-full max-w-6xl h-[600px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {(phase !== 'expand' && phase !== 'dashboard') && (
                        <CentralVault key="vault" phase={phase} />
                    )}
                    {(phase === 'expand' || phase === 'dashboard') && (
                        <DashboardPhase key="dashboard" isExpanding={phase === 'expand'} />
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

// --- CENTRAL VAULT (INGEST & AUTH) ---
function CentralVault({ phase }: { phase: Phase }) {
    return (
        <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative flex items-center justify-center w-full h-full"
        >
            {/* The Main Vault Box */}
            <div className="relative w-[340px] h-[500px] bg-black border border-primary/30 rounded-3xl flex flex-col items-center justify-center shadow-2xl overflow-hidden z-20">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                <div className="relative z-20 flex flex-col items-center w-full px-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8 relative">
                        <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
                        <Lock className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-xl font-bold mb-2">Secure Vault</h3>
                    <p className="text-sm text-muted-foreground mb-12 text-center">
                        {phase === 'ingest' ? "Ingesting Project Assets..." : "Awaiting Security Chip..."}
                    </p>

                    {/* The Chip Slot Placeholder */}
                    <div className="w-16 h-12 bg-zinc-900 rounded border border-zinc-700 shadow-inner flex items-center justify-center relative overflow-hidden group">
                        <div className="text-xs font-mono text-zinc-600 tracking-[0.2em] opacity-50">****</div>

                        {/* The Chip Snapping In */}
                        {(phase === 'chip_snap' || phase === 'expand') && (
                            <motion.div
                                layoutId="security-chip"
                                className="absolute inset-0 bg-yellow-500 rounded flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                            >
                                <div className="text-xs font-bold text-black tracking-[0.2em]">****</div>
                            </motion.div>
                        )}
                    </div>
                    <div className="mt-2 text-[10px] font-mono text-zinc-500">INSERT CHIP</div>
                </div>
            </div>

            {/* Flying Files (Ingest Phase) - Specific Types */}
            {phase === 'ingest' && (
                <>
                    <FlyingFile type="doc" delay={0} angle={-25} />
                    <FlyingFile type="code" delay={0.8} angle={-10} />
                    <FlyingFile type="ui" delay={1.6} angle={10} />
                    <FlyingFile type="diagram" delay={2.4} angle={25} />
                </>
            )}

            {/* Flying Security Chip (Entry Phase) */}
            {phase === 'chip_entry' && (
                <motion.div
                    layoutId="security-chip"
                    initial={{ x: 500, y: -300, rotate: 180, scale: 0.5, opacity: 0 }}
                    animate={{
                        x: [500, 100, -50, 0],
                        y: [-300, 50, -20, 130], // Target Y needs to match slot position relative to center
                        rotate: [180, 45, -10, 0],
                        scale: 1,
                        opacity: 1
                    }}
                    transition={{ duration: 2.5, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
                    className="absolute z-30 w-16 h-12 bg-yellow-500 rounded flex items-center justify-center shadow-lg border border-yellow-400"
                    style={{ top: "50%", marginTop: "55px" }} // Approximate slot position
                >
                    <div className="text-xs font-bold text-black tracking-[0.2em]">****</div>
                </motion.div>
            )}
        </motion.div>
    )
}

function FlyingFile({ type, delay, angle }: { type: 'doc' | 'code' | 'ui' | 'diagram', delay: number, angle: number }) {
    const icons = {
        doc: FileText,
        code: Code2,
        ui: Layout,
        diagram: Network
    }
    const Icon = icons[type]
    const colors = {
        doc: "bg-blue-500/20 text-blue-500 border-blue-500/30",
        code: "bg-purple-500/20 text-purple-500 border-purple-500/30",
        ui: "bg-pink-500/20 text-pink-500 border-pink-500/30",
        diagram: "bg-orange-500/20 text-orange-500 border-orange-500/30"
    }

    return (
        <motion.div
            initial={{ x: 600, y: angle * 8, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, y: 0, opacity: [0, 1, 1, 0], scale: [0.8, 1, 0.1] }}
            transition={{ duration: 2, delay, ease: "easeInOut" }}
            className={cn(
                "absolute z-10 w-40 h-52 backdrop-blur-md border rounded-xl p-4 flex flex-col shadow-xl",
                "bg-zinc-900/90 border-white/10"
            )}
        >
            {/* Header Icon */}
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-4", colors[type])}>
                <Icon className="w-5 h-5" />
            </div>

            {/* Content Preview */}
            <div className="flex-1 space-y-2 opacity-50">
                {type === 'doc' && (
                    <>
                        <div className="h-2 w-full bg-white/20 rounded" />
                        <div className="h-2 w-full bg-white/20 rounded" />
                        <div className="h-2 w-2/3 bg-white/20 rounded" />
                    </>
                )}
                {type === 'code' && (
                    <div className="space-y-1">
                        <div className="h-1.5 w-1/2 bg-purple-400/40 rounded ml-4" />
                        <div className="h-1.5 w-3/4 bg-blue-400/40 rounded ml-8" />
                        <div className="h-1.5 w-1/4 bg-yellow-400/40 rounded ml-8" />
                        <div className="h-1.5 w-1/3 bg-white/20 rounded ml-4" />
                    </div>
                )}
                {type === 'ui' && (
                    <div className="border border-white/10 rounded h-full p-1 flex flex-col gap-1">
                        <div className="h-2 w-full bg-white/20 rounded-sm" />
                        <div className="flex gap-1 flex-1">
                            <div className="w-1/3 bg-white/10 rounded-sm h-full" />
                            <div className="w-2/3 bg-white/10 rounded-sm h-full" />
                        </div>
                    </div>
                )}
                {type === 'diagram' && (
                    <div className="relative h-full w-full">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-white/20" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 rounded-sm border border-white/20" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 rounded-sm border border-white/20" />
                        <div className="absolute inset-0 border-t border-white/10 top-2" />
                    </div>
                )}
            </div>

            <div className="mt-4 pt-2 border-t border-white/5 flex justify-between items-center">
                <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                <div className="h-1.5 w-4 bg-white/10 rounded-full" />
            </div>
        </motion.div>
    )
}

// --- DASHBOARD (CLIENT PROJECT TRACKER) ---
function DashboardPhase({ isExpanding }: { isExpanding: boolean }) {
    return (
        <motion.div
            initial={isExpanding ? { width: "340px", height: "500px", borderRadius: "24px" } : { width: "100%", height: "100%" }}
            animate={{ width: "100%", height: "600px", borderRadius: "24px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl flex flex-col relative max-w-5xl font-sans"
        >
            {/* Top Navigation Bar */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="h-16 border-b border-white/10 flex items-center px-6 justify-between bg-white/5"
            >
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-black">P</div>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <nav className="flex gap-6 text-sm font-medium text-muted-foreground">
                        <span className="text-white">Overview</span>
                        <span>Deliverables</span>
                        <span>Invoices</span>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                        <div className="text-right hidden md:block">
                            <div className="text-sm font-medium text-white">Alex Chen</div>
                            <div className="text-xs text-muted-foreground">Client View</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border border-white/20" />
                    </div>
                </div>
            </motion.div>

            <div className="flex flex-1 overflow-hidden bg-zinc-900/50">
                {/* Main Content Area */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        {/* Project Header Card */}
                        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-2xl font-bold text-white">E-Commerce Platform Redesign</h1>
                                        <span className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-medium border border-yellow-500/20">
                                            In Progress
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground">Revamping the customer checkout flow and mobile experience.</p>
                                </div>
                                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                    <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white font-medium">Phase 3: Development</span>
                                    <span className="text-primary">65% Complete</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "65%" }}
                                        transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                                        className="h-full bg-primary rounded-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Recent Activity Feed */}
                            <div className="md:col-span-2 space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Recent Activity</h3>
                                <ActivityItem
                                    icon={CheckCircle2}
                                    color="text-green-500"
                                    title="Wireframes Approved"
                                    time="2 hours ago"
                                    desc="Client signed off on the mobile checkout flows."
                                    delay={0.9}
                                />
                                <ActivityItem
                                    icon={Code2}
                                    color="text-blue-500"
                                    title="Database Schema Finalized"
                                    time="Yesterday"
                                    desc="PostgreSQL migrations have been applied to staging."
                                    delay={1.0}
                                />
                                <ActivityItem
                                    icon={Layout}
                                    color="text-purple-500"
                                    title="UI Components Updated"
                                    time="2 days ago"
                                    desc="Added new dark mode tokens to the design system."
                                    delay={1.1}
                                />
                            </div>

                            {/* Next Milestone */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Up Next</h3>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2 }}
                                    className="bg-zinc-900 border border-white/10 rounded-xl p-5 space-y-4"
                                >
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-white">Beta Release</div>
                                        <div className="text-sm text-muted-foreground">Due in 2 days</div>
                                    </div>
                                    <div className="pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>Pending API Integration</span>
                                        </div>
                                    </div>
                                    <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
                                        View Details
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

function ActivityItem({ icon: Icon, color, title, time, desc, delay }: { icon: React.ElementType, color: string, title: string, time: string, desc: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="bg-zinc-900 border border-white/10 rounded-xl p-4 flex gap-4 hover:bg-zinc-800/50 transition-colors"
        >
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-zinc-950 border border-white/5", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-white">{title}</h4>
                    <span className="text-xs text-muted-foreground">{time}</span>
                </div>
                <p className="text-sm text-zinc-400 mt-1">{desc}</p>
            </div>
        </motion.div>
    )
}
