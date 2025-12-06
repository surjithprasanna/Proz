"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import * as React from "react"

const faqs = [
    {
        question: "What is your typical project timeline?",
        answer: "Timeline varies based on project scope. An MVP typically takes 8-12 weeks, while larger enterprise projects may take 3-6 months. We provide detailed timelines during the discovery phase."
    },
    {
        question: "Do you work with specific technologies only?",
        answer: "While we have preferred modern stacks (React, Next.js, Node.js, etc.), we're flexible and can work with your existing technology or recommend the best fit for your requirements."
    },
    {
        question: "What does your engagement process look like?",
        answer: "We start with a discovery call to understand your needs, followed by a detailed proposal. Once aligned, we kick off with sprint planning and maintain regular communication throughout development."
    },
    {
        question: "Do you provide post-launch support?",
        answer: "Yes! All projects include post-launch support. We offer maintenance packages and can continue as your dedicated development team for ongoing feature development."
    },
    {
        question: "How do you handle project communication?",
        answer: "We use tools like Slack, Jira, and regular video calls. You'll have direct access to the team, with weekly progress updates and demos for transparency."
    },
    {
        question: "Can you work with our existing team?",
        answer: "Absolutely! We integrate seamlessly with your in-house team, whether you need us to lead development or augment your existing capacity."
    }
]

export function FAQ() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null)

    return (
        <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to know about working with ProZ.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className="bg-background border border-primary/10 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-primary/5 transition-colors"
                            >
                                <span className="font-semibold pr-4">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 pb-4"
                                >
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
