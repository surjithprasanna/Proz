"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Circle, Loader2, Terminal, Cpu, ShieldCheck, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface Phase {
    id: string
    name: string
    description: string
    status: "pending" | "processing" | "completed"
    order_index: number
}

export function AIProgressTracker({ projectId }: { projectId: string }) {
    const [phases, setPhases] = useState<Phase[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchPhases()

        // Realtime subscription
        const channel = supabase
            .channel('project_phases_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'project_phases',
                    filter: `project_id=eq.${projectId}`
                },
                () => {
                    fetchPhases()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [projectId])

    const fetchPhases = async () => {
        const { data } = await supabase
            .from('project_phases')
            .select('*')
            .eq('project_id', projectId)
            .order('order_index', { ascending: true })

        if (data) setPhases(data)
        setLoading(false)
    }

    if (loading) return <div className="p-8 text-center text-green-500 font-mono animate-pulse">INITIALIZING TRACKER...</div>

    return (
        <div className="w-full bg-black/90 border border-green-500/30 rounded-lg overflow-hidden font-mono shadow-[0_0_20px_rgba(0,255,0,0.1)]">
            {/* Header */}
            <div className="bg-green-900/20 border-b border-green-500/30 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-400">
                    <Terminal className="w-4 h-4" />
                    <span className="text-sm font-bold tracking-wider">PROJECT_STATUS_MONITOR_V1.0</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/30" />
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 relative">
                {/* Scanline effect */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />

                <div className="space-y-1">
                    {phases.map((phase, index) => (
                        <motion.div
                            key={phase.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "relative flex items-start gap-4 p-3 rounded border transition-all duration-300",
                                phase.status === 'processing' ? "bg-green-500/10 border-green-500/50 shadow-[0_0_10px_rgba(0,255,0,0.1)]" :
                                    phase.status === 'completed' ? "bg-green-900/5 border-green-500/20 opacity-60" :
                                        "border-transparent opacity-40"
                            )}
                        >
                            {/* Icon */}
                            <div className="mt-1">
                                {phase.status === 'completed' ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : phase.status === 'processing' ? (
                                    <Loader2 className="w-5 h-5 text-green-400 animate-spin" />
                                ) : (
                                    <Circle className="w-5 h-5 text-green-700" />
                                )}
                            </div>

                            {/* Text */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className={cn(
                                        "text-sm font-bold uppercase tracking-wide",
                                        phase.status === 'processing' ? "text-green-400" : "text-green-600"
                                    )}>
                                        {`[PHASE_0${index + 1}]: ${phase.name}`}
                                    </h3>
                                    {phase.status === 'processing' && (
                                        <span className="text-[10px] text-green-400 animate-pulse">PROCESSING...</span>
                                    )}
                                </div>
                                <p className="text-xs text-green-500/70 mt-1 font-sans">
                                    {phase.description}
                                </p>
                            </div>

                            {/* Active Indicator Line */}
                            {phase.status === 'processing' && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"
                                />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Footer Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-green-500/20 text-xs text-green-600">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-3 h-3" />
                        <span>SYSTEM: ONLINE</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                        <Zap className="w-3 h-3" />
                        <span>LATENCY: 12ms</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                        <ShieldCheck className="w-3 h-3" />
                        <span>SECURE CON: ENCRYPTED</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
