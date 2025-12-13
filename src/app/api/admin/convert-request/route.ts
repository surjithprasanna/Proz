import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { requestId, email, password, projectName, budget, deadline, plan, full_name, phone, profession } = body

        const supabaseAdmin = createAdminClient()

        // 1. Create User
        const accessCodeEmail = `${password}@proz-client.com`
        const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
            email: accessCodeEmail,
            password: password,
            email_confirm: true,
            user_metadata: {
                real_email: email,
                full_name: full_name,
                phone: phone,
                profession: profession
            }
        })

        if (userError) {
            // If user already exists, try to get their ID
            if (userError.message.includes('already registered')) {
                return NextResponse.json({ error: userError.message }, { status: 400 })
            }
            return NextResponse.json({ error: userError.message }, { status: 400 })
        }

        const userId = userData.user.id

        // 1.1 Create Profile
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .insert({
                id: userId,
                full_name: full_name,
                contact_email: email,
                contact_phone: phone,
                role: 'client'
            })

        if (profileError) {
            console.error('Error creating profile:', profileError)
            // Continue anyway, as user is created
        }

        // 2. Create Project
        const { error: projectError } = await supabaseAdmin
            .from('projects')
            .insert({
                user_id: userId,
                client_id: userId,
                name: projectName,
                status: 'Discovery',
                description: `Budget: ${budget}, Deadline: ${deadline}`,
                progress: 10,
                price: budget,
                pricing_plan: plan
            })

        if (projectError) {
            return NextResponse.json({ error: projectError.message }, { status: 400 })
        }

        const projectId = (await supabaseAdmin.from('projects').select('id').eq('user_id', userId).single()).data?.id

        // 2.1 Create Default Phases
        if (projectId) {
            const defaultPhases = [
                {
                    project_id: projectId,
                    name: "System Architecture Analysis",
                    description: "Analyzing requirements and designing the core system architecture.",
                    status: "processing",
                    order_index: 0
                },
                {
                    project_id: projectId,
                    name: "UI/UX Design & Prototyping",
                    description: "Creating high-fidelity mockups and interactive prototypes.",
                    status: "pending",
                    order_index: 1
                },
                {
                    project_id: projectId,
                    name: "Core Development",
                    description: "Implementing backend logic, database structure, and frontend interfaces.",
                    status: "pending",
                    order_index: 2
                },
                {
                    project_id: projectId,
                    name: "Quality Assurance & Testing",
                    description: "Rigorous testing of all features, security audits, and performance tuning.",
                    status: "pending",
                    order_index: 3
                },
                {
                    project_id: projectId,
                    name: "Production Deployment",
                    description: "Deploying to live servers and final handover.",
                    status: "pending",
                    order_index: 4
                }
            ]

            await supabaseAdmin.from('project_phases').insert(defaultPhases)
        }

        // 3. Update Request Status
        const { error: requestError } = await supabaseAdmin
            .from('project_requests')
            .update({
                status: 'converted',
                client_id: userId
            })
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
