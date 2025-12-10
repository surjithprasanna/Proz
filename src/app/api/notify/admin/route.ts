import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { type, data } = body

        console.log(`[NOTIFICATION] Sending to Formspree for ${type}`)

        const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || process.env.FORMSPREE_ID

        if (!FORMSPREE_ID) {
            console.warn("FORMSPREE_ID is missing. Email will not be sent.")
            return NextResponse.json({ success: false, error: "Missing Formspree ID" })
        }

        // Send to Formspree
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subject: `New Project Request: ${data.projectName || 'Untitled'}`,
                ...data // Send all form data
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error("Formspree Error:", errorText)
            throw new Error(`Formspree failed: ${response.statusText}`)
        }

        return NextResponse.json({ success: true, message: "Formspree notified" })

    } catch (error: any) {
        console.error("Notification Error:", error)
        return NextResponse.json({ error: error.message || "Failed to notify" }, { status: 500 })
    }
}
