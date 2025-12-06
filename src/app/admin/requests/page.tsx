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
import { Loader2 } from "lucide-react"

export default function AdminRequestsPage() {
    const [requests, setRequests] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedRequest, setSelectedRequest] = useState<any>(null)
    const [password, setPassword] = useState("")
    const [converting, setConverting] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        fetchRequests()
    }, [])

    const fetchRequests = async () => {
        try {
            const res = await fetch('/api/admin/get-requests')
            const data = await res.json()
            if (Array.isArray(data)) setRequests(data)
        } catch (error) {
            console.error("Failed to fetch requests", error)
        } finally {
            setLoading(false)
        }
    }

    const handleConvert = async () => {
        if (!selectedRequest || !password) return
        setConverting(true)

        try {
            const res = await fetch('/api/admin/convert-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requestId: selectedRequest.id,
                    email: selectedRequest.email,
                    password: password,
                    projectName: `${selectedRequest.project_field} Project`, // Default name
                    budget: selectedRequest.budget_range,
                    deadline: selectedRequest.deadline
                })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            // Success
            setDialogOpen(false)
            fetchRequests() // Refresh list
            alert(`User created! Credentials:\nEmail: ${selectedRequest.email}\nPassword: ${password}`)
        } catch (error: any) {
            alert(error.message)
        } finally {
            setConverting(false)
        }
    }

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold">Project Requests</h1>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.map((req) => (
                            <TableRow key={req.id}>
                                <TableCell>{new Date(req.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>{req.full_name}</TableCell>
                                <TableCell>{req.email}</TableCell>
                                <TableCell className="capitalize">{req.project_field}</TableCell>
                                <TableCell>{req.budget_range}</TableCell>
                                <TableCell>
                                    <Badge variant={req.status === 'pending' ? 'secondary' : 'default'}>
                                        {req.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {req.status === 'pending' && (
                                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedRequest(req)
                                                        setPassword(Math.random().toString(36).slice(-8)) // Auto-gen password
                                                    }}
                                                >
                                                    Convert
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Convert to Project</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-4 py-4">
                                                    <div className="space-y-2">
                                                        <Label>User Email</Label>
                                                        <Input value={selectedRequest?.email} disabled />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Temporary Password</Label>
                                                        <Input
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                        <p className="text-xs text-muted-foreground">
                                                            Copy this password to send to the client.
                                                        </p>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button onClick={handleConvert} disabled={converting}>
                                                        {converting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                        Create User & Project
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
