"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Code2, Database, Globe, Layers, Layout, LineChart, Lock, Smartphone, Terminal, Zap, Shield, Cpu, BarChart3, TestTube2, Workflow, Server } from "lucide-react"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const serviceGroups = [
    {
        title: "Core Development",
        items: [
            { title: "SaaS MVP Development", desc: "Rapid, scalable architecture for high-growth startups.", icon: Code2 },
            { title: "Django Development", desc: "Admin panels, REST APIs, dashboards, multi-tenant platforms.", icon: Terminal },
            { title: "Shopify Development", desc: "Custom themes, apps, and automated commerce flows.", icon: Globe },
            { title: "Mobile Apps", desc: "Native-performance Flutter & React Native applications.", icon: Smartphone },
            { title: "Web App Development", desc: "High-performance, responsive web applications.", icon: Layout },
            { title: "UI/UX Design", desc: "World-class aesthetics with conversion-focused UX.", icon: Layers },
        ]
    },
    {
        title: "Business & Marketing",
        items: [
            { title: "SEO Optimization", desc: "Technical SEO and organic growth strategies.", icon: LineChart },
            { title: "Landing Pages", desc: "High-conversion pages designed for performance.", icon: Layout },
            { title: "Marketing Funnels", desc: "Automated customer journeys and lead capture.", icon: Workflow },
            { title: "Branding & Creative", desc: "Identity design that builds trust and authority.", icon: Layers },
        ]
    },
    {
        title: "Product Essentials",
        items: [
            { title: "Auth / Login Systems", desc: "Secure, seamless authentication flows.", icon: Lock },
            { title: "Billing / Payments", desc: "Stripe/Razorpay integration and subscription management.", icon: Zap },
            { title: "Admin Panels", desc: "Powerful internal tools for business operations.", icon: Terminal },
            { title: "User Dashboards", desc: "Interactive data visualization for end-users.", icon: Layout },
            { title: "Platform Architecture", desc: "Scalable foundations for long-term growth.", icon: Server },
            { title: "Conversion Optimization", desc: "Data-driven improvements for user action.", icon: BarChart3 },
        ]
    },
    {
        title: "Cloud & Enterprise",
        items: [
            { title: "Cloud Integrations", desc: "AWS, GCP, Azure architecture and deployment.", icon: Database },
            { title: "Microservices", desc: "Decoupled services for agility and scale.", icon: Server },
            { title: "Multi-tenant Architecture", desc: "Secure data isolation for SaaS platforms.", icon: Layers },
            { title: "IAM", desc: "Identity and Access Management for enterprise security.", icon: Lock },
            { title: "Compliance & Governance", desc: "Systems built for rigorous industry standards.", icon: Shield },
            { title: "DevOps / CI-CD", desc: "Automated pipelines for reliable delivery.", icon: Workflow },
        ]
    },
    {
        title: "Automation & Integrations",
        items: [
            { title: "Workflow Automation", desc: "Streamline repetitive tasks and processes.", icon: Workflow },
            { title: "CRM Automation", desc: "Sync data and trigger actions across tools.", icon: Database },
            { title: "AI Chatbots", desc: "Intelligent support and engagement agents.", icon: Zap },
            { title: "Third-party Integrations", desc: "Seamless connections with Stripe, Google, Twilio.", icon: Globe },
        ]
    },
    {
        title: "Security Services",
        items: [
            { title: "Security Audit", desc: "Comprehensive review of system vulnerabilities.", icon: Shield },
            { title: "Vulnerability Assessment", desc: "Proactive identification of security risks.", icon: Lock },
            { title: "Penetration Testing", desc: "Simulated attacks to harden defenses.", icon: Shield },
            { title: "Data Protection", desc: "Encryption and privacy-first architecture.", icon: Lock },
        ]
    },
    {
        title: "QA & Testing",
        items: [
            { title: "Manual Testing", desc: "Rigorous human verification of user flows.", icon: TestTube2 },
            { title: "Automation Testing", desc: "Scripted tests for regression and stability.", icon: Code2 },
            { title: "API Testing", desc: "Validation of backend endpoints and logic.", icon: Terminal },
            { title: "Performance Testing", desc: "Load testing for high-traffic scenarios.", icon: BarChart3 },
        ]
    },
    {
        title: "Data & Analytics",
        items: [
            { title: "Data Engineering", desc: "Robust pipelines for data ingestion and processing.", icon: Database },
            { title: "ETL Pipelines", desc: "Extract, Transform, Load workflows for insights.", icon: Workflow },
            { title: "Dashboard & Reporting", desc: "Real-time visualization of key metrics.", icon: BarChart3 },
            { title: "Analytics Setup", desc: "GA4, Mixpanel, and custom tracking implementation.", icon: LineChart },
        ]
    },
    {
        title: "AI & Research",
        items: [
            { title: "AI Lab", desc: "Experimental development and prototyping.", icon: Zap },
            { title: "ML Models", desc: "Custom machine learning model training.", icon: Cpu },
            { title: "MLOps", desc: "Productionizing and monitoring ML pipelines.", icon: Workflow },
            { title: "Research Tools", desc: "Specialized software for academic data collection.", icon: TestTube2 },
            { title: "Publications", desc: "Technical writing and research documentation.", icon: FileText },
            { title: "Data Visualization", desc: "Complex data rendered into clear insights.", icon: BarChart3 },
        ]
    },
    {
        title: "Internal Tools & Engineering",
        items: [
            { title: "Internal Tools", desc: "Custom software to empower your team.", icon: Layout },
            { title: "Automations", desc: "Removing manual bottlenecks from operations.", icon: Workflow },
            { title: "Monitoring", desc: "Real-time system health and performance tracking.", icon: BarChart3 },
            { title: "Logging Systems", desc: "Centralized logs for debugging and audit.", icon: Terminal },
        ]
    }
]

