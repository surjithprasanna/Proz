"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Lock, User, FileText,
    CreditCard, ChevronRight,
    ShieldCheck, Fingerprint,
    Database, Code2, Smartphone,
    Terminal, Activity, Globe
} from "lucide-react"
import { cn } from "@/lib/utils"

type Phase = 'ingest' | 'lock' | 'access' | 'enter' | 'reveal' | 'dashboard'

export function ClientPortalShowcase() {
    const [phase, setPhase] = useState<Phase>('ingest')

    // Auto-play sequence logic
    useEffect(() => {
        const timings = {
            ingest: 4000,
            lock: 2500,
            access: 3000, // Walking to door
            enter: 2000,  // Walking inside
            reveal: 1500, // Light expansion
            dashboard: 6000 // Live demo time
        }

        const timeout = setTimeout(() => {
            if (phase === 'ingest') setPhase('lock')
            else if (phase === 'lock') setPhase('access')
            else if (phase === 'access') setPhase('enter')
            else if (phase === 'enter') setPhase('reveal')
            else if (phase === 'reveal') setPhase('dashboard')
            else if (phase === 'dashboard') setPhase('ingest') // Loop back
        }, timings[phase])

        return () => clearTimeout(timeout)
    }, [phase])

    return (
        <section className="py-24 relative overflow-hidden bg-black/40 min-h-[800px] flex flex-col items-center justify-center perspective-[2000px]">
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
            </div>

            <div className="container mx-auto px-4 text-center mb-12 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Your Digital <span className="text-primary">Fortress</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Secure ingestion. Biometric access. Live transparency.
                </p>
            </div>

            <div className="relative w-full max-w-6xl h-[600px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {phase === 'ingest' && <IngestPhase key="ingest" />}
                    {phase === 'lock' && <LockPhase key="lock" />}
                    {(phase === 'access' || phase === 'enter') && (
                        <AccessPhase key="access" phase={phase} />
                    )}
                    {(phase === 'reveal' || phase === 'dashboard') && (
                        <DashboardPhase key="dashboard" isRevealing={phase === 'reveal'} />
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

// --- SHARED: THE CENTRAL CARD UI ---
function CentralAccessCard({ className, children }: { className?: string, children?: React.ReactNode }) {
    return (
        <div className={cn("relative w-[340px] h-[500px] bg-black border border-primary/30 rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center p-8 shadow-2xl backface-hidden", className)}>
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                <div className="relative w-24 h-24 bg-black border border-primary/30 rounded-full flex items-center justify-center">
                    <Lock className="w-10 h-10 text-primary" />
                </div>
            </div>

            <h3 className="text-xl font-bold mb-2">Client Access</h3>
            <p className="text-sm text-muted-foreground mb-8">
                Tap to authenticate and access your project dashboard.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-primary/70 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                <Fingerprint className="w-4 h-4" />
                <span>SCAN_ID_REQ</span>
            </div>
            {children}
        </div>
    )
}

// --- PHASE 1: INGESTION ---
function IngestPhase() {
    return (
        <motion.div
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative flex items-center justify-center w-full h-full"
        >
            <div className="z-10 relative">
                <CentralAccessCard />
                <div className="absolute inset-0 bg-primary/5 rounded-3xl animate-pulse" />
            </div>

            {/* Flying Project Cards (From Right) */}
            <FlyingCard delay={0} yOffset={-180} />
            <FlyingCard delay={1.2} yOffset={0} />
            <FlyingCard delay={2.4} yOffset={180} />
        </motion.div>
    )
}

function FlyingCard({ delay, yOffset }: { delay: number, yOffset: number }) {
    return (
        <motion.div
            initial={{ x: 800, y: yOffset, opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ x: 0, y: 0, opacity: [0, 1, 1, 0], scale: [0.8, 1, 0.1] }}
            transition={{ duration: 2.5, delay, ease: "easeInOut" }}
            className="absolute z-20 w-[280px] h-[160px] bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex gap-4 shadow-xl items-center"
        >
            <div className="w-16 h-16 bg-white/5 rounded-lg animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 bg-white/10 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-white/10 rounded animate-pulse" />
                <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
            </div>
        </motion.div>
    )
}

// --- PHASE 2: LOCK ---
function LockPhase() {
    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 1 }} // Stay visible for transition
            className="relative"
        >
            <CentralAccessCard className="border-primary shadow-[0_0_60px_rgba(34,197,94,0.3)]" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center z-20"
            >
                <motion.div
                    initial={{ scale: 2, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                >
                    <Lock className="w-24 h-24 text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                </motion.div>
                <div className="mt-8 text-sm font-mono text-primary animate-pulse tracking-widest">SYSTEM LOCKED</div>
            </motion.div>
        </motion.div>
    )
}

// --- PHASE 3 & 4: ACCESS & ENTER (3D DOOR) ---
function AccessPhase({ phase }: { phase: 'access' | 'enter' }) {
    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-[2000px]">
            {/* The Vault Door Container */}
            <motion.div
                className="relative preserve-3d"
                animate={{ rotateY: phase === 'enter' ? -110 : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d", transformOrigin: "left" }}
            >
                <CentralAccessCard className="z-20 bg-black" />

                {/* Inside the Vault (Bright Light) */}
                <div
                    className="absolute inset-0 bg-white rounded-3xl flex items-center justify-center overflow-hidden"
                    style={{ transform: "translateZ(-1px) rotateY(180deg)", backfaceVisibility: "hidden" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-100 to-white animate-pulse" />
                    <div className="absolute inset-0 bg-white blur-xl opacity-80" />
                </div>
            </motion.div>

            {/* The Robotic Avatar */}
            <motion.div
                initial={{ x: 500, opacity: 0 }}
                animate={
                    phase === 'access'
                        ? { x: 120, opacity: 1 } // Walk to door
                        : { x: 0, z: -200, scale: 0.8, opacity: 0 } // Walk INSIDE
                }
                transition={{
                    duration: phase === 'access' ? 2 : 1.5,
                    ease: "linear",
                    delay: phase === 'enter' ? 0.2 : 0
                }}
                className="absolute z-30 bottom-[50px]"
            >
                <RoboticAvatar isWalking={true} />
            </motion.div>

            {/* Scan Beam */}
            {phase === 'access' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute z-40 w-[2px] h-[200px] bg-green-500/80 blur-[2px] left-[50%]"
                    style={{ transform: "translateX(100px)" }} // Align with avatar stop position
                >
                    <div className="absolute top-0 bottom-0 -left-4 -right-4 bg-green-500/10 blur-md" />
                </motion.div>
            )}
        </div>
    )
}

function RoboticAvatar({ isWalking }: { isWalking: boolean }) {
    return (
        <div className="relative w-32 h-64">
            {/* Head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-20 bg-zinc-200 rounded-2xl z-20 border-2 border-zinc-400 flex items-center justify-center overflow-hidden shadow-lg">
                <div className="w-12 h-8 bg-black rounded-md flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75" />
                </div>
            </div>

            {/* Neck */}
            <div className="absolute top-18 left-1/2 -translate-x-1/2 w-6 h-6 bg-zinc-600 rounded-full z-10" />

            {/* Body */}
            <div className="absolute top-22 left-1/2 -translate-x-1/2 w-24 h-32 bg-zinc-100 rounded-3xl z-20 border-2 border-zinc-300 shadow-inner flex flex-col items-center pt-4">
                <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 flex items-center justify-center">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full animate-ping" />
                </div>
            </div>

            {/* Arms */}
            <motion.div
                animate={isWalking ? { rotate: [-25, 25, -25] } : {}}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="absolute top-24 left-[-10px] w-8 h-28 bg-zinc-300 rounded-2xl origin-top border border-zinc-400"
            >
                <div className="absolute bottom-0 w-full h-8 bg-zinc-400 rounded-b-2xl" /> {/* Hand */}
            </motion.div>
            <motion.div
                animate={isWalking ? { rotate: [25, -25, 25] } : {}}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="absolute top-24 right-[-10px] w-8 h-28 bg-zinc-300 rounded-2xl origin-top border border-zinc-400"
            >
                <div className="absolute bottom-0 w-full h-8 bg-zinc-400 rounded-b-2xl" /> {/* Hand */}
            </motion.div>

            {/* Legs */}
            <motion.div
                animate={isWalking ? { rotate: [35, -35, 35] } : {}}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="absolute top-52 left-4 w-9 h-32 bg-zinc-200 rounded-2xl origin-top border border-zinc-400"
            >
                <div className="absolute bottom-0 w-full h-10 bg-zinc-800 rounded-b-2xl" /> {/* Boot */}
            </motion.div>
            <motion.div
                animate={isWalking ? { rotate: [-35, 35, -35] } : {}}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="absolute top-52 right-4 w-9 h-32 bg-zinc-200 rounded-2xl origin-top border border-zinc-400"
            >
                <div className="absolute bottom-0 w-full h-10 bg-zinc-800 rounded-b-2xl" /> {/* Boot */}
            </motion.div>
        </div>
    )
}

// --- PHASE 5: REVEAL & DASHBOARD ---
function DashboardPhase({ isRevealing }: { isRevealing: boolean }) {
    return (
        <motion.div
            className="w-full h-full absolute inset-0 z-50 flex items-center justify-center"
        >
            {/* The Expanding Light Transition */}
            {isRevealing && (
                <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 20, opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeIn" }}
                    className="absolute w-32 h-32 bg-white rounded-full blur-xl z-50"
                />
            )}

            <motion.div
                initial={isRevealing ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-full max-w-6xl h-[700px] bg-black/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col relative"
            >
                {/* Blurred Edges Overlay */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

                {/* Header */}
                <div className="h-16 border-b border-white/10 flex items-center px-8 justify-between bg-white/5 z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="h-6 w-[1px] bg-white/10" />
                        <div className="text-sm font-mono text-muted-foreground">admin@proz-secure-core:~</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-green-500 text-xs font-bold px-3 py-1 bg-green-500/10 rounded-full animate-pulse">
                            <Activity className="w-3 h-3" /> SYSTEM ACTIVE
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden relative">
                    {/* Sidebar */}
                    <div className="w-72 border-r border-white/10 bg-black/50 p-6 hidden md:flex flex-col gap-4 z-10">
                        <div className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">Active Projects</div>
                        <SidebarItem icon={Database} label="E-Commerce API" active />
                        <SidebarItem icon={Smartphone} label="Mobile App v2.0" />
                        <SidebarItem icon={Globe} label="Corporate Portal" />

                        <div className="mt-8 text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">Monitoring</div>
                        <SidebarItem icon={Terminal} label="Live Logs" />
                        <SidebarItem icon={ShieldCheck} label="Security Audit" />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-8 flex flex-col gap-8 overflow-y-auto z-10">
                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-6">
                            <StatCard label="Total Requests" value="2.4M" color="text-blue-500" />
                            <StatCard label="Avg Response" value="18ms" color="text-green-500" />
                            <StatCard label="Error Rate" value="0.01%" color="text-purple-500" />
                        </div>

                        {/* Live Terminal */}
                        <div className="flex-1 bg-black border border-white/10 rounded-xl p-6 font-mono text-sm relative overflow-hidden shadow-inner">
                            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent z-10" />
                            <LiveTerminalOutput />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

interface SidebarItemProps {
    icon: React.ElementType
    label: string
    active?: boolean
}

function SidebarItem({ icon: Icon, label, active }: SidebarItemProps) {
    return (
        <div className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300",
            active ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-white/5 hover:text-white hover:translate-x-1"
        )}>
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
            {active && <ChevronRight className="w-4 h-4 ml-auto" />}
        </div>
    )
}

interface StatCardProps {
    label: string
    value: string
    color: string
}

function StatCard({ label, value, color }: StatCardProps) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
            <div className="text-sm text-muted-foreground mb-2">{label}</div>
            <div className={cn("text-3xl font-bold tracking-tight", color)}>{value}</div>
        </div>
    )
}

function LiveTerminalOutput() {
    const [lines, setLines] = useState<string[]>([
        "> System initialized...",
        "> Connected to database cluster (us-east-1)",
    ])

    useEffect(() => {
        const possibleLines = [
            "> [INFO] User login detected from 192.168.1.x",
            "> [SUCCESS] API endpoint /v1/users responded in 12ms",
            "> [WARN] Memory usage spike detected (GC triggered)",
            "> [INFO] Running scheduled backup...",
            "> [SUCCESS] Backup completed (2.4GB)",
            "> [DEPLOY] New commit detected: 'Fix login bug'",
            "> [BUILD] Starting build process...",
            "> [TEST] Running unit tests (142/142 passed)",
            "> [DEPLOY] Successfully deployed to staging",
            "> [SECURITY] Scanning for vulnerabilities...",
            "> [SECURITY] No threats found.",
            "> [DB] Optimizing query performance...",
        ]

        const interval = setInterval(() => {
            setLines(prev => {
                const newLine = possibleLines[Math.floor(Math.random() * possibleLines.length)]
                const newLines = [...prev, newLine]
                if (newLines.length > 10) newLines.shift()
                return newLines
            })
        }, 800)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col gap-2 mt-2">
            {lines.map((line, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                        "flex items-center gap-3",
                        line.includes("[SUCCESS]") ? "text-green-400" :
                            line.includes("[WARN]") ? "text-yellow-400" :
                                line.includes("[DEPLOY]") ? "text-blue-400" :
                                    line.includes("[SECURITY]") ? "text-red-400" :
                                        "text-gray-400"
                    )}
                >
                    <span className="opacity-30 text-xs">{new Date().toLocaleTimeString()}</span>
                    <span>{line}</span>
                </motion.div>
            ))}
            <div className="animate-pulse text-primary">_</div>
        </div>
    )
}
