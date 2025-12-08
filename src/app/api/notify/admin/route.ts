import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { type, data } = body

        // Admin Contact Details
        const ADMIN_EMAIL = "kannansin784yg0@gmail.com"
        const ADMIN_PHONE = "9361490331"

        console.log("----------------------------------------")
        console.log(`[NOTIFICATION TRIGGERED] Type: ${type}`)
        console.log(`To Admin Email: ${ADMIN_EMAIL}`)
        console.log(`To Admin WhatsApp: ${ADMIN_PHONE}`)
        console.log("Payload:", JSON.stringify(data, null, 2))
        console.log("----------------------------------------")

        // In a real production app, you would use:
        // 1. Resend/SendGrid for Email
        // 2. Twilio/Meta API for WhatsApp

        // For now, we log success to simulate the trigger
        return NextResponse.json({ success: true, message: "Admin notified" })

    } catch (error) {
        console.error("Notification Error:", error)
        return NextResponse.json({ error: "Failed to notify" }, { status: 500 })
    }
}
