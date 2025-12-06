"use client"

import { motion } from "framer-motion"
import { TechLogoMarquee } from "./TechLogoMarquee"

const techStack = {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    Backend: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB"],
    Cloud: ["AWS", "Azure", "Vercel", "Docker", "Kubernetes"],
    "Data & AI": ["TensorFlow", "OpenAI", "Langchain", "Vector DBs", "Analytics"]
}

export function TechStack() {
    return (
        <section className="py-20 bg-primary/5 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Tech Stack & Capabilities</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Modern technologies and frameworks to build scalable, performant solutions.
                    </p>
                </motion.div>

                {/* Animated Logo Marquee */}
                <TechLogoMarquee />

                {/* Original Category-based Tech Stack Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                    {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                        >
                            <h3 className="text-lg font-bold mb-4 text-primary">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {technologies.map(tech => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 text-sm rounded-full bg-background/50 border border-primary/10 hover:border-primary/30 transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
