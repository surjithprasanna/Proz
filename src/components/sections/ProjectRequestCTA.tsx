"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProjectRequestCTA() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Have a Project in Mind?</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Let's discuss how we can turn your vision into reality. Share your project details and we'll get back to you within 24 hours.
                        </p>
                        <Button asChild size="lg" className="text-lg px-8">
                            <Link href="/request">
                                Request Your Project <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
