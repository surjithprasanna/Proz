"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

// Slide Data Interface
interface Slide {
    id: number
    type: 'video' | 'image'
    src: string
    poster?: string
    title: string
    description: string
}

const slides: Slide[] = [
    {
        id: 1,
        type: 'video',
        src: "https://player.vimeo.com/video/1106141794?h=a7cdd1b89d&title=0&byline=0&portrait=0&muted=1&controls=0&loop=1&app_id=122963&unmute_button=0",
        title: "Make anything possible, all in Figma",
        description: "Design, prototype, and develop in a single collaborative space."
    },
    {
        id: 2,
        type: 'video',
        src: "https://player.vimeo.com/video/1106141156?h=394f5f9721&title=0&byline=0&portrait=0&keyboard=0&muted=1&controls=0&loop=1&app_id=122963&unmute_button=0",
        title: "Make my cursor reveal an image",
        description: "Create interactive hover effects that delight users."
    },
    {
        id: 3,
        type: 'video',
        src: "https://player.vimeo.com/video/1103822384?h=d87e2634b3&title=0&byline=0&portrait=0&keyboard=0&muted=1&controls=0&loop=1&app_id=122963&unmute_button=0",
        title: "Make an infinite canvas gallery",
        description: "Build immersive scrolling experiences with ease."
    },
    {
        id: 4,
        type: 'video',
        src: "https://player.vimeo.com/video/1103822749?h=ad2a6b8283&title=0&byline=0&portrait=0&keyboard=0&muted=1&controls=0&loop=1&app_id=122963&unmute_button=0",
        title: "Make this design move with a parallax effect",
        description: "Add depth and dimension to your web designs."
    },
    {
        id: 5,
        type: 'video',
        src: "https://player.vimeo.com/video/1103822703?h=c8f0240387&title=0&byline=0&portrait=0&keyboard=0&muted=1&controls=0&loop=1&app_id=122963&unmute_button=0",
        title: "Make these photos rotate in 3D",
        description: "Transform flat layouts into 3D spatial experiences."
    },
    {
        id: 6,
        type: 'video',
        src: "https://player.vimeo.com/video/1103822125?h=e4b4944014&title=0&byline=0&portrait=0&keyboard=0&muted=1&controls=0&loop=1&app_id=122963&unmute_button=0",
        title: "Make my site squish when scrolled",
        description: "Implement physics-based animations for organic feel."
    },
    {
        id: 7,
        type: 'video',
        src: "https://player.vimeo.com/video/1103822624?h=d2e608ba23&title=0&byline=0&portrait=0&keyboard=0&muted=1&controls=0&loop=1&app_id=122963&unmute_button=0",
        title: "Make a clock with a shader background",
        description: "Combine code and design for stunning visual effects."
    },
    {
        id: 8,
        type: 'video',
        src: "https://player.vimeo.com/video/1103862294?h=802500bb17&title=0&byline=0&portrait=0&keyboard=0&muted=1&controls=0&loop=1&app_id=122963&unmute_button=0",
        title: "Make text move on a path",
        description: "Break the grid with dynamic typography."
    }
]

export function FigmaCarousel() {
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
    // We want to show a few slides on each side
    const getSlideStyles = (index: number) => {
        const diff = (index - activeIndex + slides.length) % slides.length
        // Adjust diff to be centered around 0 (e.g., -2, -1, 0, 1, 2)
        const centeredDiff = diff > slides.length / 2 ? diff - slides.length : diff

        const isCenter = centeredDiff === 0
        const isLeft = centeredDiff < 0
        const isRight = centeredDiff > 0

        // Calculate visual properties
        const xOffset = centeredDiff * 260 // Distance between cards
        const scale = isCenter ? 1 : 0.85
        const opacity = Math.abs(centeredDiff) > 2 ? 0 : 1 - Math.abs(centeredDiff) * 0.2
        const zIndex = 10 - Math.abs(centeredDiff)

        return {
            x: xOffset,
            scale,
            opacity,
            zIndex,
            filter: isCenter ? 'none' : 'brightness(0.5) blur(1px)',
        }
    }

    return (
        <div className="relative w-full py-20 overflow-hidden bg-black/20 min-h-[800px] flex flex-col items-center justify-center">

            {/* Carousel Container */}
            <div className="relative w-full max-w-7xl h-[500px] flex items-center justify-center perspective-1000">
                <div className="relative w-full h-full flex items-center justify-center">
                    {slides.map((slide, index) => {
                        const style = getSlideStyles(index)
                        // Only render if visible (optimization)
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
                                    filter: style.filter
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.32, 0.72, 0, 1]
                                }}
                                className="absolute w-[300px] md:w-[360px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900"
                            >
                                <div className="w-full h-full relative">
                                    {slide.type === 'video' ? (
                                        <iframe
                                            src={slide.src}
                                            className="w-full h-full object-cover pointer-events-none"
                                            allow="autoplay; fullscreen; picture-in-picture"
                                            title={slide.title}
                                        />
                                    ) : (
                                        <img
                                            src={slide.src}
                                            alt={slide.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    {/* Overlay for non-active slides */}
                                    <div className="absolute inset-0 bg-black/20" />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Controls & Text */}
            <div className="relative z-20 mt-12 flex flex-col items-center text-center space-y-8">

                {/* Dynamic Text */}
                <div className="h-24 flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-white">
                                {slides[activeIndex].title}
                            </h3>
                            <p className="text-muted-foreground text-lg">
                                {slides[activeIndex].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={prevSlide}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={togglePlay}
                        className="p-4 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors"
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
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Slide Counter */}
                <div className="text-sm text-muted-foreground font-mono">
                    Slide {activeIndex + 1} of {slides.length}
                </div>
            </div>
        </div>
    )
}
