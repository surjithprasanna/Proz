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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, X, FileText } from "lucide-react"
import { createClient } from "@/lib/supabase/client"


export default function AdminRequestsPage() {
    const [requests, setRequests] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedRequest, setSelectedRequest] = useState<any>(null)
    const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null)

    // Draft State: Record<requestId, { price, plan, accessCode, files }>
    const [drafts, setDrafts] = useState<Record<string, any>>({})

    // Upload State
    const [uploading, setUploading] = useState(false)
    const [committing, setCommitting] = useState(false)
    const [converting, setConverting] = useState(false)

    const supabase = createClient()

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



    const toggleExpand = (req: any) => {
        if (expandedRequestId === req.id) {
            setExpandedRequestId(null)
            setSelectedRequest(null)
        } else {
            setExpandedRequestId(req.id)
            setSelectedRequest(req)

            // Initialize draft if not exists
            if (!drafts[req.id]) {
                setDrafts(prev => ({
                    ...prev,
                    [req.id]: {
                        price: req.proposal_price || req.budget_range || "",
                        plan: req.proposal_plan || "Starter",
                        accessCode: req.access_code || "", // Empty if not generated yet
                        files: req.proposal_docs || [] // Existing docs if any
                    }
                }))
            }
        }
    }

    const updateDraft = (field: string, value: any) => {
        if (!selectedRequest) return
        setDrafts(prev => ({
            ...prev,
            [selectedRequest.id]: {
                ...prev[selectedRequest.id],
                [field]: value
            }
        }))
    }

    const generateCode = () => {
        const code = `PROZ-${Math.floor(1000 + Math.random() * 9000)}`
        updateDraft('accessCode', code)
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !selectedRequest) return
        const file = e.target.files[0]

        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB")
            return
        }

        setUploading(true)
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${selectedRequest.id}-${Math.random().toString(36).substring(7)}.${fileExt}`
            const { error: uploadError } = await supabase.storage
                .from('project-assets')
                .upload(`proposals/${fileName}`, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('project-assets')
                .getPublicUrl(`proposals/${fileName}`)

            const newFile = { name: file.name, url: publicUrl, type: 'file' }
            const currentFiles = drafts[selectedRequest.id]?.files || []
            updateDraft('files', [...currentFiles, newFile])
        } catch (error: any) {
            alert(`Upload failed: ${error.message}`)
        } finally {
            setUploading(false)
            // Reset input
            e.target.value = ''
        }
    }

    const removeFile = (index: number) => {
        if (!selectedRequest) return
        const currentFiles = drafts[selectedRequest.id]?.files || []
        const newFiles = currentFiles.filter((_: any, i: number) => i !== index)
        updateDraft('files', newFiles)
    }

    const handleCommit = async () => {
        if (!selectedRequest) return
        const draft = drafts[selectedRequest.id]
        if (!draft) return

        setCommitting(true)
        try {
            const res = await fetch('/api/admin/update-proposal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requestId: selectedRequest.id,
                    price: draft.price,
                    plan: draft.plan,
                    accessCode: draft.accessCode,
                    docs: draft.files
                })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Failed to commit proposal")

            // Update local state
            setRequests(prev => prev.map(r => r.id === selectedRequest.id ? {
                ...r,
                status: 'contacted',
                proposal_status: 'proposal_ready',
                proposal_price: draft.price,
                proposal_plan: draft.plan,
                access_code: draft.accessCode,
                proposal_docs: draft.files
            } : r))

            setSelectedRequest((prev: any) => ({ ...prev, status: 'contacted', proposal_status: 'proposal_ready' }))

            alert("Proposal Committed! You can now convert this request.")
        } catch (error: any) {
            alert(error.message)
        } finally {
            setCommitting(false)
        }
    }

    const handleConvert = async () => {
        if (!selectedRequest) return
        const draft = drafts[selectedRequest.id]
        if (!draft || !draft.accessCode) return

        setConverting(true)
        try {
            const res = await fetch('/api/admin/convert-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requestId: selectedRequest.id,
                    email: selectedRequest.email,
                    password: draft.accessCode,
                    projectName: `${selectedRequest.project_field} Project`,
                    budget: draft.price,
                    deadline: selectedRequest.deadline,
                    plan: draft.plan,
                    full_name: selectedRequest.full_name,
                    phone: selectedRequest.phone,
                    profession: selectedRequest.profession
                })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            setExpandedRequestId(null)
            fetchRequests()
            alert(`User created! Credentials:\nEmail: ${selectedRequest.email}\nPassword: ${draft.accessCode}`)
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
                            <TableHead>Time</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.map((req) => {
                            const draft = drafts[req.id] || {}
                            const isProposalReady = req.proposal_status === 'proposal_ready'

                            return (
                                <>
                                    <TableRow key={req.id} className={expandedRequestId === req.id ? "bg-muted/50" : ""}>
                                        <TableCell>{new Date(req.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                                        <TableCell>{req.full_name}</TableCell>
                                        <TableCell>{req.email}</TableCell>
                                        <TableCell>{req.phone}</TableCell>
                                        <TableCell className="capitalize">{req.project_field}</TableCell>
                                        <TableCell>{req.budget_range}</TableCell>
                                        <TableCell>
                                            <Badge variant={req.status === 'pending' ? 'secondary' : 'default'}>
                                                {req.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                variant={expandedRequestId === req.id ? "default" : "outline"}
                                                onClick={() => toggleExpand(req)}
                                            >
                                                {expandedRequestId === req.id ? "Close" : "Review"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    {expandedRequestId === req.id && (
                                        <TableRow>
                                            <TableCell colSpan={9} className="p-0">
                                                <div className="p-6 bg-muted/30 border-b">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        {/* Left: Client Details (Prefilled & Read-only) */}
                                                        <div className="space-y-4">
                                                            <h3 className="text-green-600 font-bold border-b border-green-500/30 pb-2">CLIENT_DETAILS</h3>
                                                            <div className="space-y-2">
                                                                <Label className="text-xs text-muted-foreground">FULL_NAME</Label>
                                                                <Input value={req.full_name} disabled className="bg-background/50" />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-xs text-muted-foreground">CONTACT_EMAIL</Label>
                                                                <Input value={req.email} disabled className="bg-background/50" />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-xs text-muted-foreground">WHATSAPP_NUMBER</Label>
                                                                <Input value={req.phone} disabled className="bg-background/50" />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-xs text-muted-foreground">PROFESSION</Label>
                                                                <Input value={req.profession} disabled className="bg-background/50" />
                                                            </div>
                                                            {req.files && (
                                                                <div className="pt-2">
                                                                    <Label className="text-xs text-muted-foreground">USER_ATTACHMENTS</Label>
                                                                    <div className="mt-1 space-y-1">
                                                                        {Array.isArray(req.files) ? req.files.map((f: any, i: number) => (
                                                                            <a key={i} href={f.url} target="_blank" className="block text-xs text-blue-500 hover:underline">
                                                                                📄 {f.name}
                                                                            </a>
                                                                        )) : <span className="text-xs text-muted-foreground">No files</span>}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Right: Project Config (Editable) */}
                                                        <div className="space-y-4">
                                                            <h3 className="text-green-600 font-bold border-b border-green-500/30 pb-2">PROJECT_CONFIG</h3>

                                                            <div className="space-y-2">
                                                                <Label className="text-xs text-muted-foreground">PROJECT_NAME</Label>
                                                                <Input value={`${req.project_field} Project`} disabled className="bg-background/50" />
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label className="text-xs text-muted-foreground">PRICING_PLAN</Label>
                                                                <select
                                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={draft.plan}
                                                                    onChange={(e) => updateDraft('plan', e.target.value)}
                                                                    disabled={isProposalReady}
                                                                >
                                                                    <option value="Starter">Starter (1)</option>
                                                                    <option value="Professional">Professional (2)</option>
                                                                    <option value="Enterprise">Enterprise (3)</option>
                                                                </select>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label className="text-xs text-muted-foreground">FINAL_QUOTE_PRICE</Label>
                                                                <Input
                                                                    value={draft.price}
                                                                    onChange={(e) => updateDraft('price', e.target.value)}
                                                                    disabled={isProposalReady}
                                                                />
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label className="text-xs text-muted-foreground">ACCESS_CODE (LOGIN PASSWORD)</Label>
                                                                <div className="flex gap-2">
                                                                    <Input
                                                                        value={draft.accessCode}
                                                                        readOnly
                                                                        placeholder="PROZ-XXXX"
                                                                        className="font-mono tracking-widest"
                                                                    />
                                                                    <Button
                                                                        variant="outline"
                                                                        className="border-green-500/30 text-green-500 hover:bg-green-500/10"
                                                                        onClick={generateCode}
                                                                        disabled={isProposalReady || !!draft.accessCode}
                                                                    >
                                                                        {draft.accessCode ? "GENERATED" : "GENERATE"}
                                                                    </Button>
                                                                </div>
                                                            </div>

                                                            {/* File Upload Section */}
                                                            <div className="space-y-2 pt-2 border-t border-border/50">
                                                                <Label className="text-xs text-muted-foreground flex justify-between">
                                                                    <span>PROPOSAL_DOCUMENTS</span>
                                                                    <span className="text-[10px] text-red-400">Max 5MB</span>
                                                                </Label>

                                                                {!isProposalReady && (
                                                                    <div className="flex gap-2">
                                                                        <Input
                                                                            type="file"
                                                                            onChange={handleFileUpload}
                                                                            disabled={uploading}
                                                                            className="text-xs file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                                                        />
                                                                        {uploading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                                                                    </div>
                                                                )}

                                                                {/* File List */}
                                                                <div className="space-y-1 mt-2">
                                                                    {draft.files?.map((file: any, idx: number) => (
                                                                        <div key={idx} className="flex items-center justify-between bg-background/50 p-2 rounded border text-xs">
                                                                            <a href={file.url} target="_blank" className="flex items-center gap-2 text-blue-500 hover:underline truncate max-w-[200px]">
                                                                                <FileText className="w-3 h-3" />
                                                                                {file.name}
                                                                            </a>
                                                                            {!isProposalReady && (
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="icon"
                                                                                    className="h-5 w-5 text-muted-foreground hover:text-red-500"
                                                                                    onClick={() => removeFile(idx)}
                                                                                >
                                                                                    <X className="w-3 h-3" />
                                                                                </Button>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div className="flex gap-3 pt-4">
                                                                {!isProposalReady ? (
                                                                    <Button
                                                                        onClick={handleCommit}
                                                                        disabled={committing || !draft.accessCode}
                                                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold"
                                                                    >
                                                                        {committing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                                        COMMIT & FREEZE
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        onClick={handleConvert}
                                                                        disabled={converting}
                                                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
                                                                    >
                                                                        {converting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                                        DEPLOY_PROJECT & CONVERT
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            )
                        })}
                    </TableBody>
                </Table>
            </div >
        </div >
    )
}
