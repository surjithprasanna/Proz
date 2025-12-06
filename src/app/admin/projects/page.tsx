"use client"

import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedProject, setSelectedProject] = useState<any>(null)
    const [status, setStatus] = useState("")
    const [progress, setProgress] = useState(0)
    const [updating, setUpdating] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/admin/get-projects')
            const data = await res.json()
            if (Array.isArray(data)) setProjects(data)
        } catch (error) {
            console.error("Failed to fetch projects", error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async () => {
        if (!selectedProject) return
        setUpdating(true)

        try {
            const res = await fetch('/api/admin/update-project', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedProject.id,
                    status,
                    progress
                })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            setDialogOpen(false)
            fetchProjects()
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUpdating(false)
        }
    }

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold">Manage Projects</h1>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((proj) => (
                            <TableRow key={proj.id}>
                                <TableCell>{proj.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{proj.status}</Badge>
                                </TableCell>
                                <TableCell>{proj.progress}%</TableCell>
                                <TableCell>
                                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedProject(proj)
                                                    setStatus(proj.status)
                                                    setProgress(proj.progress)
                                                }}
                                            >
                                                Update
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Update Project Status</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <Label>Status</Label>
                                                    <Select value={status} onValueChange={setStatus}>
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
                                                    <Label>Progress (%)</Label>
                                                    <Input
                                                        type="number"
                                                        value={progress}
                                                        onChange={(e) => setProgress(Number(e.target.value))}
                                                        min={0}
                                                        max={100}
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button onClick={handleUpdate} disabled={updating}>
                                                    {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                    Save Changes
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
