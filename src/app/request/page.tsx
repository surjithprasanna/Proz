"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Send, ArrowRight, CheckCircle2, Upload, Link as LinkIcon, FileText, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { PageWrapper } from "@/components/layout/PageWrapper"

export default function RequestPage() {
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const supabase = createClient()

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        profession: "",
        college: "",
        degree: "",
        projectType: "",
        projectName: "",
        budgetRange: "",
        deadline: "",
        fileLinks: "",
        uploadedFiles: [] as string[] // Array of URLs
    })

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        setUploading(true)
        const file = e.target.files[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        try {
            const { error: uploadError } = await supabase.storage
                .from('project-assets')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('project-assets')
                .getPublicUrl(filePath)
            setFormData(prev => ({
                ...prev,
                uploadedFiles: [...prev.uploadedFiles, publicUrl]
            }))

            alert("File uploaded successfully!")

        } catch (error: any) {
            console.error("Upload error:", error)
            alert(`Upload failed: ${error.message}`)
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Combine links and uploaded files
            const allFiles = [
                ...(formData.fileLinks ? [{ name: "User Links", url: formData.fileLinks, type: "link" }] : []),
                ...formData.uploadedFiles.map((url, idx) => ({ name: `Upload ${idx + 1}`, url, type: "file" }))
            ]

            // Helper to convert empty strings to null (prevents type errors in DB)
            const sanitize = (val: string) => val.trim() === "" ? null : val.trim()

            // Map profession to valid organization_type (must be lowercase: student, startup, business, enterprise)
            const getOrgType = (prof: string) => {
                const p = prof || ""
                if (p === 'Student') return 'student'
                if (p === 'Founder') return 'startup'
                if (p === 'Business Owner') return 'business'
                if (p === 'Professional') return 'business' // Map to business
                return 'startup' // Default fallback
            }

            const payload = {
                full_name: sanitize(formData.fullName),
                email: sanitize(formData.email),
                phone: sanitize(formData.phone),
                profession: sanitize(formData.profession),
                organization_type: getOrgType(formData.profession), // Fix for check constraint
                college: formData.profession === 'Student' ? sanitize(formData.college) : null,
                degree: formData.profession === 'Student' ? sanitize(formData.degree) : null,
                project_field: sanitize(formData.projectName) || "Untitled Project",
                name: sanitize(formData.projectName) || "Untitled Project", // Fix for legacy 'name' column constraint
                budget_range: sanitize(formData.budgetRange),
                deadline: sanitize(formData.deadline),
                files: allFiles.length > 0 ? allFiles : null, // Send null if empty array
                status: 'pending',
                expected_features: [] // Fix for legacy constraint: column exists in DB and is NOT NULL
            }

            const { error } = await supabase
                .from('project_requests')
                .insert([payload])

            if (error) throw error

            await fetch('/api/notify/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'NEW_REQUEST',
                    data: formData
                })
            })

            setSubmitted(true)
        } catch (error: any) {
            console.error("Error submitting request:", error)
            alert(`Failed to submit: ${error.message || JSON.stringify(error)}`)
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <PageWrapper>
                <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[80vh]">
                    <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 text-center p-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4 text-white">Request Received!</h2>
                            <p className="text-zinc-400 mb-8">
                                We have notified our team. You will receive a proposal shortly via email/WhatsApp.
                            </p>
                            <Button asChild className="w-full bg-white text-black hover:bg-zinc-200">
                                <a href="/">Return Home</a>
                            </Button>
                        </motion.div>
                    </Card>
                </div>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper>
            <div className="container mx-auto px-4 py-20 max-w-3xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Start Your Project</h1>
                    <p className="text-zinc-400 text-lg">Tell us about your vision. We handle the rest.</p>
                </div>

                <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
                    <CardHeader className="border-b border-zinc-800 pb-6">
                        <CardTitle className="text-2xl text-white">Project Details</CardTitle>
                        <CardDescription className="text-zinc-500">Fields marked with * are required.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8">
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Section 1: Identity */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-xs">1</span>
                                    About You
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-zinc-300">Full Name *</Label>
                                        <Input
                                            required
                                            className="bg-black border-zinc-800 text-white focus:border-green-500"
                                            value={formData.fullName}
                                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-300">Profession *</Label>
                                        <Select
                                            onValueChange={(val) => setFormData({ ...formData, profession: val })}
                                            value={formData.profession}
                                        >
                                            <SelectTrigger className="bg-black border-zinc-800 text-white">
                                                <SelectValue placeholder="Select your role" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                <SelectItem value="Student">Student</SelectItem>
                                                <SelectItem value="Founder">Startup Founder</SelectItem>
                                                <SelectItem value="Professional">Working Professional</SelectItem>
                                                <SelectItem value="Business Owner">Business Owner</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Dynamic Student Fields */}
                                    <AnimatePresence>
                                        {formData.profession === 'Student' && (
                                            <>
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="space-y-2"
                                                >
                                                    <Label className="text-zinc-300">College / University *</Label>
                                                    <Input
                                                        required
                                                        className="bg-black border-zinc-800 text-white"
                                                        value={formData.college}
                                                        onChange={e => setFormData({ ...formData, college: e.target.value })}
                                                        placeholder="MIT, Stanford..."
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="space-y-2"
                                                >
                                                    <Label className="text-zinc-300">Degree / Major *</Label>
                                                    <Input
                                                        required
                                                        className="bg-black border-zinc-800 text-white"
                                                        value={formData.degree}
                                                        onChange={e => setFormData({ ...formData, degree: e.target.value })}
                                                        placeholder="B.Tech CS, MBA..."
                                                    />
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>

                                    <div className="space-y-2">
                                        <Label className="text-zinc-300">Email *</Label>
                                        <Input
                                            required
                                            type="email"
                                            className="bg-black border-zinc-800 text-white"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-300">WhatsApp Number *</Label>
                                        <Input
                                            required
                                            className="bg-black border-zinc-800 text-white"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: The Project */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-xs">2</span>
                                    The Vision
                                </h3>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-zinc-300">Do you have a clear idea? *</Label>
                                        <Select
                                            onValueChange={(val) => setFormData({ ...formData, projectType: val })}
                                            value={formData.projectType}
                                        >
                                            <SelectTrigger className="bg-black border-zinc-800 text-white">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                <SelectItem value="Idea">I have a clear idea</SelectItem>
                                                <SelectItem value="No Idea">I don't have an idea (Need Consulting)</SelectItem>
                                                <SelectItem value="Existing">I have an existing project</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-zinc-300">Estimated Budget</Label>
                                            <Input
                                                className="bg-black border-zinc-800 text-white"
                                                value={formData.budgetRange}
                                                onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                                                placeholder="e.g. $5k - $10k"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-zinc-300">Deadline</Label>
                                            <Input
                                                className="bg-black border-zinc-800 text-white"
                                                value={formData.deadline}
                                                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                                                placeholder="e.g. 2 months"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-zinc-300 flex items-center gap-2">
                                            <LinkIcon className="w-4 h-4" /> Project Assets (Docs, Images, Drive Links)
                                        </Label>
                                        <div className="p-4 border border-dashed border-zinc-700 rounded-lg bg-black/50">
                                            <Textarea
                                                className="bg-transparent border-none text-white focus-visible:ring-0 p-0 min-h-[80px]"
                                                value={formData.fileLinks}
                                                onChange={e => setFormData({ ...formData, fileLinks: e.target.value })}
                                                placeholder="Paste links to your Google Drive, Figma, or Dropbox here..."
                                            />
                                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800 text-xs text-zinc-500">
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.uploadedFiles.map((url, i) => (
                                                        <span key={i} className="text-green-500 flex items-center gap-1">
                                                            <CheckCircle2 className="w-3 h-3" /> Uploaded {i + 1}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        onChange={handleFileUpload}
                                                        disabled={uploading}
                                                    />
                                                    <Button type="button" variant="ghost" size="sm" className="h-6 text-xs hover:text-white" disabled={uploading}>
                                                        <Upload className="w-3 h-3 mr-1" />
                                                        {uploading ? "Uploading..." : "Upload File"}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" size="lg" className="w-full text-lg bg-white text-black hover:bg-zinc-200 font-bold" disabled={loading || uploading}>
                                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                                Submit Request
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </PageWrapper >
    )
}
