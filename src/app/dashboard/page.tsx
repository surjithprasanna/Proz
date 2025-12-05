"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, Clock, CheckCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock Data
const stats = [
    { title: "Total Requests", value: "3", icon: FileText, color: "text-blue-500" },
    { title: "In Progress", value: "1", icon: Clock, color: "text-yellow-500" },
    { title: "Completed", value: "0", icon: CheckCircle, color: "text-green-500" },
]

const recentRequests = [
    {
        id: "1",
        title: "E-Commerce Platform",
        status: "In Progress",
        date: "2023-10-25",
        amount: "$5,000",
    },
    {
        id: "2",
        title: "Portfolio Site",
        status: "Pending Review",
        date: "2023-10-28",
        amount: "$800",
    },
    {
        id: "3",
        title: "Mobile App MVP",
        status: "Pending Review",
        date: "2023-11-01",
        amount: "$12,000",
    },
]

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your project requests and status.</p>
                </div>
                <Button asChild>
                    <Link href="/request">
                        <Plus className="mr-2 h-4 w-4" /> New Request
                    </Link>
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Recent Requests */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentRequests.map((request) => (
                            <div
                                key={request.id}
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div className="space-y-1">
                                    <p className="font-medium leading-none">{request.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Submitted on {request.date}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="font-medium">{request.amount}</p>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${request.status === "In Progress"
                                                    ? "bg-yellow-500/10 text-yellow-500"
                                                    : "bg-blue-500/10 text-blue-500"
                                                }`}
                                        >
                                            {request.status}
                                        </span>
                                    </div>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/dashboard/requests/${request.id}`}>View</Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
