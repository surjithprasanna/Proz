"use client"

import { motion } from "framer-motion"
import { TechLogoMarquee } from "./TechLogoMarquee"



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


            </div>
        </section>
    )
}
