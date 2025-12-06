"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
    {
        title: "FinTech Dashboard",
        description: "Real-time analytics platform for financial institutions with advanced data visualization and reporting capabilities.",
        tags: ["Enterprise", "Web App", "Cloud"],
        category: "Enterprise"
    },
    {
        title: "HealthConnect Mobile",
        description: "Telehealth application connecting patients with healthcare providers through secure video consultations and health tracking.",
        tags: ["Startup", "Mobile App", "iOS/Android"],
        category: "Startup"
    },
    {
        title: "EduPortal Platform",
        description: "Comprehensive learning management system for universities with course management, assessments, and student analytics.",
        tags: ["Academic", "Web App", "SaaS"],
        category: "Academic"
    }
]

export function FeaturedProjects() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Delivering production-ready solutions across industries and scales.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-primary/5 border border-primary/10 rounded-xl p-6 hover:border-primary/30 transition-colors group"
                        >
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <Button variant="ghost" size="sm" className="group-hover:text-primary transition-colors">
                                View Details <ArrowRight className="ml-2 h-3 w-3" />
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
