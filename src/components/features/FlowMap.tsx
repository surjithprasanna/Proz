"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import {
    Rocket, Building2, GraduationCap, Globe, Smartphone,
    Layout, Cloud, Palette, Package, Zap, Activity,
    Shield, Server, Database, Lock, Search, BarChart,
    Users, FileText, Cpu, Eye
} from "lucide-react"

const FLOW_WIDTH = 3800
const HQ_X = 3300
const HQ_Y = 400
const NODE_SHIFT_X = 1300
const CONNECTOR_LENGTH = 5 // Adjust this to change the stem length
const HQ_TEXT_TOP_MARGIN = 24 // Adjust spacing between Image and "PROZ HQ"
const HQ_SUBTEXT_TOP_MARGIN = 8 // Adjust spacing between "PROZ HQ" and "Production Ready"

// Helper to shift nodes right
const nodeX = (node: Node) => node.x + NODE_SHIFT_X

const NODE_WIDTH: Record<Node["type"], number> = {
    root: 256,        // w-64
    branch: 208,      // w-52
    feature: 192,     // w-48
    "sub-feature": 160 // w-40
}

const leftEdge = (node: Node) => nodeX(node) - NODE_WIDTH[node.type] / 2
const rightEdge = (node: Node) => nodeX(node) + NODE_WIDTH[node.type] / 2

// Unified Node Type
interface Node {
    id: string
    label: string
    icon?: React.ElementType
    x: number
    y: number
    type: 'root' | 'branch' | 'feature' | 'sub-feature'
    parentId?: string
}

// Deep Hierarchy Data
const nodes: Node[] = [
    // --- ROOTS (x: ~100-200) ---
    { id: "startup", label: "Startup", icon: Rocket, x: 23, y: 150, type: 'root' },
    { id: "enterprise", label: "Enterprise", icon: Building2, x: 23, y: 350, type: 'root' },
    { id: "academic", label: "Academic", icon: GraduationCap, x: 23, y: 550, type: 'root' },

    // --- STARTUP BRANCH (y: 50-250) ---
    { id: "saas", label: "SaaS MVP", parentId: "startup", icon: Zap, x: 600, y: 100, type: 'branch' },
    { id: "mobile", label: "Mobile App", parentId: "startup", icon: Smartphone, x: 600, y: 180, type: 'branch' },
    { id: "marketing", label: "Marketing", parentId: "startup", icon: Layout, x: 600, y: 260, type: 'branch' },

    // Startup Features
    { id: "auth", label: "Auth", parentId: "saas", x: 1000, y: 80, type: 'feature' },
    { id: "billing", label: "Billing", parentId: "saas", x: 1000, y: 120, type: 'feature' },
    { id: "seo", label: "SEO", parentId: "saas", x: 1000, y: 160, type: 'feature' },
    { id: "ux", label: "UX / UI", parentId: "mobile", x: 1000, y: 200, type: 'feature' },
    { id: "leads", label: "Leads", parentId: "marketing", x: 1000, y: 240, type: 'feature' },
    { id: "dash", label: "Dashboard", parentId: "marketing", x: 1000, y: 280, type: 'feature' },

    // Startup Sub-Features (Deep)
    { id: "conversion", label: "Conversion", parentId: "billing", x: 1400, y: 100, type: 'sub-feature' },
    { id: "admin", label: "Admin", parentId: "billing", x: 1400, y: 140, type: 'sub-feature' },
    { id: "funnel", label: "Funnel", parentId: "ux", x: 1400, y: 200, type: 'sub-feature' },

    // --- ENTERPRISE BRANCH (y: 300-450) ---
    { id: "platform", label: "Platform", parentId: "enterprise", icon: Server, x: 600, y: 330, type: 'branch' },
    { id: "compliance", label: "Compliance", parentId: "enterprise", icon: Shield, x: 600, y: 390, type: 'branch' },
    { id: "devops", label: "DevOps", parentId: "enterprise", icon: Cloud, x: 600, y: 450, type: 'branch' },

    // Enterprise Features
    { id: "iam", label: "IAM", parentId: "platform", x: 1000, y: 320, type: 'feature' },
    { id: "multitenant", label: "Multi-tenant", parentId: "platform", x: 1000, y: 360, type: 'feature' },
    { id: "audit", label: "Audit", parentId: "compliance", x: 1000, y: 390, type: 'feature' },
    { id: "gov", label: "Governance", parentId: "compliance", x: 1000, y: 440, type: 'feature' },
    { id: "cloud-int", label: "Cloud Int", parentId: "devops", x: 1000, y: 480, type: 'feature' },

    // Enterprise Sub-Features
    { id: "internal", label: "Internal Tools", parentId: "gov", x: 1400, y: 440, type: 'sub-feature' },
    { id: "observe", label: "Observability", parentId: "cloud-int", x: 1400, y: 480, type: 'sub-feature' },

    // --- ACADEMIC BRANCH (y: 500-650) ---
    { id: "research", label: "Research", parentId: "academic", icon: Search, x: 600, y: 530, type: 'branch' },
    { id: "learning", label: "Learning", parentId: "academic", icon: GraduationCap, x: 600, y: 590, type: 'branch' },
    { id: "ailab", label: "AI Lab", parentId: "academic", icon: Cpu, x: 600, y: 650, type: 'branch' },

    // Academic Features
    { id: "pub", label: "Publications", parentId: "research", x: 1000, y: 530, type: 'feature' },
    { id: "courses", label: "Courses", parentId: "learning", x: 1000, y: 590, type: 'feature' },
    { id: "vis", label: "Visuals", parentId: "ailab", x: 1000, y: 650, type: 'feature' },

    // Academic Sub-Features
    { id: "equip", label: "Equipment", parentId: "courses", x: 1400, y: 590, type: 'sub-feature' },
    { id: "eval", label: "Evaluation", parentId: "vis", x: 1400, y: 650, type: 'sub-feature' },
]

