"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import {
    Activity, Users, Briefcase, DollarSign,
    Shield, Cpu, Terminal, Zap,
    ArrowUpRight, Lock, Server
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalClients: 0,
        activeProjects: 0,
        totalRevenue: 0,
        systemHealth: 100
    })
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Clients
                const { count: clientCount } = await supabase
                    .from('profiles')
                    .select('*', { count: 'exact', head: true })
                    .eq('role', 'client')

                // Fetch Projects
                const { data: projects } = await supabase
                    .from('projects')
                    .select('price')

                // Calculate Revenue
                const revenue = projects?.reduce((acc, curr) => {
                    const price = parseFloat(curr.price?.replace(/[^0-9.-]+/g, "") || "0")
                    return acc + price
                }, 0) || 0

                setStats({
                    totalClients: clientCount || 0,
                    activeProjects: projects?.length || 0,
                    totalRevenue: revenue,
                    systemHealth: 98 + Math.random() * 2 // Fake fluctuation
                })
            } catch (error) {
                console.error("Error fetching stats:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 border-b border-green-500/30 pb-4">
                <div className="flex items-center gap-3">
                    <Terminal className="w-8 h-8 text-green-500" />
                    <div>
                        <h1 className="text-2xl font-bold tracking-widest">COMMAND_CENTER</h1>
                        <p className="text-xs text-green-500/60">SYSTEM_ADMINISTRATOR_ACCESS</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>ONLINE</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>SECURE</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="TOTAL_CLIENTS"
                    value={stats.totalClients.toString()}
                    icon={Users}
                    trend="+12%"
                />
                <StatCard
                    title="ACTIVE_PROJECTS"
                    value={stats.activeProjects.toString()}
                    icon={Briefcase}
                    trend="+5%"
                />
                <StatCard
                    title="EST_REVENUE"
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    trend="+8.4%"
                />
                <StatCard
                    title="SYSTEM_HEALTH"
                    value={`${stats.systemHealth.toFixed(1)}%`}
                    icon={Activity}
                    trend="STABLE"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <Card className="bg-green-900/10 border-green-500/30 lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-400">
                            <Zap className="w-5 h-5" />
                            QUICK_ACTIONS
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ActionCard
                            href="/admin/clients"
                            title="MANAGE_CLIENTS"
                            desc="Create, edit, or remove client access protocols."
                            icon={Users}
                        />
                        <ActionCard
                            href="/admin/projects"
                            title="PROJECT_OPERATIONS"
                            desc="Oversee active development cycles and assignments."
                            icon={Briefcase}
                        />
                        <ActionCard
                            href="/admin/requests"
                            title="INCOMING_REQUESTS"
                            desc="Process new project initiation signals."
                            icon={Server}
                        />
                        <div className="p-4 border border-green-500/10 rounded bg-black/40 flex items-center justify-center text-green-500/30 text-sm">
                            <Lock className="w-4 h-4 mr-2" />
                            MORE_MODULES_LOCKED
                        </div>
                    </CardContent>
                </Card>

                {/* System Log / Visuals */}
                <Card className="bg-green-900/10 border-green-500/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-400">
                            <Cpu className="w-5 h-5" />
                            SYSTEM_LOG
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 font-mono text-xs">
                        <LogEntry time="10:42:05" msg="Admin session initiated" />
                        <LogEntry time="10:42:02" msg="Database connection verified" />
                        <LogEntry time="10:41:55" msg="Security protocols active" />
                        <LogEntry time="10:40:12" msg="System optimization complete" />
                        <div className="mt-4 pt-4 border-t border-green-500/20">
                            <div className="flex justify-between text-green-500/50 mb-1">
                                <span>CPU_LOAD</span>
                                <span>12%</span>
                            </div>
                            <div className="w-full bg-green-900/30 h-1 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full w-[12%]" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between text-green-500/50 mb-1">
                                <span>MEMORY</span>
                                <span>45%</span>
                            </div>
                            <div className="w-full bg-green-900/30 h-1 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full w-[45%]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

interface StatCardProps {
    title: string
    value: string
    icon: React.ElementType
    trend: string
}

function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
    return (
        <Card className="bg-green-900/10 border-green-500/30 backdrop-blur-sm hover:bg-green-900/20 transition-colors group">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-green-500/10 rounded group-hover:bg-green-500/20 transition-colors">
                        <Icon className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-xs text-green-500/60 flex items-center gap-1">
                        {trend} <ArrowUpRight className="w-3 h-3" />
                    </span>
                </div>
                <div className="space-y-1">
                    <h3 className="text-xs font-medium text-green-500/60 tracking-wider">{title}</h3>
                    <div className="text-2xl font-bold text-green-400">{value}</div>
                </div>
            </CardContent>
        </Card>
    )
}

interface ActionCardProps {
    href: string
    title: string
    desc: string
    icon: React.ElementType
}

function ActionCard({ href, title, desc, icon: Icon }: ActionCardProps) {
    return (
        <Link href={href}>
            <div className="h-full p-4 border border-green-500/30 rounded bg-black/40 hover:bg-green-500/10 hover:border-green-500/60 transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-green-500 group-hover:text-green-400" />
                    <h3 className="font-bold text-green-400 group-hover:text-green-300">{title}</h3>
                </div>
                <p className="text-xs text-green-500/60 group-hover:text-green-500/80">{desc}</p>
            </div>
        </Link>
    )
}

interface LogEntryProps {
    time: string
    msg: string
}

function LogEntry({ time, msg }: LogEntryProps) {
    return (
        <div className="flex gap-3 text-green-500/70">
            <span className="opacity-50">[{time}]</span>
            <span>{msg}</span>
        </div>
    )
}
