"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"

const team = [
    {
        name: "Alex Chen",
        role: "Founder & CTO",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        bio: "Ex-Google engineer with a passion for scalable systems and AI.",
        social: {
            twitter: "#",
            linkedin: "#",
            github: "#"
        }
    },
    {
        name: "Sarah Miller",
        role: "Lead Designer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
        bio: "Award-winning UI/UX designer focused on intuitive and beautiful interfaces.",
        social: {
            twitter: "#",
            linkedin: "#",
            github: "#"
        }
    },
    {
        name: "David Kim",
        role: "Senior Full Stack Dev",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
        bio: "Full stack wizard specializing in Next.js, Node.js, and cloud architecture.",
        social: {
            twitter: "#",
            linkedin: "#",
            github: "#"
        }
    },
    {
        name: "Emily Zhang",
        role: "Product Manager",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
        bio: "Bridging the gap between technical complexity and user needs.",
        social: {
            twitter: "#",
            linkedin: "#",
            github: "#"
        }
    }
]

export function Team() {
    return (
        <section className="py-20 bg-zinc-950">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Meet the Team</h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        The minds behind the code. We are a diverse group of engineers, designers, and thinkers.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors"
                        >
                            <div className="aspect-square relative overflow-hidden">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                    <div className="flex gap-4">
                                        <a href={member.social.twitter} className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors">
                                            <Twitter className="w-4 h-4" />
                                        </a>
                                        <a href={member.social.linkedin} className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                        <a href={member.social.github} className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors">
                                            <Github className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
