"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, Layers, Code2 } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

const PROJECTS = [
    {
        id: 1,
        title: "FinTech Analytics",
        category: "Enterprise Dashboard",
        desc: "Real-time financial data visualization with predictive AI modeling.",
        tech: ["Next.js", "Python", "D3.js"],
        color: "from-emerald-500 to-cyan-500"
    },
    {
        id: 2,
        title: "MediCore AI",
        category: "Healthcare Platform",
        desc: "HIPAA-compliant patient management system with automated triage.",
        tech: ["React", "TensorFlow", "Node.js"],
        color: "from-blue-500 to-purple-500"
    },
    {
        id: 3,
        title: "Nexus Logistics",
        category: "Global Supply Chain",
        desc: "IoT-enabled fleet tracking and inventory optimization engine.",
        tech: ["Vue", "Go", "PostgreSQL"],
        color: "from-orange-500 to-red-500"
    }
]

export function FeaturedProjects() {
    return (
        <section className="py-20 bg-zinc-950 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Work</span>
                        </h2>
                        <p className="text-lg text-zinc-400 max-w-xl">
                            A selection of our most complex and impactful engineering challenges.
                        </p>
                    </div>
                    <Link href="/projects" className="group flex items-center gap-2 text-white border-b border-white/20 pb-1 hover:border-white transition-colors">
                        View All Projects <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
    const ref = useRef<HTMLDivElement>(null)

    // 3D Tilt Effect
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()

        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-[500px] w-full rounded-3xl bg-zinc-900/50 border border-white/10 p-6 flex flex-col justify-end overflow-hidden cursor-pointer"
        >
            {/* Holographic Background Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 blur-3xl`} />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] bg-[length:100%_4px]" />
            </div>

            {/* Image Placeholder */}
            <div
                className="absolute inset-0 bg-zinc-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-700"
                style={{ transform: "translateZ(-50px)" }}
            >
                <div className="text-center opacity-20 group-hover:opacity-40 transition-opacity">
                    <Layers className="w-24 h-24 mx-auto mb-4" />
                    <span className="text-xl font-mono uppercase tracking-widest">Image Placeholder</span>
                </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 transform translate-z-20 transition-transform duration-300 group-hover:translate-y-[-10px]">
                <div className="mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${project.color} text-white bg-opacity-20`}>
                        {project.category}
                    </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-zinc-400 text-sm mb-6 line-clamp-2 group-hover:line-clamp-none transition-all">
                    {project.desc}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <div key={t} className="flex items-center gap-1 text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                            <Code2 className="w-3 h-3" /> {t}
                        </div>
                    ))}
                </div>
            </div>

            {/* Hover Glow Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-3xl transition-colors pointer-events-none" />
        </motion.div>
    )
}
