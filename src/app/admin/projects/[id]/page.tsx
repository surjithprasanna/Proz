"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, ArrowLeft, Plus, Trash2, GripVertical, CheckCircle2, Clock, PlayCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface Project {
    id: string
    name: string
    status: string
    progress: number
    client_id: string | null
    price: string
    pricing_plan: string
}

interface Client {
    id: string
    full_name: string | null
}

interface Phase {
    id: string
    name: string
    description: string | null
    status: string
    order_index: number
}

export default function AdminProjectDetailPage() {
    const params = useParams()
    const router = useRouter()
    const projectId = params.id as string
    const supabase = createClient()
    const { toast } = useToast()

    const [project, setProject] = useState<Project | null>(null)
    const [clients, setClients] = useState<Client[]>([])
    const [phases, setPhases] = useState<Phase[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        status: "",
        progress: 0,
        price: "",
        pricing_plan: "",
        client_id: ""
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // Fetch Project
            const { data: projData, error: projError } = await supabase
                .from('projects')
                .select('*')
                .eq('id', projectId)
                .single()

            if (projError) throw projError
            setProject(projData)
            setFormData({
                name: projData.name,
                status: projData.status || "Discovery",
                progress: projData.progress || 0,
                price: projData.price || "",
                pricing_plan: projData.pricing_plan || "",
                client_id: projData.client_id || ""
            })

            // Fetch Phases
            const { data: phaseData, error: phaseError } = await supabase
                .from('project_phases')
                .select('*')
                .eq('project_id', projectId)
                .order('order_index', { ascending: true })

            if (phaseError) throw phaseError
            setPhases(phaseData || [])

            // Fetch Clients
            const { data: clientData, error: clientError } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'client')

            if (clientError) throw clientError
            setClients(clientData || [])

        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred"
            toast({ title: "Error", description: message, variant: "destructive" })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSaveProject = async () => {
        setIsSaving(true)
        try {
            const { error } = await supabase
                .from('projects')
                .update({
                    name: formData.name,
                    status: formData.status,
                    progress: formData.progress,
                    price: formData.price,
                    pricing_plan: formData.pricing_plan,
                    client_id: formData.client_id || null
                })
                .eq('id', projectId)

            if (error) throw error
            toast({ title: "Success", description: "Project details updated." })
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred"
            toast({ title: "Error", description: message, variant: "destructive" })
        } finally {
            setIsSaving(false)
        }
    }

    const handleAddPhase = async () => {
        try {
            const { data, error } = await supabase
                .from('project_phases')
                .insert([{
                    project_id: projectId,
                    name: "New Phase",
                    description: "Description of this phase",
                    status: "pending",
                    order_index: phases.length
                }])
                .select()
                .single()

            if (error) throw error
            setPhases([...phases, data])
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred"
            toast({ title: "Error", description: message, variant: "destructive" })
        }
    }

    const handleUpdatePhase = async (id: string, updates: Partial<Phase>) => {
        // Optimistic update
        setPhases(phases.map(p => p.id === id ? { ...p, ...updates } : p))

        try {
            const { error } = await supabase
                .from('project_phases')
                .update(updates)
                .eq('id', id)

            if (error) throw error
        } catch (error) {
            toast({ title: "Error", description: "Failed to update phase", variant: "destructive" })
            fetchData() // Revert on error
        }
    }

    const handleDeletePhase = async (id: string) => {
        if (!confirm("Are you sure?")) return

        try {
            const { error } = await supabase
                .from('project_phases')
                .delete()
                .eq('id', id)

            if (error) throw error
            setPhases(phases.filter(p => p.id !== id))
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred"
            toast({ title: "Error", description: message, variant: "destructive" })
        }
    }

    if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <h1 className="text-3xl font-bold">Manage Project: {project?.name}</h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Details */}
                <Card className="lg:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Project Name</Label>
                            <Input
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Assigned Client</Label>
                            <Select
                                value={formData.client_id}
                                onValueChange={val => setFormData({ ...formData, client_id: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Client" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clients.map(c => (
                                        <SelectItem key={c.id} value={c.id}>{c.full_name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Price</Label>
                                <Input
                                    placeholder="$5,000"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Plan</Label>
                                <Input
                                    placeholder="Pro Scale"
                                    value={formData.pricing_plan}
                                    onChange={e => setFormData({ ...formData, pricing_plan: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={val => setFormData({ ...formData, status: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Discovery">Discovery</SelectItem>
                                    <SelectItem value="Design">Design</SelectItem>
                                    <SelectItem value="Development">Development</SelectItem>
                                    <SelectItem value="Testing">Testing</SelectItem>
                                    <SelectItem value="Deployed">Deployed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Overall Progress (%)</Label>
                            <Input
                                type="number" min="0" max="100"
                                value={formData.progress}
                                onChange={e => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                            />
                        </div>

                        <Button className="w-full" onClick={handleSaveProject} disabled={isSaving}>
                            {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Save Details
                        </Button>
                    </CardContent>
                </Card>

                {/* Phase Management */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>AI Progress Tracker Phases</CardTitle>
                        <Button size="sm" onClick={handleAddPhase}>
                            <Plus className="w-4 h-4 mr-2" /> Add Phase
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {phases.length === 0 ? (
                            <div className="text-center py-10 text-muted-foreground">
                                No phases added yet. Add phases to visualize progress for the client.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {phases.map((phase, index) => (
                                    <div key={phase.id} className="flex gap-4 items-start p-4 border rounded-lg bg-card/50 hover:bg-card transition-colors">
                                        <div className="mt-2 text-muted-foreground">
                                            <GripVertical className="w-5 h-5" />
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            <div className="flex gap-2">
                                                <Input
                                                    value={phase.name}
                                                    onChange={e => handleUpdatePhase(phase.id, { name: e.target.value })}
                                                    className="font-medium"
                                                    placeholder="Phase Name"
                                                />
                                                <Select
                                                    value={phase.status}
                                                    onValueChange={val => handleUpdatePhase(phase.id, { status: val })}
                                                >
                                                    <SelectTrigger className={`w-[140px] ${phase.status === 'completed' ? 'text-green-500' :
                                                        phase.status === 'processing' ? 'text-blue-500' : 'text-muted-foreground'
                                                        }`}>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pending"><Clock className="w-4 h-4 inline mr-2" /> Pending</SelectItem>
                                                        <SelectItem value="processing"><PlayCircle className="w-4 h-4 inline mr-2" /> Processing</SelectItem>
                                                        <SelectItem value="completed"><CheckCircle2 className="w-4 h-4 inline mr-2" /> Completed</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <Input
                                                value={phase.description || ""}
                                                onChange={e => handleUpdatePhase(phase.id, { description: e.target.value })}
                                                className="text-sm text-muted-foreground"
                                                placeholder="AI Description (e.g. 'Optimizing database schema...')"
                                            />
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive/90"
                                            onClick={() => handleDeletePhase(phase.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
