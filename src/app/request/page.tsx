"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { ProjectRequestForm } from "@/components/features/ProjectRequestForm"

export default function RequestPage() {
    return (
        <PageWrapper>
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Start Your Project</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Tell us about your vision. We&apos;ll help you build it.
                        Fill out the form below to get a custom quote and timeline.
                    </p>
                </div>
                <ProjectRequestForm />
            </div>
        </PageWrapper>
    )
}
