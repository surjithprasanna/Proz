"use client"

import { motion } from "framer-motion"
import { Target, Lightbulb } from "lucide-react"

export function VisionMission() {
    return (
        <section className="py-20 bg-black text-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Purpose</h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Driving innovation through engineering excellence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-zinc-900/30 border border-zinc-800 p-10 rounded-3xl relative group hover:bg-zinc-900/50 transition-colors duration-300"
                    >
                        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 border border-zinc-800">
                            <Lightbulb className="w-8 h-8 text-yellow-500" />
                        </div>
                        <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
                        <p className="text-zinc-400 leading-relaxed text-lg">
                            To be the global catalyst for digital transformation, empowering businesses of all sizes to scale without limits through robust, future-proof technology.
                        </p>
                    </motion.div>

                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="bg-zinc-900/30 border border-zinc-800 p-10 rounded-3xl relative group hover:bg-zinc-900/50 transition-colors duration-300"
                    >
                        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 border border-zinc-800">
                            <Target className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                        <p className="text-zinc-400 leading-relaxed text-lg">
                            To deliver premium, production-ready software solutions that solve complex problems, while fostering a culture of transparency, technical mastery, and client success.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
