"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8 p-8">
            <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Project Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">View incoming requests and convert them to active projects.</p>
                        <Button asChild>
                            <Link href="/admin/requests">
                                Manage Requests <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Active Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Update status and progress for ongoing client projects.</p>
                        <Button asChild variant="outline">
                            <Link href="/admin/projects">
                                Manage Projects <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
