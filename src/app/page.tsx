"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FlowMap } from "@/components/features/FlowMap"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { OurExpertise } from "@/components/sections/OurExpertise"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"
import { TechStack } from "@/components/sections/TechStack"
import { Process } from "@/components/sections/Process"
import { Testimonials } from "@/components/sections/Testimonials"
import { WhyChooseProZ } from "@/components/sections/WhyChooseProZ"
import { Pricing } from "@/components/sections/Pricing"
import { ProjectRequestCTA } from "@/components/sections/ProjectRequestCTA"
import { FAQ } from "@/components/sections/FAQ"

export default function Home() {
    return (
        <PageWrapper>
            {/* Hero Section with Integrated FlowMap */}
            <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -z-10" />

                <div className="container mx-auto px-4 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

                        {/* Left Column: Hero Content */}
                        <div className="relative z-10 flex flex-col justify-center text-center lg:text-left">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
                            >
                                Build Your Vision <br /> with ProZ
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 mx-auto lg:mx-0"
                            >
                                Premium software development for Startups, Enterprises, and Visionaries.
                                We turn ideas into production-ready reality.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
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
                                            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
                                        }}
                                        variant="outline"
                                        size="lg"
                                        className="text-lg px-8 w-full sm:w-auto"
                                    >
                                        View Project Portfolio
                                    </Button>

                                    {/* Connector Line from Button to FlowMap */}
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: 1, duration: 0.6 }}
                                        className="hidden lg:block absolute top-1/2 -right-8 w-8 h-0.5 bg-gradient-to-r from-primary/80 to-primary/40 -translate-y-1/2 origin-left"
                                    >
                                        <motion.div
                                            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                                            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: FlowMap Network */}
                        <div className="hidden lg:flex relative h-[600px] items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                                className="w-full h-full"
                            >
                                <FlowMap />
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* New Sections */}
            <OurExpertise />
            <FeaturedProjects />
            <TechStack />
            <Process />
            <Testimonials />
            <WhyChooseProZ />
            <Pricing />
            <ProjectRequestCTA />
            <FAQ />

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
