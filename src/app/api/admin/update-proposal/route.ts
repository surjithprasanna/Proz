import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { requestId, price, plan, accessCode, docs } = body

        if (!requestId || !price || !plan || !accessCode) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const { error } = await supabase
            .from('project_requests')
            .update({
                proposal_price: price,
                proposal_plan: plan,
                access_code: accessCode,
                proposal_docs: docs,
                proposal_status: 'proposal_ready', // Mark as ready for conversion/user review
                status: 'contacted' // Update main status too
            })
            .eq('id', requestId)

        if (error) throw error

        return NextResponse.json({ success: true })

    } catch (error: any) {
        console.error("Error updating proposal:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
