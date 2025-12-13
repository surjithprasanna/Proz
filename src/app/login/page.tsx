"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { PageWrapper } from "@/components/layout/PageWrapper"

export default function LoginPage() {
    const [accessCode, setAccessCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            // Construct email from access code
            const email = `${accessCode}@proz-client.com`

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password: accessCode, // Password is the same as access code
            })

            if (error) throw error

            router.push("/dashboard")
            router.refresh()
        } catch (err) {
            if (err instanceof Error) {
                setError("Invalid Access Code. Please try again.")
            } else {
                setError("An unknown error occurred")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <PageWrapper>
            <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[80vh]">
                <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Client Portal</CardTitle>
                        <CardDescription className="text-center">Enter your unique project access code.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md text-center">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="accessCode">Access Code</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="accessCode"
                                        type="text"
                                        placeholder="PROZ-XXXX-YYYY"
                                        value={accessCode}
                                        onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                                        className="pl-10 font-mono tracking-wider uppercase"
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Access Project
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </PageWrapper>
    )
}
