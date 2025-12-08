import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Admin Supabase Client
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { requestId, proposalPrice, proposalDocs, accessCode } = body

        // Sanitize Inputs
        const sanitizedPrice = proposalPrice ? String(proposalPrice).trim() : null
        const sanitizedDocs = Array.isArray(proposalDocs) ? proposalDocs : []
        const sanitizedAccessCode = accessCode ? String(accessCode).trim() : `PROZ-${Math.floor(1000 + Math.random() * 9000)}`

        if (!requestId) throw new Error("Request ID is required")

        // 1. Get Request Details
        const { data: reqData, error: reqError } = await supabaseAdmin
            .from('project_requests')
            .select('*')
            .eq('id', requestId)
            .single()

        if (reqError) throw reqError

        // 2. Create Auth User (Access Code)
        const fakeEmail = `${accessCode}@proz-client.com`
        let userId

        // Check if user exists (by email) - simplistic check
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
        const existingUser = existingUsers.users.find(u => u.email === fakeEmail)

        if (existingUser) {
            userId = existingUser.id
        } else {
            const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
                email: fakeEmail,
                password: accessCode,
                email_confirm: true,
                user_metadata: { full_name: reqData.full_name }
            })
            if (authError) throw authError
            userId = authData.user.id

            // Create Profile
            await supabaseAdmin.from('profiles').insert({
                id: userId,
                role: 'client',
                full_name: reqData.full_name,
                contact_email: reqData.email,
                contact_phone: reqData.phone
            })
        }

        // 3. Update Request with Proposal
        const { error: updateError } = await supabaseAdmin
            .from('project_requests')
            .update({
                proposal_status: 'quoted',
                proposal_price: sanitizedPrice,
                proposal_docs: sanitizedDocs, // JSON array
                client_id: userId,
                status: 'contacted' // Mark as contacted/processed
            })
            .eq('id', requestId)

        if (updateError) throw updateError

        // 4. Mock Notification
        console.log(`[PROPOSAL SENT] To: ${reqData.email}`)
        console.log(`Access Code: ${accessCode}`)
        console.log(`Price: ${proposalPrice}`)

        return NextResponse.json({ success: true })

    } catch (error: any) {
        console.error("Submit Proposal Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
