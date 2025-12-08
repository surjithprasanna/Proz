import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Admin Supabase Client (Service Role)
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
        const {
            fullName,
            email, // Contact email
            phone,
            accessCode, // Password
            projectName,
            projectDescription,
            price,
            pricingPlan
        } = body

        // 1. Create Auth User (Email = accessCode@proz-client.com)
        const fakeEmail = `${accessCode}@proz-client.com`

        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: fakeEmail,
            password: accessCode,
            email_confirm: true,
            user_metadata: { full_name: fullName }
        })

        if (authError) throw authError
        const userId = authData.user.id

        // 2. Create Profile
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .insert({
                id: userId,
                role: 'client',
                full_name: fullName,
                contact_email: email,
                contact_phone: phone
            })

        if (profileError) throw profileError

        // 3. Create Project
        const { error: projectError } = await supabaseAdmin
            .from('projects')
            .insert({
                user_id: userId, // Creator (technically admin, but assigning ownership to client for simplicity in this flow?) 
                // Wait, usually user_id is creator. client_id is the client.
                // Let's check schema. projects: user_id (Creator/Admin), client_id (Assigned Client)
                // We need the ADMIN's ID for user_id. But we are in an API route.
                // We'll set client_id = userId. user_id we might leave null or set to a system admin ID if we had one.
                // For now, let's set client_id = userId.
                client_id: userId,
                name: projectName,
                description: projectDescription,
                status: 'Discovery',
                price: price,
                pricing_plan: pricingPlan,
                progress: 0
            })

        if (projectError) throw projectError

        // 4. Mock Notification (Log to console)
        console.log(`[NOTIFICATION] Sent to ${email} / ${phone}:`)
        console.log(`Your project "${projectName}" is ready!`)
        console.log(`Login with Access Code: ${accessCode}`)

        return NextResponse.json({ success: true, userId })

    } catch (error: any) {
        console.error("Create Client Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
