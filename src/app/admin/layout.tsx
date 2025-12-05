"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, FileText, Database, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

const adminNavItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Requests", href: "/admin/requests", icon: FileText },
    { name: "CMS Studio", href: "/studio", icon: Database },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/login")
        router.refresh()
    }

    return (
        <div className="flex min-h-screen bg-background">
            {/* Admin Sidebar */}
            <aside className="w-64 border-r border-border bg-black text-white hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <Link href="/admin" className="text-2xl font-bold tracking-tighter">
                        ProZ Admin
                    </Link>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {adminNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-white text-black"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-white/10">
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20" onClick={handleLogout}>
                        <LogOut className="mr-2 h-5 w-5" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-muted/10">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
