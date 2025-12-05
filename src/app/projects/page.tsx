"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { ProjectGallery } from "@/components/features/ProjectGallery"

export default function ProjectsPage() {
    return (
        <PageWrapper>
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Example Projects</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore our portfolio of successful projects.
                        Filter by category to find inspiration for your next big idea.
                    </p>
                </div>
                <ProjectGallery />
            </div>
        </PageWrapper>
    )
}
