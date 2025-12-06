import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { requestId, email, password, projectName, budget, deadline } = body

        const supabaseAdmin = createAdminClient()

        // 1. Create User
        const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true
        })

        if (userError) {
            // If user already exists, try to get their ID
            if (userError.message.includes('already registered')) {
                // Logic to handle existing user could go here, but for now let's return error
                // or we could just proceed if we had the ID. 
                // For simplicity, let's assume new users for now or handle manually.
                return NextResponse.json({ error: userError.message }, { status: 400 })
            }
            return NextResponse.json({ error: userError.message }, { status: 400 })
        }

        const userId = userData.user.id

        // 2. Create Project
        const { error: projectError } = await supabaseAdmin
            .from('projects')
            .insert({
                user_id: userId,
                name: projectName,
                status: 'Discovery',
                description: `Budget: ${budget}, Deadline: ${deadline}`,
                progress: 10
            })

        if (projectError) {
            return NextResponse.json({ error: projectError.message }, { status: 400 })
        }

        // 3. Update Request Status
        const { error: requestError } = await supabaseAdmin
            .from('project_requests')
            .update({ status: 'converted' })
            .eq('id', requestId)

        if (requestError) {
            return NextResponse.json({ error: requestError.message }, { status: 400 })
        }

        return NextResponse.json({ success: true, userId })
    } catch (error) {
        console.error('Conversion error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
