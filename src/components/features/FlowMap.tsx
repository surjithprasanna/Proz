"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
    Rocket, Building2, GraduationCap, Globe, Smartphone,
    Layout, Cloud, Palette, Package, Zap, Activity
} from "lucide-react"

const FLOW_WIDTH = 3000
const HQ_X = 2600
const HQ_Y = 300

const networkData = {
    roots: [
        { id: "startup", label: "Startup", icon: Rocket, x: 200, y: 100 },
        { id: "enterprise", label: "Enterprise", icon: Building2, x: 200, y: 280 },
        { id: "academic", label: "Academic", icon: GraduationCap, x: 200, y: 460 }
    ],
    branches: [
        { id: "web", label: "Web App", parent: "startup", icon: Globe, x: 750, y: 40 },
        { id: "mobile", label: "Mobile", parent: "startup", icon: Smartphone, x: 750, y: 120 },
        { id: "saas", label: "SaaS", parent: "startup", icon: Zap, x: 750, y: 200 },
        { id: "dashboard", label: "Dashboard", parent: "enterprise", icon: Layout, x: 750, y: 260 },
        { id: "cloud", label: "Cloud", parent: "enterprise", icon: Cloud, x: 750, y: 340 },
        { id: "design", label: "Design", parent: "academic", icon: Palette, x: 750, y: 420 },
        { id: "portfolio", label: "Portfolio", parent: "academic", icon: Package, x: 750, y: 500 }
    ],
    features: [
        { id: "social", label: "Social", parent: "web", x: 1350, y: 20 },
        { id: "ecom", label: "E-commerce", parent: "web", x: 1350, y: 80 },
        { id: "fitness", label: "Fitness", parent: "mobile", x: 1350, y: 110 },
        { id: "delivery", label: "Delivery", parent: "mobile", x: 1350, y: 160 },
        { id: "auth", label: "Auth", parent: "saas", x: 1350, y: 190 },
        { id: "payments", label: "Payments", parent: "saas", x: 1350, y: 240 },
        { id: "analytics", label: "Analytics", parent: "dashboard", x: 1350, y: 270 },
        { id: "reporting", label: "Reporting", parent: "dashboard", x: 1350, y: 320 },
        { id: "aws", label: "AWS", parent: "cloud", x: 1350, y: 350 },
        { id: "azure", label: "Azure", parent: "cloud", x: 1350, y: 400 },
        { id: "tokens", label: "Tokens", parent: "design", x: 1350, y: 430 },
        { id: "components", label: "Components", parent: "design", x: 1350, y: 480 },
        { id: "showcase", label: "Showcase", parent: "portfolio", x: 1350, y: 510 },
        { id: "gallery", label: "Gallery", parent: "portfolio", x: 1350, y: 560 }
    ]
}

