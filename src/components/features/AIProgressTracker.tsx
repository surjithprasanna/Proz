"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion } from "framer-motion"
import { CheckCircle2, Circle, Loader2, Clock, ArrowRight } from "lucide-react"
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

    if (loading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading project timeline...</div>

    return (
        <div className="space-y-4">
            {phases.map((phase, index) => {
                const isProcessing = phase.status === 'processing'
                const isCompleted = phase.status === 'completed'
                const isPending = phase.status === 'pending'

                return (
                    <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                            "group p-5 rounded-xl border transition-all duration-300 cursor-default relative overflow-hidden",
                            isProcessing ? "bg-black/40 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]" :
                                isCompleted ? "bg-blue-500/5 border-blue-500/10" :
                                    "bg-transparent border-transparent opacity-50"
                        )}
                    >
                        {/* Active Indicator Bar */}
                        {isProcessing && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}

                        <div className="flex items-start gap-4 pl-2">
                            {/* Icon */}
                            <div className={cn(
                                "p-3 rounded-xl transition-colors duration-300",
                                isProcessing ? "bg-blue-500/10" :
                                    isCompleted ? "bg-blue-500/10" :
                                        "bg-white/5"
                            )}>
                                {isCompleted ? (
                                    <CheckCircle2 className="w-6 h-6 text-blue-500" />
                                ) : isProcessing ? (
                                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                                ) : (
                                    <Circle className="w-6 h-6 text-muted-foreground" />
                                )}
                            </div>

                            {/* Text */}
                            <div>
                                <h3 className={cn(
                                    "text-lg font-semibold mb-1 transition-colors duration-300",
                                    isProcessing || isCompleted ? "text-foreground" : "text-muted-foreground"
                                )}>
                                    {phase.name}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {phase.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
