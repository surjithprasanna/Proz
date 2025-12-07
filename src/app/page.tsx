"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FlowMap } from "@/components/features/FlowMap"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"
import { TechStack } from "@/components/sections/TechStack"
import { Testimonials } from "@/components/sections/Testimonials"
import { ProjectRequestCTA } from "@/components/sections/ProjectRequestCTA"
import { TrustEngine } from "@/components/sections/TrustEngine"

export default function Home() {
    const [waveTrigger, setWaveTrigger] = React.useState(0)
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Auto-trigger wave animation every 5 seconds
    React.useEffect(() => {
        const interval = setInterval(() => {
            setWaveTrigger(prev => prev + 1)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <PageWrapper>
            {/* Hero Section with Integrated FlowMap - Sticky Scroll Wrapper */}
            <section ref={containerRef} id="hero" className="relative h-[400vh]">
                <div className="sticky top-0 h-screen overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />

                    {/* FlowMap Network */}
                    <div className="absolute inset-0 z-0">
                        <FlowMap waveTrigger={waveTrigger} scrollContainerRef={containerRef}>
                            <div className="container mx-auto px-4 py-20 relative z-10 pointer-events-none">
                                <div className="flex flex-col items-center justify-center text-center">

                                    {/* Hero Content */}
                                    <div className="max-w-4xl mx-auto">
                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
                                        >
                                            Software Development <br /> Built on Trust.
                                        </motion.h1>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 mx-auto"
                                        >
                                            Premium software development for Startups, Enterprises, and Visionaries.
                                            We turn ideas into production-ready reality.
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
                                        >
                                            <Button asChild size="lg" className="text-lg px-8">
                                                <Link href="/request">
                                                    Request Your Project <ArrowRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>

                                            <div className="relative">
                                                <Button
                                                    id="view-portfolio-btn"
                                                    onClick={() => {
                                                        setWaveTrigger(prev => prev + 1)
                                                        // Scroll slightly to start the flow if at top
                                                        if (window.scrollY < 100) {
                                                            window.scrollBy({ top: 500, behavior: 'smooth' })
                                                        }
                                                    }}
                                                    variant="outline"
                                                    size="lg"
                                                    className="text-lg px-8 w-full sm:w-auto"
                                                >
                                                    View Project Portfolio
                                                </Button>
                                            </div>
                                        </motion.div>
                                    </div>

                                </div>
                            </div>
                        </FlowMap>
                    </div>
                </div>
            </section>

            {/* New Sections */}
            <TrustEngine />
            <FeaturedProjects />
            <TechStack />
            <Testimonials />
            <ProjectRequestCTA />


            {/* CTA Section */}
            <section id="ready-to-start" className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="bg-primary/5 border border-primary/10 rounded-3xl p-12 md:p-20 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start?</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                                Whether you need a rapid prototype, a scalable product, or a complex enterprise system, we have the skills to deliver.
                            </p>
                            <Button asChild size="lg" className="text-lg px-8">
                                <Link href="/request">Get a Quote</Link>
                            </Button>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    </div>
                </div>
            </section>
        </PageWrapper>
    )
}
