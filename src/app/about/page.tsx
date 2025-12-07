"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { OurExpertise } from "@/components/sections/OurExpertise"
import { Process } from "@/components/sections/Process"
import { WhyChooseProZ } from "@/components/sections/WhyChooseProZ"

export default function AboutPage() {
    return (
        <PageWrapper>
            <div className="pt-20">
                <OurExpertise />
                <Process />
                <WhyChooseProZ />
            </div>
        </PageWrapper>
    )
}
