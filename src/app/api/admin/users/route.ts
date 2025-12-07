import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Supabase Admin Client (Service Role)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
    try {
        const { email, password, fullName } = await request.json()

        // 1. Create User in Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name: fullName }
        })

        if (authError) throw authError

        if (!authData.user) throw new Error('Failed to create user')

        // 2. Create Profile in 'profiles' table
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .insert([
                {
                    id: authData.user.id,
                    role: 'client',
                    full_name: fullName
                }
            ])

        if (profileError) {
            // Rollback: Delete the auth user if profile creation fails
            await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
            throw profileError
        }

        return NextResponse.json({ user: authData.user, message: 'Client created successfully' })

    } catch (error: any) {
        console.error('Error creating client:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to create client' },
            { status: 500 }
        )
    }
}
