"use client"

import { motion } from "framer-motion"
import { Search, Palette, Code, Rocket, TrendingUp } from "lucide-react"

const steps = [
    {
        number: "01",
        title: "Discovery",
        description: "Understanding your vision, goals, and requirements through collaborative workshops.",
        icon: Search
    },
    {
        number: "02",
        title: "Design",
        description: "Creating user-centered designs with prototypes and iterative feedback loops.",
        icon: Palette
    },
    {
        number: "03",
        title: "Build",
        description: "Developing production-ready code with clean architecture and best practices.",
        icon: Code
    },
    {
        number: "04",
        title: "Launch",
        description: "Deploying to production with monitoring, testing, and performance optimization.",
        icon: Rocket
    },
    {
        number: "05",
        title: "Scale",
        description: "Continuous improvement, feature development, and scaling infrastructure.",
        icon: TrendingUp
    }
]

export function Process() {
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">How We Build</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A proven process that delivers results from concept to production.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-5 gap-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon
                        return (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 hover:border-primary/30 transition-colors h-full">
                                    <div className="text-4xl font-bold text-primary/20 mb-3">{step.number}</div>
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>

                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/20 -translate-y-1/2" />
                                )}
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
