"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Code2, Database, Cloud, Cpu,
    Layers, Globe, Shield, Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

const TECH_CATEGORIES = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & Cloud' },
    { id: 'ai', label: 'AI & Intelligence' }
]

const TECHNOLOGIES = [
    { id: 1, name: "Next.js 14", category: "frontend", icon: Globe, desc: "App Router & Server Actions" },
    { id: 2, name: "React", category: "frontend", icon: Code2, desc: "Component Architecture" },
    { id: 3, name: "TypeScript", category: "frontend", icon: Shield, desc: "Type-Safe Development" },
    { id: 4, name: "Tailwind CSS", category: "frontend", icon: Layers, desc: "Modern Styling System" },
    { id: 5, name: "Supabase", category: "backend", icon: Database, desc: "Postgres & Auth" },
    { id: 6, name: "Node.js", category: "backend", icon: Cloud, desc: "Scalable Runtime" },
    { id: 7, name: "OpenAI API", category: "ai", icon: Zap, desc: "LLM Integration" },
    { id: 8, name: "TensorFlow", category: "ai", icon: Cpu, desc: "Machine Learning Models" },
]

export function TechStack() {
    const [activeCategory, setActiveCategory] = useState('all')

    const filteredTech = activeCategory === 'all'
        ? TECHNOLOGIES
        : TECHNOLOGIES.filter(t => t.category === activeCategory)

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        Our Technical <span className="text-primary">Arsenal</span>
                    </motion.h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                        We use cutting-edge tools to build scalable, future-proof solutions.
                    </p>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {TECH_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                    activeCategory === cat.id
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tech Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredTech.map((tech) => (
                            <motion.div
                                layout
                                key={tech.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-card/50 border border-border/50 rounded-2xl p-6 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                            >
                                <div className="mb-4 p-3 bg-background/50 rounded-xl w-fit group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                    <tech.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold mb-1">{tech.name}</h3>
                                <p className="text-sm text-muted-foreground">{tech.desc}</p>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