export function FlowMap() {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const hqRef = React.useRef<HTMLDivElement>(null)
    const touchStartRef = React.useRef<number | null>(null)

    const [isHorizontalScrollActive, setIsHorizontalScrollActive] = React.useState(false)
    const [flowOffsetX, setFlowOffsetX] = React.useState(0)
    const [isHQCentered, setIsHQCentered] = React.useState(false)

    const handleWheel = React.useCallback((e: WheelEvent) => {
        if (!isHorizontalScrollActive || isHQCentered) return
        e.preventDefault()
        setFlowOffsetX(prev => {
            const newOffset = prev - (e.deltaY || e.deltaX)
            const maxOffset = -(FLOW_WIDTH - (containerRef.current?.clientWidth || window.innerWidth))
            return Math.max(maxOffset, Math.min(0, newOffset))
        })
    }, [isHorizontalScrollActive, isHQCentered])

    const handleTouchStart = React.useCallback((e: TouchEvent) => {
        if (!isHorizontalScrollActive || isHQCentered) return
        touchStartRef.current = e.touches[0].clientX
    }, [isHorizontalScrollActive, isHQCentered])

    const handleTouchMove = React.useCallback((e: TouchEvent) => {
        if (!isHorizontalScrollActive || isHQCentered || touchStartRef.current === null) return
        const deltaX = touchStartRef.current - e.touches[0].clientX
        if (Math.abs(deltaX) > 5) e.preventDefault()
        setFlowOffsetX(prev => {
            const newOffset = prev - deltaX
            const maxOffset = -(FLOW_WIDTH - (containerRef.current?.clientWidth || window.innerWidth))
            return Math.max(maxOffset, Math.min(0, newOffset))
        })
        touchStartRef.current = e.touches[0].clientX
    }, [isHorizontalScrollActive, isHQCentered])

    React.useEffect(() => {
        if (!hqRef.current || !isHorizontalScrollActive) return
        const hqRect = hqRef.current.getBoundingClientRect()
        const distance = Math.abs((hqRect.left + hqRect.width / 2) - (window.innerWidth / 2))
        if (distance < 150 && !isHQCentered) {
            setIsHQCentered(true)
            setIsHorizontalScrollActive(false)
        }
    }, [flowOffsetX, isHorizontalScrollActive, isHQCentered])

    React.useEffect(() => {
        const container = containerRef.current
        if (!container) return
        container.addEventListener('wheel', handleWheel, { passive: false })
        container.addEventListener('touchstart', handleTouchStart, { passive: false })
        container.addEventListener('touchmove', handleTouchMove, { passive: false })
        return () => {
            container.removeEventListener('wheel', handleWheel)
            container.removeEventListener('touchstart', handleTouchStart)
            container.removeEventListener('touchmove', handleTouchMove)
        }
    }, [handleWheel, handleTouchStart, handleTouchMove])

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full bg-transparent overflow-hidden"
            onMouseEnter={() => !isHQCentered && setIsHorizontalScrollActive(true)}
            onMouseLeave={() => setIsHorizontalScrollActive(false)}
        >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            <motion.div style={{ x: flowOffsetX }} className="absolute inset-0">
                <svg className="absolute inset-0 pointer-events-none" style={{ width: FLOW_WIDTH, height: '100%' }}>
                    <defs>
                        <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        </linearGradient>
                        <filter id="glow-filter">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {networkData.branches.map((branch, i) => {
                        const root = networkData.roots.find(r => r.id === branch.parent)!
                        const path = `M ${root.x + 240} ${root.y + 30} C ${root.x + 450} ${root.y + 30}, ${branch.x - 150} ${branch.y + 25}, ${branch.x - 10} ${branch.y + 25}`
                        return (
                            <g key={`root-${branch.id}`}>
                                <path d={path} stroke="hsl(var(--primary))" strokeOpacity="0.15" strokeWidth="2" fill="none" />
                                <motion.path
                                    d={path}
                                    stroke="url(#flow-gradient)"
                                    strokeWidth="2.5"
                                    fill="none"
                                    filter="url(#glow-filter)"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, delay: 0.1 * i }}
                                />
                                <motion.circle r="5" fill="hsl(var(--primary))" filter="url(#glow-filter)">
                                    <animateMotion dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`} path={path} />
                                </motion.circle>
                            </g>
                        )
                    })}

                    {networkData.features.map((feature, i) => {
                        const branch = networkData.branches.find(b => b.id === feature.parent)!
                        const path = `M ${branch.x + 180} ${branch.y + 25} C ${branch.x + 380} ${branch.y + 25}, ${feature.x - 150} ${feature.y + 18}, ${feature.x - 10} ${feature.y + 18}`
                        return (
                            <g key={`branch-${feature.id}`}>
                                <path d={path} stroke="hsl(var(--primary))" strokeOpacity="0.12" strokeWidth="1.5" fill="none" />
                                <motion.path
                                    d={path}
                                    stroke="url(#flow-gradient)"
                                    strokeWidth="2"
                                    fill="none"
                                    filter="url(#glow-filter)"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.2, delay: 0.3 + i * 0.04 }}
                                />
                                <motion.circle r="4" fill="hsl(var(--primary))" opacity="0.8">
                                    <animateMotion dur="4s" repeatCount="indefinite" begin={`${i * 0.2}s`} path={path} />
                                </motion.circle>
                            </g>
                        )
                    })}

                    {networkData.features.map((feature, i) => {
                        const controlX = feature.x + (HQ_X - feature.x) * 0.6
                        const path = `M ${feature.x + 140} ${feature.y + 18} Q ${controlX} ${feature.y + 18} ${HQ_X} ${HQ_Y}`
                        return (
                            <g key={`hq-${feature.id}`}>
                                <motion.path
                                    d={path}
                                    stroke="hsl(var(--primary))"
                                    strokeWidth="1"
                                    strokeOpacity="0.25"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 2, delay: 1 + i * 0.06 }}
                                />
                                <motion.circle r="3" fill="hsl(var(--primary))" opacity="0.6">
                                    <animateMotion dur="5s" repeatCount="indefinite" begin={`${1 + i * 0.15}s`} path={path} />
                                </motion.circle>
                            </g>
                        )
                    })}
                </svg>

                {networkData.roots.map((node, i) => (
                    <RootNode key={node.id} node={node} delay={i * 0.12} />
                ))}
                {networkData.branches.map((node, i) => (
                    <BranchNode key={node.id} node={node} delay={0.4 + i * 0.08} />
                ))}
                {networkData.features.map((node, i) => (
                    <FeatureNode key={node.id} node={node} delay={0.8 + i * 0.05} />
                ))}

                <motion.div
                    ref={hqRef}
                    className="absolute w-96 h-96 rounded-[2rem] border-2 border-primary/50 bg-gradient-to-br from-background/95 via-primary/5 to-background/95 backdrop-blur-2xl flex flex-col items-center justify-center overflow-hidden shadow-[0_0_80px_-20px_hsl(var(--primary)/0.4)]"
                    style={{ left: HQ_X - 192, top: HQ_Y - 192 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 2 }}
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <Building2 className="w-32 h-32 text-primary mb-6 drop-shadow-[0_0_20px_rgba(var(--primary),0.7)]" />
                        <div className="text-4xl font-bold text-white tracking-[0.4em] mb-2">PROZ HQ</div>
                        <div className="text-xs text-primary/60 uppercase tracking-[0.3em]">Production Ready</div>
                    </div>
                    <motion.div
                        className="absolute inset-0 bg-primary/5"
                        animate={{ height: ["0%", "100%", "0%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ bottom: 0, top: "auto" }}
                    />
                    <motion.div
                        className="absolute inset-0 border-2 border-primary/20 rounded-[2rem]"
                        animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>

            {!isHQCentered && (
                <motion.div
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-background/70 backdrop-blur-lg border border-primary/30 text-sm font-medium text-foreground flex items-center gap-3 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                >
                    <Activity className="w-5 h-5 text-primary animate-pulse" />
                    <span>Scroll to explore the network →</span>
                </motion.div>
            )}
        </div>
    )
}

function RootNode({ node, delay }: any) {
    const Icon = node.icon
    return (
        <motion.div
            className="absolute w-64 px-6 py-5 rounded-2xl border-l-[5px] border-primary/60 bg-background/95 backdrop-blur-md flex items-center gap-4 shadow-lg cursor-pointer group"
            style={{ left: node.x, top: node.y }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px -15px hsl(var(--primary)/0.5)" }}
            transition={{ duration: 0.6, delay }}
        >
            <div className="p-3 rounded-xl bg-primary/15 text-primary">
                <Icon className="w-7 h-7" />
            </div>
            <div>
                <div className="text-lg font-bold text-white mb-0.5">{node.label}</div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-[0.15em]">Root Category</div>
            </div>
        </motion.div>
    )
}

function BranchNode({ node, delay }: any) {
    const Icon = node.icon
    return (
        <motion.div
            className="absolute w-52 px-5 py-4 rounded-xl border border-white/15 bg-background/90 backdrop-blur-sm flex items-center gap-3 shadow-md cursor-pointer group"
            style={{ left: node.x, top: node.y }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.08, borderColor: "hsl(var(--primary))", boxShadow: "0 0 35px -10px hsl(var(--primary)/0.4)" }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="p-2.5 rounded-lg bg-primary/12 text-primary">
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-base font-semibold text-foreground">{node.label}</span>
        </motion.div>
    )
}

function FeatureNode({ node, delay }: any) {
    return (
        <motion.div
            className="absolute w-44 px-4 py-3 rounded-lg border border-white/10 bg-background/85 backdrop-blur-sm flex items-center gap-2.5 shadow-sm cursor-pointer group"
            style={{ left: node.x, top: node.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, borderColor: "hsl(var(--primary))", boxShadow: "0 0 25px -8px hsl(var(--primary)/0.35)" }}
            transition={{ duration: 0.4, delay }}
        >
            <div className="w-2.5 h-2.5 rounded-full bg-primary/70 group-hover:bg-primary transition-colors flex-shrink-0" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{node.label}</span>
        </motion.div>
    )
}
