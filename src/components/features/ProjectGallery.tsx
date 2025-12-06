"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "./ProjectCard"

// Mock Data (Replace with Sanity fetch later)
const projects = [
    {
        id: 1,
        title: "E-Commerce Dashboard",
        description: "A comprehensive admin dashboard for managing products, orders, and analytics.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        field: "Web Dev",
        audience: "Business",
        priceRange: "$5k - $10k",
        timeline: "2 months",
        techStack: ["Next.js", "Supabase", "Tailwind", "Stripe"],
        category: "web",
    },
    {
        id: 2,
        title: "Fitness Tracking App",
        description: "Mobile application for tracking workouts, nutrition, and progress.",
        image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800",
        field: "Mobile App",
        audience: "Startup",
        priceRange: "$10k - $20k",
        timeline: "3 months",
        techStack: ["React Native", "Firebase", "Redux"],
        category: "mobile",
    },
    {
        id: 3,
        title: "Portfolio Website",
        description: "Minimalist portfolio site for a photographer with gallery and contact form.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
        field: "Web Dev",
        audience: "Academic",
        priceRange: "< $1k",
        timeline: "2 weeks",
        techStack: ["Next.js", "Framer Motion"],
        category: "web",
    },
    {
        id: 4,
        title: "SaaS Landing Page",
        description: "High-converting landing page for a software product with pricing and testimonials.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
        field: "UI/UX",
        audience: "Startup",
        priceRange: "$1k - $3k",
        timeline: "1 month",
        techStack: ["Figma", "React", "Tailwind"],
        category: "design",
    },
    {
        id: 5,
        title: "Real Estate Platform",
        description: "Property listing platform with map integration and user profiles.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
        field: "Web Dev",
        audience: "Enterprise",
        priceRange: "$20k+",
        timeline: "4-6 months",
        techStack: ["Next.js", "PostgreSQL", "AWS"],
        category: "web",
    },
    {
        id: 6,
        title: "Food Delivery App",
        description: "On-demand food delivery app with real-time tracking and payments.",
        image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&q=80&w=800",
        field: "Mobile App",
        audience: "Business",
        priceRange: "$15k - $25k",
        timeline: "4 months",
        techStack: ["Flutter", "Node.js", "MongoDB"],
        category: "mobile",
    },
]

export function ProjectGallery() {
    const [activeTab, setActiveTab] = React.useState("all")

    const filteredProjects = activeTab === "all"
        ? projects
        : projects.filter(p => p.category === activeTab)

    return (
        <div className="space-y-8">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8">
                    <TabsList className="grid w-full max-w-md grid-cols-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="web">Web</TabsTrigger>
                        <TabsTrigger value="mobile">Mobile</TabsTrigger>
                        <TabsTrigger value="design">Design</TabsTrigger>
                    </TabsList>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ProjectCard {...project} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </Tabs>
        </div>
    )
}
