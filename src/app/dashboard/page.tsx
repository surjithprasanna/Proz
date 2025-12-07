"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Loader2, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AIProgressTracker } from "@/components/features/AIProgressTracker"

export default function DashboardPage() {
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchProjects = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                setLoading(false)
                return
            }

            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('client_id', user.id) // Fixed: use client_id instead of user_id

            if (data) setProjects(data)
            setLoading(false)
        }

        fetchProjects()
    }, [])

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

            {projects.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground mb-4">You don&apos;t have any active projects yet.</p>
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
