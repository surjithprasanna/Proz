"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, Terminal, Loader2, ShieldCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function AdminLoginPage() {
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            })

            if (res.ok) {
                toast({
                    title: "Access Granted",
                    description: "Welcome back, Commander.",
                    className: "bg-green-900 border-green-500 text-green-100"
                })
                router.push('/admin')
            } else {
                toast({
                    title: "Access Denied",
                    description: "Invalid security credentials.",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "System Error",
                description: "Authentication protocol failed.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center p-4 relative overflow-hidden">
            {/* Matrix Background Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.1)_50%)] bg-[length:100%_4px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="border border-green-500/30 bg-black/90 p-8 rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.1)] backdrop-blur-sm">
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 animate-pulse" />
                            <ShieldCheck className="w-16 h-16 text-green-500 relative z-10" />
                        </div>
                    </div>

                    <div className="text-center mb-8 space-y-2">
                        <h1 className="text-2xl font-bold tracking-widest">RESTRICTED AREA</h1>
                        <p className="text-xs text-green-500/60">SECURE CONNECTION ESTABLISHED</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-green-500/60 uppercase">
                                <span>Authentication Required</span>
                                <span>v2.0.4</span>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-green-500/50 group-focus-within:text-green-400 transition-colors" />
                                <Input
                                    type="password"
                                    placeholder="ENTER ACCESS CODE"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-black/50 border-green-500/30 text-green-400 placeholder:text-green-900 pl-10 h-10 focus-visible:ring-green-500/50 focus-visible:border-green-500 transition-all text-center tracking-widest"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-green-900/20 hover:bg-green-500/20 text-green-400 border border-green-500/30 hover:border-green-400 transition-all duration-300 h-12 tracking-widest font-bold"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Terminal className="w-4 h-4" />
                                    <span>INITIATE LOGIN</span>
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-green-500/10 text-center">
                        <p className="text-[10px] text-green-900 uppercase tracking-widest">
                            Unauthorized access is a federal offense
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
