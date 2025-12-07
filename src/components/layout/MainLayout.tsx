"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdmin = pathname?.startsWith('/admin')

    return (
        <>
            {!isAdmin && <Navbar />}
            <main className={`flex-1 ${!isAdmin ? 'pt-20' : ''}`}>
                {children}
            </main>
            {!isAdmin && <Footer />}
        </>
    )
}
