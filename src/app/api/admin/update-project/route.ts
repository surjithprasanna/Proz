import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
    try {
        const { id, status, progress } = await request.json()
        const supabase = createAdminClient()

        const { error } = await supabase
            .from('projects')
            .update({ status, progress })
            .eq('id', id)

        if (error) throw error
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
