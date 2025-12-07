"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { Pricing } from "@/components/sections/Pricing"
import { FAQ } from "@/components/sections/FAQ"

export default function PricingPage() {
    return (
        <PageWrapper>
            <div className="pt-20">
                <Pricing />
                <FAQ />
            </div>
        </PageWrapper>
    )
}
