"use client"

import { motion } from "framer-motion"
import { Target, Users, MessageSquare, Shield } from "lucide-react"

const differentiators = [
    {
        icon: Target,
        title: "Production-Ready Focus",
        description: "We don't just build prototypes. Every line of code is production-grade, scalable, and maintainable from day one."
    },
    {
        icon: Users,
        title: "Startup to Enterprise Experience",
        description: "Whether you're a funded startup or Fortune 500, we understand your unique challenges and deliver accordingly."
    },
    {
        icon: MessageSquare,
        title: "Transparent Communication",
        description: "Regular updates, clear timelines, and honest feedback. You're always in the loop on progress and decisions."
    },
    {
        icon: Shield,
        title: "Strong Product Thinking",
        description: "We go beyond coding. Our team thinks about user experience, business goals, and long-term success."
    }
]

export function WhyChooseProZ() {
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose ProZ</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Partner with a team that combines technical excellence with strategic thinking.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {differentiators.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-primary/5 border border-primary/10 rounded-xl p-8 hover:border-primary/30 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
