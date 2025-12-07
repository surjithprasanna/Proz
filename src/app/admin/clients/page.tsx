"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, UserPlus, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Client {
    id: string
    full_name: string | null
    email: string
    role: string
    created_at: string
}

export default function AdminClientsPage() {
    const [clients, setClients] = useState<Client[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: ""
    })
    const supabase = createClient()
    const { toast } = useToast()

    useEffect(() => {
        fetchClients()
    }, [])

    const fetchClients = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'client')
                .order('created_at', { ascending: false })

            if (error) throw error
            setClients(data || [])
        } catch (error) {
            console.error('Error fetching clients:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCreateClient = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsCreating(true)

        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error)

            toast({
                title: "Success",
                description: "Client account created successfully.",
            })

            setFormData({ email: "", password: "", fullName: "" })
            fetchClients() // Refresh list

        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred"
            toast({
                title: "Error",
                description: message,
                variant: "destructive"
            })
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Client Management</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Create Client Form */}
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserPlus className="w-5 h-5" />
                            Add New Client
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreateClient} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isCreating}>
                                {isCreating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Create Account
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Client List */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Existing Clients
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : clients.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                No clients found.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {clients.map(client => (
                                    <div key={client.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                                        <div>
                                            <div className="font-medium">{client.full_name}</div>
                                            <div className="text-sm text-muted-foreground">ID: {client.id}</div>
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase">
                                            {client.role}
                                        </div>
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
