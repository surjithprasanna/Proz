"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Loader2, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
                .eq('user_id', user.id)

            if (data) setProjects(data)
            setLoading(false)
        }

        fetchProjects()
    }, [])

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>
    }

    return (
        <div className="space-y-8 p-8">
            <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>

            {projects.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground mb-4">You don't have any active projects yet.</p>
                        <Button asChild>
                            <Link href="/request">Start a Project</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {projects.map((project) => (
                        <Card key={project.id}>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>{project.name}</CardTitle>
                                <Badge>{project.status}</Badge>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Progress</span>
                                        <span>{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} />
                                </div>

                                <div className="flex gap-4">
                                    {project.live_url && (
                                        <Button asChild variant="outline" size="sm">
                                            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="mr-2 h-4 w-4" /> Live Site
                                            </a>
                                        </Button>
                                    )}
                                    {project.repo_url && (
                                        <Button asChild variant="outline" size="sm">
                                            <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                                                <Github className="mr-2 h-4 w-4" /> Repository
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
