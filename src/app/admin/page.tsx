"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, DollarSign, TrendingUp } from "lucide-react"

const adminStats = [
    { title: "Total Revenue", value: "$45,231", icon: DollarSign, change: "+20.1% from last month" },
    { title: "Active Projects", value: "12", icon: FileText, change: "+4 since last week" },
    { title: "New Clients", value: "24", icon: Users, change: "+12% from last month" },
    { title: "Conversion Rate", value: "3.2%", icon: TrendingUp, change: "+1.1% from last month" },
]

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {adminStats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Chart placeholder (Revenue over time)</p>
                        <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md mt-4">
                            Chart Area
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                    <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$1,999.00</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Jackson Lee</p>
                                    <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$39.00</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
