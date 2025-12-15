"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { VisionMission } from "@/components/sections/VisionMission"
import { Process } from "@/components/sections/Process"
import { WhyChooseProZ } from "@/components/sections/WhyChooseProZ"
import { Team } from "@/components/sections/Team"

export default function AboutPage() {
    return (
        <PageWrapper>
            <div className="pt-20">
                <VisionMission />
                <Process />
                <WhyChooseProZ />
                <Team />
            </div>
        </PageWrapper>
    )
}
