"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import {
    Rocket, Building2, GraduationCap, Briefcase,
    Globe, Smartphone, Database, Layout, Shield, Cloud,
    Code, ShoppingCart, BarChart, Server
} from "lucide-react"
import { cn } from "@/lib/utils"

// Data Structure for the Tree
const treeData = {
    users: [
        {
            id: "student", label: "Academic", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-500/10",
            fields: [
                { id: "s-web", label: "Web App", icon: Globe, sub: ["Portfolio", "E-commerce"] },
                { id: "s-mob", label: "Mobile App", icon: Smartphone, sub: ["Fitness", "Social"] }
            ]
        },
        {
            id: "startup", label: "Startup", icon: Rocket, color: "text-purple-500", bg: "bg-purple-500/10",
            fields: [
                { id: "st-saas", label: "SaaS MVP", icon: Database, sub: ["Dashboard", "Auth"] },
                { id: "st-ui", label: "UI/UX", icon: Layout, sub: ["Landing", "Design System"] }
            ]
        },
        {
            id: "business", label: "Enterprise", icon: Briefcase, color: "text-orange-500", bg: "bg-orange-500/10",
            fields: [
                { id: "b-cloud", label: "Cloud", icon: Cloud, sub: ["AWS", "Azure"] },
                { id: "b-sec", label: "Security", icon: Shield, sub: ["Audit", "Compliance"] }
            ]
        }
    ]
}

export function AnimatedProjectTree() {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Map vertical scroll to horizontal movement
    // The tree is wide, so we shift it left as we scroll down
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"])

    return (
        <div ref={containerRef} className="relative h-[300vh]">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="container mx-auto px-4 relative flex items-center h-full">

                    {/* Fixed Button Section */}
                    <div className="flex-shrink-0 z-30 relative mr-12">
                        <Link href="/projects">
                            <motion.div
                                className="relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-12 rounded-md px-8 text-lg overflow-hidden group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    View Project Portfolio
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -skew-x-12"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "200%" }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                    style={{ width: "50%" }}
                                />
                            </motion.div>
                        </Link>

                        {/* Start Connection Point */}
                        <div className="absolute top-1/2 left-full w-12 h-[2px] bg-primary/20 -z-10" />
                    </div>

                    {/* Horizontally Scrolling Tree Section */}
                    <motion.div
                        style={{ x }}
                        className="flex items-center gap-24 pl-4"
                    >
                        {/* Level 2: Users */}
                        <div className="flex flex-col gap-32 relative">
                            {treeData.users.map((user, i) => (
                                <div key={user.id} className="relative group flex items-center">
                                    {/* Connection Line from Root (Visualized) */}
                                    <div className="absolute right-full top-1/2 w-12 h-[2px] bg-primary/20 -translate-y-1/2" />

                                    <Node icon={user.icon} label={user.label} color={user.color} bg={user.bg} delay={0} />

                                    {/* Connection to Next Level */}
                                    <div className="absolute left-full top-1/2 w-24 h-[2px] bg-primary/20" />
                                </div>
                            ))}
                        </div>

                        {/* Level 3: Fields */}
                        <div className="flex flex-col gap-12 relative">
                            {treeData.users.flatMap((user) =>
                                user.fields.map((field) => (
                                    <div key={field.id} className="relative group flex items-center">
                                        <div className="absolute right-full top-1/2 w-24 h-[2px] bg-primary/20 -translate-y-1/2" />
                                        <Node icon={field.icon} label={field.label} color="text-foreground" bg="bg-secondary" delay={0.2} />
                                        <div className="absolute left-full top-1/2 w-24 h-[2px] bg-primary/20" />
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Level 4: Sub-Fields */}
                        <div className="flex flex-col gap-6 relative">
                            {treeData.users.flatMap((user) =>
                                user.fields.flatMap((field) =>
                                    field.sub.map((sub, si) => (
                                        <div key={`${field.id}-${si}`} className="relative group flex items-center">
                                            <div className="absolute right-full top-1/2 w-24 h-[2px] bg-primary/20 -translate-y-1/2" />
                                            <div className="flex items-center gap-2 p-2 rounded-lg border border-border bg-background/80 backdrop-blur-sm min-w-[140px]">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                <span className="text-sm font-medium">{sub}</span>
                                            </div>
                                            <div className="absolute left-full top-1/2 w-24 h-[2px] bg-primary/20" />
                                        </div>
                                    ))
                                )
                            )}
                        </div>

                        {/* Level 5: Convergence (Building) */}
                        <div className="flex items-center justify-center relative pl-12">
                            <div className="absolute right-full top-1/2 -translate-y-1/2 w-24 h-[2px] bg-primary/20" />

                            <motion.div
                                className="relative w-48 h-48 flex flex-col items-center justify-center rounded-2xl border-2 border-primary/20 bg-background/50 backdrop-blur-md overflow-hidden"
                                initial={{ opacity: 0.5, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Building2 className="w-16 h-16 text-primary mb-4" />
                                <span className="text-sm font-bold text-primary uppercase tracking-wider">ProZ HQ</span>
                                <p className="text-xs text-muted-foreground mt-2">Production Ready</p>

                                {/* Fill Animation */}
                                <motion.div
                                    className="absolute inset-0 bg-primary/10 z-0"
                                    initial={{ height: "0%" }}
                                    whileInView={{ height: "100%" }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    style={{ bottom: 0, top: "auto" }}
                                />
                            </motion.div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    )
}

function Node({ icon: Icon, label, color, bg, delay }: { icon: any, label: string, color: string, bg: string, delay: number }) {
    return (
        <motion.div
            className={cn(
                "flex items-center gap-3 p-4 rounded-xl border border-border backdrop-blur-sm bg-background/80 w-56 relative overflow-hidden",
            )}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <div className={cn("p-2 rounded-full shrink-0", bg, color)}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-base font-medium whitespace-nowrap">{label}</span>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 2, delay: delay, repeat: Infinity, repeatDelay: 3 }}
            />
        </motion.div>
    )
}
