"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import {
    Activity, Users, Briefcase, DollarSign,
    Shield, Cpu, Terminal, Zap,
    ArrowUpRight, Lock, Server, FileText, AlertCircle
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

                {/* Request Management */}
                <Card className="bg-green-900/10 border-green-500/30 lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-400">
                            <Server className="w-5 h-5" />
                            INCOMING_REQUEST_STREAM
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RequestList />
                    </CardContent>
                </Card>

                {/* Create Project Form (Legacy/Manual) */}
                <Card className="bg-green-900/10 border-green-500/30 lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-400">
                            <Terminal className="w-5 h-5" />
                            MANUAL_PROJECT_INITIATION
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CreateProjectForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function RequestList() {
    const [requests, setRequests] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedRequest, setSelectedRequest] = useState<any>(null)
    const supabase = createClient()

    useEffect(() => {
        const fetchRequests = async () => {
            const { data } = await supabase
                .from('project_requests')
                .select('*')
                .order('created_at', { ascending: false })
            if (data) setRequests(data)
            setLoading(false)
        }
        fetchRequests()
    }, [])

    if (loading) return <div className="text-green-500/50 animate-pulse">SCANNING_NETWORK...</div>

    return (
        <div className="space-y-4">
            {requests.map(req => (
                <div key={req.id} className="border border-green-500/20 bg-black/40 p-4 rounded hover:border-green-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="text-green-400 font-bold">{req.project_field}</div>
                            <div className="text-xs text-green-500/60">{req.full_name} | {req.profession}</div>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded border flex items-center gap-1
                            ${req.proposal_status === 'quoted' ? 'border-yellow-500 text-yellow-500' :
                                req.proposal_status === 'modification_requested' ? 'border-orange-500 text-orange-500' :
                                    'border-green-500/30 text-green-500/60'}`}>
                            {req.proposal_status === 'modification_requested' && <AlertCircle className="w-3 h-3" />}
                            {req.proposal_status === 'quoted' ? 'QUOTED' :
                                req.proposal_status === 'modification_requested' ? 'MODIFICATION_REQ' : 'PENDING'}
                        </div>
                    </div>
                    <p className="text-xs text-green-500/80 mb-4 line-clamp-2">{req.project_goal}</p>

                    <Button
                        size="sm"
                        variant="outline"
                        className={`w-full border-green-500/30 hover:bg-green-500/10 text-green-400 
                            ${req.proposal_status === 'modification_requested' ? 'bg-orange-900/20 border-orange-500/50 text-orange-400' : ''}`}
                        onClick={() => setSelectedRequest(req)}
                    >
                        {req.proposal_status === 'quoted' ? 'MODIFY_PROPOSAL' :
                            req.proposal_status === 'modification_requested' ? 'REVIEW_MODIFICATION' : 'INITIATE_PROPOSAL_SEQUENCE'}
                    </Button>

                    {selectedRequest?.id === req.id && (
                        <ProposalForm request={req} onClose={() => setSelectedRequest(null)} />
                    )}
                </div>
            ))}
        </div>
    )
}

function ProposalForm({ request, onClose }: { request: any, onClose: () => void }) {
    const [price, setPrice] = useState(request.proposal_price || "")
    const [accessCode, setAccessCode] = useState(`PROZ-${Math.floor(1000 + Math.random() * 9000)}`)
    const [docName, setDocName] = useState("")
    const [docUrl, setDocUrl] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Construct docs array
            const docs = docName && docUrl ? [{ name: docName, url: docUrl, type: 'link' }] : []

            const res = await fetch('/api/admin/submit-proposal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requestId: request.id,
                    proposalPrice: price,
                    proposalDocs: docs,
                    accessCode: accessCode
                })
            })
            if (!res.ok) throw new Error('Failed')
            alert('PROPOSAL_TRANSMITTED')
            onClose()
            window.location.reload() // Lazy refresh
        } catch (e) {
            alert('TRANSMISSION_ERROR')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border-t border-green-500/20 bg-green-500/5 rounded">
            <h4 className="text-sm font-bold text-green-400 mb-4">CONFIGURE_PROPOSAL</h4>
            <div className="space-y-4">
                <div>
                    <label className="text-xs text-green-500/60">ESTIMATED_COST</label>
                    <input
                        className="w-full bg-black border border-green-500/30 rounded p-2 text-green-400 text-sm"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="$5,000 - $8,000"
                        required
                    />
                </div>
                <div>
                    <label className="text-xs text-green-500/60">ASSIGN_ACCESS_CODE</label>
                    <input
                        className="w-full bg-black border border-green-500/30 rounded p-2 text-green-400 text-sm font-mono"
                        value={accessCode}
                        onChange={e => setAccessCode(e.target.value)}
                        required
                    />
                </div>

                <div className="border-t border-green-500/20 pt-4">
                    <label className="text-xs text-green-500/60 flex items-center gap-2 mb-2">
                        <FileText className="w-3 h-3" /> ATTACH_DOCUMENT (OPTIONAL)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            className="bg-black border border-green-500/30 rounded p-2 text-green-400 text-xs"
                            value={docName}
                            onChange={e => setDocName(e.target.value)}
                            placeholder="Document Name (e.g. Project Plan)"
                        />
                        <input
                            className="bg-black border border-green-500/30 rounded p-2 text-green-400 text-xs"
                            value={docUrl}
                            onChange={e => setDocUrl(e.target.value)}
                            placeholder="Document URL (e.g. Google Drive Link)"
                        />
                    </div>
                </div>

                <div className="flex gap-2 pt-2">
                    <Button type="submit" disabled={loading} className="flex-1 bg-green-600 hover:bg-green-700 text-black font-bold text-xs">
                        {loading ? 'TRANSMITTING...' : 'SEND_PROPOSAL'}
                    </Button>
                    <Button type="button" onClick={onClose} variant="ghost" className="text-green-500/60 text-xs">
                        CANCEL
                    </Button>
                </div>
            </div>
        </form>
    )
}

function CreateProjectForm() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        accessCode: "",
        projectName: "",
        price: "$5,000",
        pricingPlan: "Pro Scale"
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('/api/admin/create-client', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (!res.ok) throw new Error('Failed to create project')
            alert('Project Initiated & Access Code Sent!')
            setFormData({ fullName: "", email: "", phone: "", accessCode: "", projectName: "", price: "$5,000", pricingPlan: "Pro Scale" })
        } catch (error) {
            alert('Error initiating project')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h3 className="text-green-500/80 font-bold border-b border-green-500/30 pb-2">CLIENT_DETAILS</h3>
                <div className="space-y-2">
                    <label className="text-xs text-green-500/60">FULL_NAME</label>
                    <input
                        className="w-full bg-black border border-green-500/30 rounded p-2 text-green-400 focus:outline-none focus:border-green-500"
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-green-500/60">CONTACT_EMAIL</label>
                    <input
                        className="w-full bg-black border border-green-500/30 rounded p-2 text-green-400 focus:outline-none focus:border-green-500"
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-green-500/60">WHATSAPP_NUMBER</label>
                    <input
                        className="w-full bg-black border border-green-500/30 rounded p-2 text-green-400 focus:outline-none focus:border-green-500"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1234567890"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-green-500/80 font-bold border-b border-green-500/30 pb-2">PROJECT_CONFIG</h3>
                <div className="space-y-2">
                    <label className="text-xs text-green-500/60">PROJECT_NAME</label>
                    <input
                        className="w-full bg-black border border-green-500/30 rounded p-2 text-green-400 focus:outline-none focus:border-green-500"
                        value={formData.projectName}
                        onChange={e => setFormData({ ...formData, projectName: e.target.value })}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-green-500/60">ACCESS_CODE (PASSWORD)</label>
                    <div className="flex gap-2">
                        <input
                            className="w-full bg-black border border-green-500/30 rounded p-2 text-green-400 focus:outline-none focus:border-green-500 font-mono tracking-widest"
                            value={formData.accessCode}
                            onChange={e => setFormData({ ...formData, accessCode: e.target.value })}
                            placeholder="PROZ-XXXX"
                            required
                        />
                        <Button
                            type="button"
                            variant="outline"
                            className="border-green-500/30 text-green-500 hover:bg-green-500/10"
                            onClick={() => setFormData({ ...formData, accessCode: `PROZ-${Math.floor(1000 + Math.random() * 9000)}` })}
                        >
                            GENERATE
                        </Button>
                    </div>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-black font-bold mt-6" disabled={loading}>
                    {loading ? "INITIALIZING..." : "DEPLOY_PROJECT & NOTIFY_CLIENT"}
                </Button>
            </div>
        </form>
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
