"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, FileText, Lock, User, Mail, Phone, Briefcase, DollarSign, Calendar } from "lucide-react"
import { ProjectTimeline } from "@/components/dashboard/ProjectTimeline"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function DashboardPage() {
    const [project, setProject] = useState<any>(null)
    const [clientProfile, setClientProfile] = useState<any>(null)
    const [phases, setPhases] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                setLoading(false)
                return
            }

            // 1. Fetch Client Profile
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()
            setClientProfile(profile)

            // 2. Fetch Active Project
            const { data: projectData } = await supabase
                .from('projects')
                .select('*')
                .eq('user_id', user.id)
                .single() // Assuming one active project for now

            if (projectData) {
                setProject(projectData)

                // 3. Fetch Phases
                const { data: phasesData } = await supabase
                    .from('project_phases')
                    .select('*')
                    .eq('project_id', projectData.id)
                    .order('order_index', { ascending: true })

                if (phasesData) setPhases(phasesData)
            }
            setLoading(false)
        }

        fetchData()
    }, [])

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen bg-black text-green-500"><Loader2 className="w-8 h-8 animate-spin" /></div>
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">No Active Project Found</h1>
                <p className="text-muted-foreground">Please contact the administrator to initiate your project.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 space-y-12 max-w-7xl mx-auto font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Project Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-1">Real-time overview of your development cycle.</p>
                </div>
                <Badge variant="outline" className={`px-4 py-1 text-sm ${project.status === 'Deployed' ? 'border-green-500 text-green-500 bg-green-500/10' :
                    'border-blue-500 text-blue-500 bg-blue-500/10'
                    }`}>
                    {project.status || "Active"}
                </Badge>
            </div>

            {/* SECTION 1: Project Details (Admin Style - Read Only) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Client Details */}
                <div className="space-y-4">
                    <h3 className="text-green-500/80 font-bold border-b border-green-500/30 pb-2 flex items-center gap-2">
                        <User className="w-4 h-4" /> CLIENT_DETAILS
                    </h3>
                    <div className="space-y-2">
                        <Label className="text-xs text-green-500/60">FULL_NAME</Label>
                        <div className="w-full bg-white/5 border border-white/10 rounded p-2 text-white/80 text-sm">
                            {clientProfile?.full_name || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs text-green-500/60">CONTACT_EMAIL</Label>
                        <div className="w-full bg-white/5 border border-white/10 rounded p-2 text-white/80 text-sm flex items-center gap-2">
                            <Mail className="w-3 h-3 opacity-50" /> {clientProfile?.email || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs text-green-500/60">WHATSAPP_NUMBER</Label>
                        <div className="w-full bg-white/5 border border-white/10 rounded p-2 text-white/80 text-sm flex items-center gap-2">
                            <Phone className="w-3 h-3 opacity-50" /> {clientProfile?.phone || "N/A"}
                        </div>
                    </div>
                </div>

                {/* Project Config */}
                <div className="space-y-4">
                    <h3 className="text-green-500/80 font-bold border-b border-green-500/30 pb-2 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> PROJECT_CONFIG
                    </h3>
                    <div className="space-y-2">
                        <Label className="text-xs text-green-500/60">PROJECT_NAME</Label>
                        <div className="w-full bg-white/5 border border-white/10 rounded p-2 text-white/80 text-sm font-medium">
                            {project.name}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs text-green-500/60">DESCRIPTION</Label>
                        <div className="w-full bg-white/5 border border-white/10 rounded p-2 text-white/80 text-sm">
                            {project.description || "No description available"}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs text-green-500/60">PRICING_PLAN</Label>
                        <div className="w-full bg-white/5 border border-white/10 rounded p-2 text-white/80 text-sm">
                            {project.pricing_plan || "Custom"}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs text-green-500/60">TOTAL_QUOTE</Label>
                            <div className="w-full bg-white/5 border border-white/10 rounded p-2 text-green-400 text-sm font-bold flex items-center gap-1">
                                <DollarSign className="w-3 h-3" /> {project.price}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs text-green-500/60">ACCESS_CODE</Label>
                            <div className="w-full bg-white/5 border border-white/10 rounded p-2 text-white/60 text-sm font-mono tracking-widest flex items-center gap-2">
                                <Lock className="w-3 h-3" /> ••••••
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: Project Evolution Timeline */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Project Evolution Map</h2>
                        <p className="text-sm text-muted-foreground">Live tracking of development milestones and system integration.</p>
                    </div>
                </div>

                <Card className="bg-black/40 border-green-500/20 backdrop-blur-xl overflow-hidden relative">
                    {/* Background Grid/Effects */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <CardContent className="p-0">
                        <ProjectTimeline phases={phases} />
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
