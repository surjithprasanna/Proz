"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Send, ArrowRight, MessageSquare, Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { PageWrapper } from "@/components/layout/PageWrapper"
import Link from "next/link"

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSent(true)
    }

    return (
        <PageWrapper>
            <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">

                {/* Hero Section */}
                <section className="container mx-auto px-6 py-24 md:py-32 border-b border-zinc-900">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                            Get in Touch.
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed">
                            Have a question, a partnership idea, or just want to say hi? We'd love to hear from you.
                        </p>
                    </motion.div>
                </section>

                <section className="container mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                        {/* Contact Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-12"
                        >
                            <div>
                                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0">
                                            <Mail className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg mb-1">Email Us</h3>
                                            <p className="text-zinc-400 mb-2">For general inquiries and support.</p>
                                            <a href="mailto:hello@proz.com" className="text-white hover:text-green-400 transition-colors text-lg font-mono">
                                                hello@proz.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg mb-1">Global HQ</h3>
                                            <p className="text-zinc-400">
                                                Remote First Company<br />
                                                Operating Worldwide
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
                                <div className="flex gap-4">
                                    <SocialLink href="#" icon={Github} label="GitHub" />
                                    <SocialLink href="#" icon={Twitter} label="Twitter" />
                                    <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
                                </div>
                            </div>

                            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                                <h3 className="text-xl font-bold mb-2">Looking to start a project?</h3>
                                <p className="text-zinc-400 mb-6">
                                    For detailed project proposals and estimates, please use our dedicated request form.
                                </p>
                                <Button asChild className="bg-white text-black hover:bg-zinc-200 w-full md:w-auto">
                                    <Link href="/request">
                                        Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="bg-zinc-900 border-zinc-800 p-6 md:p-8">
                                <CardContent className="p-0">
                                    {isSent ? (
                                        <div className="text-center py-20">
                                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Send className="w-10 h-10 text-green-500" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                                            <p className="text-zinc-400 mb-8">
                                                Thanks for reaching out. We'll get back to you as soon as possible.
                                            </p>
                                            <Button
                                                onClick={() => setIsSent(false)}
                                                variant="outline"
                                                className="border-zinc-700 text-white hover:bg-zinc-800"
                                            >
                                                Send Another Message
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label>Name</Label>
                                                    <Input
                                                        required
                                                        className="bg-black border-zinc-800 focus:border-white"
                                                        placeholder="John Doe"
                                                        value={formState.name}
                                                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Email</Label>
                                                    <Input
                                                        required
                                                        type="email"
                                                        className="bg-black border-zinc-800 focus:border-white"
                                                        placeholder="john@example.com"
                                                        value={formState.email}
                                                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Subject</Label>
                                                <Input
                                                    required
                                                    className="bg-black border-zinc-800 focus:border-white"
                                                    placeholder="What is this regarding?"
                                                    value={formState.subject}
                                                    onChange={e => setFormState({ ...formState, subject: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Message</Label>
                                                <Textarea
                                                    required
                                                    className="bg-black border-zinc-800 focus:border-white min-h-[150px]"
                                                    placeholder="Tell us more..."
                                                    value={formState.message}
                                                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-white text-black hover:bg-zinc-200 text-lg py-6"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "Sending..." : "Send Message"}
                                            </Button>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </section>



            </div>
        </PageWrapper>
    )
}

function SocialLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
    return (
        <a
            href={href}
            className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-all duration-300"
            aria-label={label}
        >
            <Icon className="w-5 h-5" />
        </a>
    )
}


