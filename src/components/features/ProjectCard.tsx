"use client"

import Image from "next/image"
import Link from "next/link"
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
        <Card className="overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                    <Badge variant="secondary" className="backdrop-blur-md bg-black/50 text-white border-0">
                        {field}
                    </Badge>
                </div>
            </div>
            <CardHeader className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
                    <Badge variant="outline" className="text-xs uppercase">
                        {audience}
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                            className="text-[10px] px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                        >
                            {tech}
                        </span>
                    ))}
                    {techStack.length > 3 && (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                            +{techStack.length - 3}
                        </span>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link href={`/request?project=${encodeURIComponent(title)}`}>
                        Use This Sample <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
