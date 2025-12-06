import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Smartphone, Palette, Globe, Database } from "lucide-react"
import { cn } from "@/lib/utils"

export function AnimatedProjectFlow() {
    return (
        <div className="relative inline-flex items-center">
            {/* Main Button with Shimmer */}
            <div className="relative z-20">
                <Link href="/projects">
                    <motion.div
                        className="relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-12 rounded-md px-8 text-lg overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            View Project Portfolio
                        </span>

                        {/* Continuous Shimmer Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -skew-x-12"
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{
                                repeat: Infinity,
                                duration: 3,
                                ease: "linear",
                                repeatDelay: 0
                            }}
                            style={{ width: "50%" }}
                        />
                    </motion.div>
                </Link>
            </div>

            {/* Absolute Container for Flow Animation */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 flex items-center z-10 pointer-events-none">
                {/* Connection Wires */}
                <div className="relative w-24 h-[300px] -ml-2 flex items-center">
                    <svg className="w-full h-full overflow-visible">
                        {/* Main horizontal line out */}
                        <motion.path
                            d="M0,150 L40,150"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary/20"
                        />
                        <motion.path
                            d="M0,150 L40,150"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                                repeatDelay: 2
                            }}
                        />

                        {/* Vertical distribution line */}
                        <motion.path
                            d="M40,50 L40,250"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary/20"
                        />
                        <motion.path
                            d="M40,50 L40,250"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                            transition={{
                                duration: 1,
                                delay: 0.5,
                                repeat: Infinity,
                                ease: "linear",
                                repeatDelay: 2
                            }}
                        />

                        {/* Horizontal lines to nodes */}
                        {[50, 116, 182, 250].map((y, i) => (
                            <React.Fragment key={i}>
                                <motion.path
                                    d={`M40,${y} L96,${y}`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-primary/20"
                                />
                                <motion.path
                                    d={`M40,${y} L96,${y}`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-primary"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 1 + (i * 0.1),
                                        repeat: Infinity,
                                        ease: "linear",
                                        repeatDelay: 2.5
                                    }}
                                />
                            </React.Fragment>
                        ))}
                    </svg>
                </div>

                {/* Vertical Nodes Stack */}
                <div className="flex flex-col gap-4 ml-2">
                    {[
                        { icon: Globe, label: "Web Development", color: "text-blue-500", bg: "bg-blue-500/10" },
                        { icon: Smartphone, label: "Mobile Apps", color: "text-green-500", bg: "bg-green-500/10" },
                        { icon: Palette, label: "UI/UX Design", color: "text-purple-500", bg: "bg-purple-500/10" },
                        { icon: Database, label: "SaaS Platforms", color: "text-orange-500", bg: "bg-orange-500/10" },
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-xl border border-border backdrop-blur-sm bg-background/80 w-48",
                                "relative overflow-hidden"
                            )}
                            initial={{ opacity: 0.8, scale: 1 }}
                            animate={{
                                scale: [1, 1.05, 1],
                                borderColor: ["hsl(var(--border))", "hsl(var(--primary))", "hsl(var(--border))"]
                            }}
                            transition={{
                                duration: 0.5,
                                delay: 1.5 + (i * 0.1),
                                repeat: Infinity,
                                repeatDelay: 2.5
                            }}
                        >
                            <div className={cn("p-2 rounded-full shrink-0", item.bg, item.color)}>
                                <item.icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>

                            {/* Node Shimmer */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -skew-x-12"
                                initial={{ x: "-100%" }}
                                animate={{ x: "200%" }}
                                transition={{
                                    duration: 1,
                                    delay: 1.5 + (i * 0.1),
                                    repeat: Infinity,
                                    repeatDelay: 2
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
