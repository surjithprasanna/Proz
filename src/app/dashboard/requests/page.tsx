"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const allRequests = [
    {
        id: "1",
        title: "E-Commerce Platform",
        status: "In Progress",
        date: "2023-10-25",
        amount: "$5,000",
        description: "Full stack e-commerce solution with Stripe integration.",
    },
    {
        id: "2",
        title: "Portfolio Site",
        status: "Pending Review",
        date: "2023-10-28",
        amount: "$800",
        description: "Minimalist portfolio for a graphic designer.",
    },
    {
        id: "3",
        title: "Mobile App MVP",
        status: "Pending Review",
        date: "2023-11-01",
        amount: "$12,000",
        description: "Cross-platform mobile app for fitness tracking.",
    },
]

export default function RequestsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Requests</h1>
                <p className="text-muted-foreground">Manage and track your project requests.</p>
            </div>

            <div className="grid gap-4">
                {allRequests.map((request) => (
                    <Card key={request.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>{request.title}</CardTitle>
                                <Badge variant={request.status === "In Progress" ? "default" : "secondary"}>
                                    {request.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">{request.description}</p>
                            <div className="flex justify-between text-sm">
                                <span>Submitted: {request.date}</span>
                                <span className="font-semibold">{request.amount}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