const WAVE_COLORS = [
    "#00ff00", // Neon Green
    "#00ffff", // Cyan
    "#ff00ff", // Magenta
    "#ff0000", // Red
    "#ffff00", // Yellow
    "#ff8800", // Orange
]

export function FlowMap({ children, waveTrigger = 0, scrollContainerRef }: { children?: React.ReactNode, waveTrigger?: number, scrollContainerRef?: React.RefObject<HTMLDivElement | null> }) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const hqRef = React.useRef<HTMLDivElement>(null)
    const flowOffsetXRef = React.useRef(0)

    // --- STICKY SCROLL LOGIC ---
    const { scrollYProgress } = useScroll({
        target: scrollContainerRef,
        offset: ["start start", "end end"]
    })

    // Map vertical scroll (0 to 1) to horizontal movement (0 to -MAX_SCROLL)
    const [maxScroll, setMaxScroll] = React.useState(0)

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            // Calculate how much we need to move to center the HQ
            const targetX = HQ_X
            const centerOffset = window.innerWidth / 2
            const moveAmount = targetX - centerOffset
            setMaxScroll(moveAmount)
        }
    }, [])

    const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxScroll])
    const flowOffsetX = useSpring(rawX, { stiffness: 100, damping: 20, mass: 0.5 })

    // Sync ref for origin calc
    flowOffsetX.on("change", (latest) => {
        flowOffsetXRef.current = latest
    })

    // Wave Logic
    const waveColor = React.useMemo(() => {
        if (waveTrigger === 0) return "#22c55e" // Default green
        return WAVE_COLORS[(waveTrigger - 1) % WAVE_COLORS.length]
    }, [waveTrigger])

    // Origin Point Calculation
    const [origin, setOrigin] = React.useState({ x: 0, y: 0 })

    const updateOrigin = React.useCallback(() => {
        const btn = document.getElementById('view-portfolio-btn')
        if (btn && containerRef.current) {
            const btnRect = btn.getBoundingClientRect()
            const containerRect = containerRef.current.getBoundingClientRect()

            // Calculate X relative to the container, but SUBTRACT the current flow offset
            // This puts the point in the "virtual" coordinate space of the SVG
            const relativeX = (btnRect.right - containerRect.left) - flowOffsetXRef.current
            const relativeY = btnRect.top - containerRect.top + btnRect.height / 2

            setOrigin({ x: relativeX, y: relativeY })
        }
    }, [])





    // Initial Origin Update
    React.useEffect(() => {
        updateOrigin()
        window.addEventListener('resize', updateOrigin)

        // Fix: Re-calculate after button animation
        setTimeout(updateOrigin, 100)
        setTimeout(updateOrigin, 1000)
        setTimeout(updateOrigin, 2000)

        return () => window.removeEventListener('resize', updateOrigin)
    }, [updateOrigin])


    // --- CONNECTION PATHS ---
    const getPath = (x1: number, y1: number, x2: number, y2: number) => {
        const midX = (x1 + x2) / 2
        return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`
    }

    // 1. Origin to Roots
    const rootConnections = nodes.filter(n => n.type === 'root').map(node => ({
        end: node
    }))

    // 2. Internal Connections
    const internalConnections = nodes.filter(n => n.parentId).map(node => {
        const parent = nodes.find(p => p.id === node.parentId)
        return parent ? { start: parent, end: node } : null
    }).filter(Boolean) as { start: Node, end: Node }[]

    // 3. Terminal Connections (Leaves)
    const terminalConnections = nodes.filter(n => {
        const isParent = nodes.some(child => child.parentId === n.id)
        return !isParent
    }).map(node => ({
        start: node,
        end: { x: HQ_X, y: HQ_Y } // Target HQ
    }))

    return (
        <div ref={containerRef} className="relative w-full h-full bg-transparent overflow-hidden pointer-events-auto">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            <motion.div style={{ x: flowOffsetX }} className="absolute inset-0">
                {/* Hero Content Layer */}
                <div className="absolute inset-y-0 left-0 w-screen flex items-center justify-center pointer-events-auto z-10">
                    {children}
                </div>

                <svg className="absolute inset-0 pointer-events-none" style={{ width: FLOW_WIDTH, height: '100%' }}>
                    <defs>
                        <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Origin Stem */}
                    <motion.path
                        d={`M ${origin.x} ${origin.y} L ${origin.x + CONNECTOR_LENGTH} ${origin.y}`}
                        stroke={waveTrigger > 0 ? waveColor : "#ffffff"}
                        strokeWidth="2"
                        initial={false}
                        animate={{ stroke: waveTrigger > 0 ? [waveColor, "#ffffff"] : "#ffffff" }}
                        transition={{ duration: 1, delay: 0 }}
                    />

                    {/* Origin to Roots */}
                    {rootConnections.map((conn, i) => {
                        const startX = origin.x + CONNECTOR_LENGTH
                        const endX = leftEdge(conn.end)
                        const path = getPath(startX, origin.y, endX, conn.end.y)

                        // Delay based on distance/index
                        const delay = 0.1 + (conn.end.x / 3000)

                        return (
                            <motion.path
                                key={`root-${i}`}
                                d={path}
                                stroke="#ffffff"
                                strokeWidth="2"
                                fill="none"
                                initial={false}
                                animate={{
                                    stroke: waveTrigger > 0 ? [waveColor, "#ffffff"] : "#ffffff",
                                    strokeWidth: waveTrigger > 0 ? [4, 2] : 2,
                                    strokeOpacity: waveTrigger > 0 ? [1, 0.2] : 0.2
                                }}
                                transition={{ duration: 1.5, delay: delay }}
                            />
                        )
                    })}

                    {/* Internal Connections */}
                    {internalConnections.map((conn, i) => {
                        const startX = rightEdge(conn.start)
                        const endX = leftEdge(conn.end)
                        const path = getPath(startX, conn.start.y, endX, conn.end.y)

                        const delay = 0.2 + (conn.start.x / 3000)

                        return (
                            <motion.path
                                key={`int-${i}`}
                                d={path}
                                stroke="#ffffff"
                                strokeWidth="2"
                                fill="none"
                                initial={false}
                                animate={{
                                    stroke: waveTrigger > 0 ? [waveColor, "#ffffff"] : "#ffffff",
                                    strokeOpacity: waveTrigger > 0 ? [1, 0.2] : 0.2
                                }}
                                transition={{ duration: 1.5, delay: delay }}
                            />
                        )
                    })}

                    {/* Terminal Connections (Leaves to Merge Point) */}
                    {terminalConnections.map((conn, i) => {
                        const startX = rightEdge(conn.start)
                        const mergeX = HQ_X - 400
                        const mergeY = HQ_Y
                        const path = getPath(startX, conn.start.y, mergeX, mergeY)

                        const delay = 0.5 + (conn.start.x / 3000)

                        return (
                            <motion.path
                                key={`term-${i}`}
                                d={path}
                                stroke="#ffffff"
                                strokeWidth="1"
                                fill="none"
                                initial={false}
                                animate={{
                                    stroke: waveTrigger > 0 ? [waveColor, "#ffffff"] : "#ffffff",
                                    strokeOpacity: waveTrigger > 0 ? [1, 0.2] : 0.2
                                }}
                                transition={{ duration: 1.5, delay: delay }}
                            />
                        )
                    })}

                    {/* Single Line from Merge Point to HQ Bottom Left */}
                    <motion.path
                        d={`M ${HQ_X - 400} ${HQ_Y} L ${HQ_X - 300} ${HQ_Y}`}
                        stroke="#ffffff"
                        strokeWidth="2"
                        fill="none"
                        filter="url(#glow-filter)"
                        initial={false}
                        animate={{
                            stroke: waveTrigger > 0 ? [waveColor, "#ffffff"] : "#ffffff",
                            strokeWidth: waveTrigger > 0 ? [4, 2] : 2
                        }}
                        transition={{ duration: 1.5, delay: 1.5 }}
                    />

                </svg>

                {/* Render Nodes */}
                {nodes.map((node, i) => (
                    <GenericNode key={node.id} node={node} delay={i * 0.05} waveTrigger={waveTrigger} waveColor={waveColor} />
                ))}

                {/* HQ Node (Logo Only) */}
                <motion.div
                    ref={hqRef}
                    className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer"
                    style={{ left: HQ_X, top: HQ_Y, x: "-50%", y: "-50%" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: waveTrigger > 0 ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 1.2, delay: 2.5 }}
                >
                    <div className="relative z-10 flex flex-col items-center group">
                        <div className="relative w-[600px] h-[600px] transition-transform group-hover:scale-110 duration-500" style={{ marginBottom: HQ_TEXT_TOP_MARGIN }}>
                            <Image
                                src="/images/hq-logo.png"
                                alt="ProZ HQ"
                                fill
                                className="object-contain drop-shadow-[0_0_20px_rgba(var(--primary),0.7)]"
                            />
                        </div>
                        <div className="text-4xl font-bold text-white tracking-[0.4em]" style={{ marginBottom: HQ_SUBTEXT_TOP_MARGIN }}>PROZ HQ</div>
                        <div className="text-xs text-primary/60 uppercase tracking-[0.3em]">Production Ready</div>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute bottom-16 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-background/70 backdrop-blur-lg border border-primary/30 text-sm font-medium text-foreground flex items-center gap-3 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 }}
            >
                <Activity className="w-5 h-5 text-primary animate-pulse" />
                <span>Scroll down to explore →</span>
            </motion.div>
        </div>
    )
}

function GenericNode({ node, delay, waveTrigger, waveColor }: { node: Node, delay: number, waveTrigger: number, waveColor: string }) {
    const Icon = node.icon || Activity

    // Size and style based on type
    let width = "w-48"
    let padding = "px-4 py-3"
    let textSize = "text-sm"

    if (node.type === 'root') {
        width = "w-64"
        padding = "px-6 py-5"
        textSize = "text-lg"
    } else if (node.type === 'branch') {
        width = "w-52"
        padding = "px-5 py-4"
        textSize = "text-base"
    } else if (node.type === 'sub-feature') {
        width = "w-40"
        padding = "px-3 py-2"
        textSize = "text-xs"
    }

    // Calculate wave delay based on X position
    const waveDelay = node.x / 2000 // Adjust speed

    return (
        <motion.div
            className={`absolute ${width} ${padding} rounded-xl border border-white/10 bg-background/80 backdrop-blur-sm flex items-center gap-3 shadow-sm cursor-pointer group
                ${node.type === 'root' ? 'border-l-[5px] border-l-primary/60' : ''}
            `}
            style={{ left: nodeX(node), top: node.y, translateX: "-50%", translateY: "-50%" }} // Center anchor
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: 1,
                borderColor: waveTrigger > 0 ? [null, waveColor, "rgba(255,255,255,0.1)"] : "rgba(255,255,255,0.1)",
                boxShadow: waveTrigger > 0 ? [null, `0 0 20px ${waveColor}`, "none"] : "none"
            }}
            whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))", boxShadow: "0 0 25px -5px hsl(var(--primary)/0.3)" }}
            transition={{
                duration: 0.5,
                delay: waveTrigger > 0 ? waveDelay : delay, // Use wave delay if triggered
                borderColor: { duration: 1, delay: waveDelay },
                boxShadow: { duration: 1, delay: waveDelay }
            }}
        >
            {node.icon && (
                <div className={`p-2 rounded-lg bg-primary/10 text-primary ${node.type === 'root' ? 'p-3' : ''}`}>
                    <Icon
                        className={`${node.type === 'root' ? 'w-6 h-6' : 'w-4 h-4'}`}
                        style={{ color: waveTrigger > 0 ? waveColor : undefined }} // Animate icon color? simpler to just set it
                    />
                </div>
            )}
            {!node.icon && (
                <div
                    className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"
                    style={{ backgroundColor: waveTrigger > 0 ? waveColor : undefined }}
                />
            )}
            <div>
                <div className={`${textSize} font-semibold text-foreground`}>{node.label}</div>
                {node.type === 'root' && <div className="text-[9px] text-muted-foreground uppercase tracking-wider">Category</div>}
            </div>
        </motion.div>
    )
}
