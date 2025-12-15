"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Clock, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface ProjectCardProps {
    title: string
    description: string
    image: string
    field: string
    audience: string
    priceRange: string
    timeline: string
    techStack: string[]
}

export function ProjectCard({
    title,
    description,
    image,
    field,
    audience,
    priceRange,
    timeline,
    techStack,
}: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="h-full"
        >
            <Card className="overflow-hidden group hover:border-primary/50 transition-colors h-full flex flex-col bg-zinc-900/50 border-zinc-800">
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-2 right-2 flex gap-2">
                        <Badge variant="secondary" className="backdrop-blur-md bg-black/50 text-white border-0">
                            {field}
                        </Badge>
                    </div>
                </div>
                <CardHeader className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg line-clamp-1 text-white group-hover:text-primary transition-colors">{title}</h3>
                        <Badge variant="outline" className="text-xs uppercase border-zinc-700 text-zinc-400">
                            {audience}
                        </Badge>
                    </div>
                    <p className="text-sm text-zinc-400 line-clamp-2">{description}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3 flex-grow">
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {priceRange}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {timeline}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {techStack.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="text-[10px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                            >
                                {tech}
                            </span>
                        ))}
                        {techStack.length > 3 && (
                            <span className="text-[10px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                                +{techStack.length - 3}
                            </span>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto">
                    <Button asChild className="w-full bg-white text-black hover:bg-zinc-200 transition-colors">
                        <Link href={`/request?project=${encodeURIComponent(title)}`}>
                            Use This Sample <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