import { FileText } from "lucide-react"

export default function ServicesPage() {
    return (
        <PageWrapper>
            <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">

                {/* 1. Hero Section */}
                <section className="container mx-auto px-6 py-24 md:py-32 border-b border-zinc-900">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                            Software Development. <br />
                            <span className="text-zinc-500">Built on Trust.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
                            Premium engineering for ambitious teams. We build production-ready software that scales.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 text-lg h-12">
                                <Link href="/request">Request Your Project</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="border-zinc-800 text-white hover:bg-zinc-900 rounded-full px-8 text-lg h-12">
                                <Link href="/projects">View Portfolio</Link>
                            </Button>
                        </div>
                    </motion.div>
                </section>

                {/* 2. Categories */}
                <section className="container mx-auto px-6 py-20 border-b border-zinc-900">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {["Startup", "Enterprise", "Academic / Research"].map((cat, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <span className="text-2xl font-medium text-zinc-300">{cat}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Service Groups */}
                <section className="container mx-auto px-6 py-20">
                    <div className="space-y-32">
                        {serviceGroups.map((group, groupIdx) => (
                            <motion.div
                                key={group.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <h2 className="text-3xl font-bold mb-12 text-white border-l-4 border-green-500 pl-6">
                                    {group.title}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {group.items.map((item, idx) => (
                                        <Card key={idx} className="group bg-zinc-900/30 border-zinc-800/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300">
                                            <CardHeader className="pb-3">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="p-2 bg-black rounded-lg border border-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                                                        <item.icon className="w-5 h-5" />
                                                    </div>
                                                </div>
                                                <CardTitle className="text-lg font-medium text-zinc-200 group-hover:text-white">
                                                    {item.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-zinc-500 group-hover:text-zinc-400 leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 13. Process Section */}
                <section className="container mx-auto px-6 py-32 border-t border-zinc-900">
                    <h2 className="text-3xl font-bold mb-16 text-center">Our Process</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {["Requirement Discovery", "Product Design", "Development", "Testing", "Deployment & Support"].map((step, idx) => (
                            <div key={idx} className="relative flex flex-col items-center text-center group">
                                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-mono mb-6 group-hover:border-green-500 group-hover:text-green-500 transition-colors z-10">
                                    {idx + 1}
                                </div>
                                {idx !== 4 && (
                                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-[1px] bg-zinc-800 -z-0" />
                                )}
                                <h3 className="text-lg font-medium text-zinc-200">{step}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 14. Tech Stack */}
                <section className="container mx-auto px-6 py-20 border-t border-zinc-900 text-center">
                    <p className="text-zinc-500 mb-8 uppercase tracking-widest text-sm">Powered By Modern Tech</p>
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-zinc-400 font-mono text-lg">
                        <span>Django</span>
                        <span>Python</span>
                        <span>React</span>
                        <span>Next.js</span>
                        <span>Shopify</span>
                        <span>Flutter</span>
                        <span>Tailwind</span>
                        <span>PostgreSQL</span>
                        <span>Redis</span>
                        <span>AWS</span>
                        <span>GCP</span>
                        <span>Azure</span>
                    </div>
                </section>

                {/* 15. Final CTA */}
                <section className="container mx-auto px-6 py-32 border-t border-zinc-900">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-6xl font-bold mb-8">Start Your Project Today.</h2>
                        <p className="text-xl text-zinc-400 mb-12">
                            From MVP to Enterprise Scale, we have the engineering to back your vision.
                        </p>
                        <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full px-12 py-8 text-xl h-auto">
                            <Link href="/request">Get Started</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </PageWrapper>
    )
}
