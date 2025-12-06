"use client"

import { motion } from "framer-motion"
import { Globe, Smartphone, Palette } from "lucide-react"

const services = [
    {
        icon: Globe,
        title: "Web Development",
        description: "Scalable web applications built with modern frameworks and best practices for performance and maintainability."
    },
    {
        icon: Smartphone,
        title: "Mobile Apps",
        description: "Native and cross-platform mobile solutions that deliver exceptional user experiences on iOS and Android."
    },
    {
        icon: Palette,
        title: "UI/UX Design",
        description: "User-centered design that combines aesthetics with functionality to create intuitive digital products."
    }
]

export function OurExpertise() {
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Expertise</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        End-to-end product development from concept to launch, powered by modern technology and product thinking.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-primary/5 border border-primary/10 rounded-xl p-8 hover:border-primary/30 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                <p className="text-muted-foreground">{service.description}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
