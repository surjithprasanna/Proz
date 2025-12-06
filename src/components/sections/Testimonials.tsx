"use client"

import { motion } from "framer-motion"

const testimonials = [
    {
        quote: "ProZ transformed our vision into a production-ready platform in record time. Their technical expertise and product thinking made all the difference.",
        author: "Sarah Chen",
        role: "CTO",
        company: "TechVentures Inc"
    },
    {
        quote: "Working with ProZ felt like having an extended team that truly cared about our success. The quality and attention to detail exceeded our expectations.",
        author: "Michael Rodriguez",
        role: "Product Director",
        company: "Innovation Labs"
    },
    {
        quote: "From concept to launch, ProZ delivered a scalable solution that our users love. Their transparent communication kept us confident throughout the process.",
        author: "Emily Watson",
        role: "Founder & CEO",
        company: "NextGen Solutions"
    }
]

export function Testimonials() {
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Trusted by startups and enterprises to deliver exceptional results.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.author}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-background border border-primary/10 rounded-xl p-8"
                        >
                            <div className="text-4xl text-primary/20 mb-4">"</div>
                            <p className="text-muted-foreground mb-6 italic">{testimonial.quote}</p>
                            <div>
                                <div className="font-bold">{testimonial.author}</div>
                                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                <div className="text-sm text-primary">{testimonial.company}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
