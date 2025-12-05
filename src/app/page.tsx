"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Code, Smartphone, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageWrapper } from "@/components/layout/PageWrapper"

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10 relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
          >
            Build Your Vision <br /> with ProZ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Premium software development for Students, Startups, and Enterprises.
            We turn ideas into production-ready reality.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/request">
                Request Your Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/projects">View Student Samples</Link>
            </Button>
          </motion.div>
        </div>
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Expertise</h2>
            <p className="text-muted-foreground">Comprehensive solutions for every stage of growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-10 w-10 mb-4" />,
                title: "Web Development",
                desc: "High-performance websites and web apps using Next.js and React.",
              },
              {
                icon: <Smartphone className="h-10 w-10 mb-4" />,
                title: "Mobile Apps",
                desc: "Native and cross-platform mobile applications for iOS and Android.",
              },
              {
                icon: <Palette className="h-10 w-10 mb-4" />,
                title: "UI/UX Design",
                desc: "Stunning, user-centric designs that drive engagement and conversion.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="p-3 w-fit rounded-lg bg-primary/10 text-primary mb-4">
                      {service.icon}
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-primary/5 border border-primary/10 rounded-3xl p-12 md:p-20 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                Whether you need a simple student project or a complex enterprise system, we have the skills to deliver.
              </p>
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/request">Get a Quote</Link>
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
