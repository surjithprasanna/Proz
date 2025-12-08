"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, ExternalLink, FileText, CheckCircle, XCircle, MessageSquare, Phone, Mail, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AIProgressTracker } from "@/components/features/AIProgressTracker"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardPage() {
    const [projects, setProjects] = useState<any[]>([])
    const [proposals, setProposals] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showContactOptions, setShowContactOptions] = useState<string | null>(null) // ID of proposal
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                setLoading(false)
                return
            }

            // Fetch Active Projects
            const { data: projectData } = await supabase
                .from('projects')
                .select('*')
                .eq('client_id', user.id)

            if (projectData) setProjects(projectData)

            // Fetch Pending Proposals
            const { data: proposalData } = await supabase
                .from('project_requests')
                .select('*')
                .eq('client_id', user.id)
                .in('proposal_status', ['quoted', 'modification_requested']) // Fetch both statuses

            if (proposalData) setProposals(proposalData)

            setLoading(false)
        }

        fetchData()
    }, [])

    const handleAcceptProposal = async (proposalId: string) => {
        alert("Proposal Accepted! Project initialization started.")
    }

    const handleRequestModification = async (proposalId: string) => {
        // 1. Update status in DB
        const { error } = await supabase
            .from('project_requests')
            .update({ proposal_status: 'modification_requested' })
            .eq('id', proposalId)

        if (!error) {
            // 2. Update local state
            setProposals(prev => prev.map(p =>
                p.id === proposalId ? { ...p, proposal_status: 'modification_requested' } : p
            ))
            // 3. Show contact options
            setShowContactOptions(proposalId)
        }
    }

    const handleCancelProposal = async (proposalId: string) => {
        if (confirm("Are you sure you want to decline this proposal?")) {
            const { error } = await supabase
                .from('project_requests')
                .update({ proposal_status: 'rejected' })
                .eq('id', proposalId)

            if (!error) {
                setProposals(prev => prev.filter(p => p.id !== proposalId))
            }
        }
    }

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>
    }

    return (
        <div className="space-y-8 p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Client Dashboard</h1>
                <Button asChild variant="outline">
                    <Link href="/request">New Request</Link>
                </Button>
            </div>

            {/* Pending Proposals Section */}
            {proposals.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-yellow-500 flex items-center gap-2">
                        <FileText className="w-5 h-5" /> Pending Proposals
                    </h2>
                    {proposals.map(proposal => (
                        <Card key={proposal.id} className={`border-yellow-500/30 bg-yellow-500/5 ${proposal.proposal_status === 'modification_requested' ? 'opacity-75' : ''}`}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>{proposal.project_field}</CardTitle>
                                        <CardDescription>Proposal for {proposal.full_name}</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                                        {proposal.proposal_status === 'modification_requested' ? 'Modification Requested' : 'Action Required'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-black/40 rounded border border-yellow-500/20">
                                        <div className="text-sm text-muted-foreground mb-1">Proposed Price</div>
                                        <div className="text-2xl font-bold text-yellow-400">{proposal.proposal_price}</div>
                                    </div>
                                    <div className="p-4 bg-black/40 rounded border border-yellow-500/20">
                                        <div className="text-sm text-muted-foreground mb-1">Project Goal</div>
                                        <div className="text-sm">{proposal.project_goal}</div>
                                    </div>
                                </div>

                                {/* Attached Documents */}
                                {proposal.proposal_docs && proposal.proposal_docs.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Attached Documents</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {proposal.proposal_docs.map((doc: any, idx: number) => (
                                                <a
                                                    key={idx}
                                                    href={doc.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-sm text-blue-400 transition-colors"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    {doc.name}
                                                    <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end border-t border-yellow-500/10 pt-6">
                                <Button
                                    variant="default"
                                    className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                                    onClick={() => handleAcceptProposal(proposal.id)}
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Accept Quote
                                </Button>

                                <div className="relative w-full sm:w-auto">
                                    <AnimatePresence>
                                        {showContactOptions === proposal.id ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute bottom-full mb-2 right-0 bg-zinc-900 border border-zinc-800 p-2 rounded shadow-xl flex flex-col gap-2 min-w-[200px] z-10"
                                            >
                                                <div className="text-xs text-muted-foreground p-1 text-center">Modification Requested. Contact Admin:</div>
                                                <Button variant="ghost" className="justify-start" onClick={() => window.open('tel:+1234567890')}>
                                                    <Phone className="w-4 h-4 mr-2" /> Call Admin
                                                </Button>
                                                <Button variant="ghost" className="justify-start" onClick={() => window.open('mailto:admin@proz.com')}>
                                                    <Mail className="w-4 h-4 mr-2" /> Email Admin
                                                </Button>
                                            </motion.div>
                                        ) : null}
                                    </AnimatePresence>
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto"
                                        onClick={() => handleRequestModification(proposal.id)}
                                    >
                                        <MessageSquare className="w-4 h-4 mr-2" />
                                        {proposal.proposal_status === 'modification_requested' ? 'Contact for Changes' : 'Request Modification'}
                                    </Button>
                                </div>

                                <Button
                                    variant="ghost"
                                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20 w-full sm:w-auto"
                                    onClick={() => handleCancelProposal(proposal.id)}
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Decline
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {projects.length === 0 && proposals.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground mb-4">You don&apos;t have any active projects or pending proposals.</p>
                        <Button asChild>
                            <Link href="/request">Start a Project</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-12">
                    {projects.map((project) => (
                        <div key={project.id} className="space-y-6">
                            {/* Project Header */}
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-card p-6 rounded-lg border shadow-sm">
                                <div>
                                    <h2 className="text-2xl font-bold">{project.name}</h2>
                                    <div className="flex gap-2 mt-2">
                                        <Badge variant="secondary">{project.status}</Badge>
                                        {project.pricing_plan && <Badge variant="outline">{project.pricing_plan}</Badge>}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-muted-foreground">Total Quote</div>
                                    <div className="text-2xl font-bold">{project.price || "TBD"}</div>
                                </div>
                            </div>

                            {/* AI Progress Tracker */}
                            <AIProgressTracker projectId={project.id} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
