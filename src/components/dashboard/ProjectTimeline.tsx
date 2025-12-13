"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Clock, Circle, Calendar, Timer } from "lucide-react"
import { cn } from "@/lib/utils"

interface Phase {
    id: string
    name: string
    description: string | null
    status: string
    estimated_time?: string
    start_date?: string
}

interface ProjectTimelineProps {
    phases: Phase[]
}

export function ProjectTimeline({ phases }: ProjectTimelineProps) {
    return (
        <div className="relative space-y-8 p-4">
            {/* Vertical Line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-green-500/50 via-green-500/20 to-transparent" />

            {phases.map((phase, index) => {
                const isCompleted = phase.status === 'completed'
                const isProcessing = phase.status === 'processing'
                const isPending = phase.status === 'pending'

                return (
                    <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex gap-6 group"
                    >
                        {/* Status Icon */}
                        <div className={cn(
                            "relative z-10 flex items-center justify-center w-14 h-14 rounded-full border-2 backdrop-blur-xl transition-all duration-500",
                            isCompleted ? "bg-green-500/20 border-green-500 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]" :
                                isProcessing ? "bg-blue-500/10 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-pulse" :
                                    "bg-black/40 border-white/10 text-white/20"
                        )}>
                            {isCompleted ? <CheckCircle2 className="w-6 h-6" /> :
                                isProcessing ? <Clock className="w-6 h-6 animate-spin-slow" /> :
                                    <Circle className="w-6 h-6" />}
                        </div>

                        {/* Content Card */}
                        <div className={cn(
                            "flex-1 p-6 rounded-xl border backdrop-blur-sm transition-all duration-300",
                            isCompleted ? "bg-green-900/10 border-green-500/30" :
                                isProcessing ? "bg-blue-900/10 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]" :
                                    "bg-white/5 border-white/5 opacity-60"
                        )}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                <h3 className={cn(
                                    "text-lg font-bold tracking-wide",
                                    isCompleted ? "text-green-400" :
                                        isProcessing ? "text-blue-400" :
                                            "text-white/40"
                                )}>
                                    {phase.name}
                                </h3>

                                {(phase.estimated_time || phase.start_date) && (
                                    <div className="flex flex-wrap gap-3 text-xs font-mono">
                                        {phase.start_date && (
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/40 border border-white/10 text-white/60">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(phase.start_date).toLocaleDateString()}
                                            </div>
                                        )}
                                        {phase.estimated_time && (
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/40 border border-white/10 text-white/60">
                                                <Timer className="w-3 h-3" />
                                                {phase.estimated_time}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <p className="text-sm text-white/60 leading-relaxed">
                                {phase.description || "Awaiting initiation..."}
                            </p>

                            {isProcessing && (
                                <div className="mt-4 h-1 w-full bg-blue-900/30 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-blue-500"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
