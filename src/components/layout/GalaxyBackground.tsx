"use client"

import React, { useEffect, useRef } from 'react'

export function GalaxyBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = window.innerWidth
        let height = window.innerHeight

        const setSize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }

        setSize()
        window.addEventListener('resize', setSize)

        // Star properties
        const stars: Star[] = []
        const numStars = 800
        const centerX = width / 2
        const centerY = height / 2

        class Star {
            x: number
            y: number
            z: number
            size: number
            color: string

            constructor() {
                this.x = (Math.random() - 0.5) * width * 2
                this.y = (Math.random() - 0.5) * height * 2
                this.z = Math.random() * width
                this.size = Math.random() * 1.5
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`
            }

            update(speed: number) {
                this.z -= speed
                if (this.z <= 0) {
                    this.z = width
                    this.x = (Math.random() - 0.5) * width * 2
                    this.y = (Math.random() - 0.5) * height * 2
                }
            }

            draw() {
                if (!ctx) return

                // Perspective projection
                const sx = (this.x / this.z) * width + width / 2
                const sy = (this.y / this.z) * width + height / 2

                // Size based on depth
                const r = (1 - this.z / width) * 2 * this.size

                if (sx > 0 && sx < width && sy > 0 && sy < height) {
                    ctx.beginPath()
                    ctx.fillStyle = this.color
                    ctx.arc(sx, sy, r, 0, Math.PI * 2)
                    ctx.fill()
                }

                // Draw connections (constellations)
                // Only connect if close enough and random chance
                /* 
                // Commented out to save performance, can enable for "connected" look
                // if (Math.random() > 0.99) { ... } 
                */
            }
        }

        // Initialize stars
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star())
        }

        let animationFrameId: number
        let speed = 2

        const animate = () => {
            if (!ctx) return

            // Clear with trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)' // Adjust opacity for trail length
            ctx.fillRect(0, 0, width, height)

            stars.forEach(star => {
                star.update(speed)
                star.draw()
            })

            // Draw a subtle galaxy core glow
            const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.6)
            gradient.addColorStop(0, 'rgba(76, 29, 149, 0.05)') // Purple core
            gradient.addColorStop(0.5, 'rgba(30, 58, 138, 0.02)') // Blue mid
            gradient.addColorStop(1, 'transparent')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', setSize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none -z-50"
            style={{ background: 'black' }}
        />
    )
}
