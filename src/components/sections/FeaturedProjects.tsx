"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Slide Data Interface
interface Slide {
    id: number
    type: 'image'
    image: string
    title: string
    category: string
    description: string
    tech: string[]
    color: string
}

const slides: Slide[] = [
    {
        id: 1,
        type: 'image',
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        title: "FinTech Analytics",
        category: "Enterprise Dashboard",
        description: "Real-time financial data visualization with predictive AI modeling.",
        tech: ["Next.js", "Python", "D3.js"],
        color: "from-emerald-500 to-cyan-500"
    },
    {
        id: 2,
        type: 'image',
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
        title: "MediCore AI",
        category: "Healthcare Platform",
        description: "HIPAA-compliant patient management system with automated triage.",
        tech: ["React", "TensorFlow", "Node.js"],
        color: "from-blue-500 to-purple-500"
    },
    {
        id: 3,
        type: 'image',
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
        title: "Nexus Logistics",
        category: "Global Supply Chain",
        description: "IoT-enabled fleet tracking and inventory optimization engine.",
        tech: ["Vue", "Go", "PostgreSQL"],
        color: "from-orange-500 to-red-500"
    },
    {
        id: 4,
        type: 'image',
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        title: "CryptoExchange",
        category: "Web3 Application",
        description: "Secure and fast cryptocurrency exchange platform with real-time trading.",
        tech: ["Solidity", "Web3.js", "Rust"],
        color: "from-indigo-500 to-violet-500"
    },
    {
        id: 5,
        type: 'image',
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
        title: "EcoSmart Home",
        category: "IoT Solution",
        description: "Smart home automation system for energy efficiency and monitoring.",
        tech: ["React Native", "MQTT", "Node-RED"],
        color: "from-green-500 to-teal-500"
    }
]

export function FeaturedProjects() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)

    // Auto-play logic
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isPlaying) {
            interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % slides.length)
            }, 5000) // Change slide every 5 seconds
        }
        return () => clearInterval(interval)
    }, [isPlaying])

    // Safety check for HMR/State mismatch
    if (!slides[activeIndex]) {
        setActiveIndex(0)
        return null
    }

    const currentSlide = slides[activeIndex]

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % slides.length)
        setIsPlaying(false) // Pause on manual interaction
    }

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
        setIsPlaying(false)
    }

    const togglePlay = () => setIsPlaying(!isPlaying)

    // Calculate visible slides (center, left, right)
    const getSlideStyles = (index: number) => {
        const diff = (index - activeIndex + slides.length) % slides.length
        const centeredDiff = diff > slides.length / 2 ? diff - slides.length : diff

        const isCenter = centeredDiff === 0

        // Calculate visual properties
        const xOffset = centeredDiff * 280 // Increased spacing
        const scale = isCenter ? 1 : 0.85
        const opacity = Math.abs(centeredDiff) > 2 ? 0 : 1 - Math.abs(centeredDiff) * 0.2
        const zIndex = 10 - Math.abs(centeredDiff)
        const rotateY = centeredDiff * -15 // Add rotation for 3D effect

        return {
            x: xOffset,
            scale,
            opacity,
            zIndex,
            rotateY,
            filter: isCenter ? 'none' : 'brightness(0.4) blur(2px)',
        }
    }

    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Work</span>
                        </h2>
                        <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
                            Explore our portfolio of cutting-edge applications, designed with precision and powered by advanced technology.
                        </p>
                    </div>
                    <Link href="/projects" className="group flex items-center gap-2 text-white border-b border-white/20 pb-1 hover:border-white transition-colors">
                        View All Projects <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Carousel Section */}
                <div className="relative w-full py-10 overflow-visible min-h-[600px] flex flex-col items-center justify-center">

                    {/* Carousel Container */}
                    <div className="relative w-full max-w-7xl h-[500px] flex items-center justify-center perspective-1000">
                        <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
                            {slides.map((slide, index) => {
                                const style = getSlideStyles(index)
                                if (style.opacity === 0) return null

                                return (
                                    <motion.div
                                        key={slide.id}
                                        initial={false}
                                        animate={{
                                            x: style.x,
                                            scale: style.scale,
                                            opacity: style.opacity,
                                            zIndex: style.zIndex,
                                            rotateY: style.rotateY,
                                            filter: style.filter
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.23, 1, 0.32, 1] // Cubic bezier for smooth motion
                                        }}
                                        className="absolute w-[320px] md:w-[380px] aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 bg-zinc-900"
                                    >
                                        {/* Card Content */}
                                        <div className="w-full h-full relative group">
                                            {/* Background Image */}
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                            {/* Content Overlay */}
                                            <div className="absolute inset-0 p-8 flex flex-col justify-end">

                                                {/* Top Badge */}
                                                <div className="absolute top-6 left-6">
                                                    <div className={cn(
                                                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r backdrop-blur-md border border-white/20",
                                                        slide.color
                                                    )}>
                                                        {slide.category}
                                                    </div>
                                                </div>

                                                {/* Title & Description */}
                                                <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                                    <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                                                        {slide.title}
                                                    </h3>
                                                    <p className="text-zinc-300 text-sm mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                                        {slide.description}
                                                    </p>

                                                    {/* Tech Stack */}
                                                    <div className="flex flex-wrap gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                        {slide.tech.map((t, i) => (
                                                            <span key={i} className="text-[10px] font-medium px-2 py-1 rounded bg-white/10 text-white border border-white/5">
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Action Button */}
                                                    <button className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                                                        View Case Study <ArrowUpRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Controls & Text */}
                    <div className="relative z-20 mt-16 flex flex-col items-center text-center space-y-8">

                        {/* Dynamic Text (Below Carousel) */}
                        <div className="h-20 flex flex-col items-center justify-center max-w-2xl mx-auto px-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-2"
                                >
                                    <h3 className="text-2xl font-bold text-white">
                                        {currentSlide.title}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 text-zinc-400">
                                        <span className={cn("w-2 h-2 rounded-full bg-gradient-to-r", currentSlide.color)} />
                                        <span className="text-sm font-medium uppercase tracking-wider">{currentSlide.category}</span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-8">
                            <button
                                onClick={prevSlide}
                                className="p-4 rounded-full bg-zinc-900/50 hover:bg-zinc-800 border border-white/10 transition-all text-white hover:scale-110 active:scale-95 backdrop-blur-sm"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="p-5 rounded-full bg-white text-black hover:bg-zinc-200 transition-all hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? (
                                    <Pause className="w-6 h-6 fill-current" />
                                ) : (
                                    <Play className="w-6 h-6 fill-current ml-1" />
                                )}
                            </button>

                            <button
                                onClick={nextSlide}
                                className="p-4 rounded-full bg-zinc-900/50 hover:bg-zinc-800 border border-white/10 transition-all text-white hover:scale-110 active:scale-95 backdrop-blur-sm"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-white"
                                initial={{ width: "0%" }}
                                animate={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
