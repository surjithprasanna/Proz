"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const pricingModels = [
    {
        title: "Product Discovery",
        description: "Perfect for validating ideas and defining your product roadmap.",
        features: [
            "User research & interviews",
            "Technical feasibility analysis",
            "Product requirements document",
            "UI/UX wireframes & prototypes",
            "Technology stack recommendations"
        ]
    },
    {
        title: "MVP Build",
        description: "Launch your product quickly with core features that deliver value.",
        features: [
            "Complete MVP development",
            "User-centered design",
            "Cloud deployment & hosting",
            "Quality assurance & testing",
            "2 weeks post-launch support"
        ],
        highlight: true
    },
    {
        title: "Dedicated Team",
        description: "Scale with a committed team integrated into your workflow.",
        features: [
            "Full-stack developers",
            "UI/UX designers",
            "Project management",
            "Flexible engagement terms",
            "Ongoing maintenance & support"
        ]
    }
]

export function Pricing() {
    return (
        <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Engagement Models</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Flexible partnership options tailored to your project needs and timeline.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {pricingModels.map((model, index) => (
                        <motion.div
                            key={model.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`bg-background border rounded-xl p-8 ${model.highlight
                                    ? 'border-primary shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)]'
                                    : 'border-primary/10'
                                }`}
                        >
                            {model.highlight && (
                                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{model.title}</h3>
                            <p className="text-muted-foreground mb-6">{model.description}</p>

                            <ul className="space-y-3">
                                {model.features.map(feature => (
                                    <li key={feature} className="flex items-start gap-2">
                                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
