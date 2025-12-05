"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontal, Check, X } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock Data
const requests = [
    {
        id: "REQ-001",
        client: "Alice Johnson",
        project: "E-Commerce Platform",
        status: "Pending",
        date: "2023-10-25",
        budget: "$5k - $10k",
    },
    {
        id: "REQ-002",
        client: "TechStart Inc.",
        project: "SaaS MVP",
        status: "Approved",
        date: "2023-10-24",
        budget: "$10k+",
    },
    {
        id: "REQ-003",
        client: "Bob Smith",
        project: "Portfolio Site",
        status: "Rejected",
        date: "2023-10-23",
        budget: "< $1k",
    },
]

export default function AdminRequestsPage() {
    const [data, setData] = useState(requests)

    const handleStatusChange = (id: string, newStatus: string) => {
        setData(data.map(req => req.id === id ? { ...req, status: newStatus } : req))
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Project Requests</h1>
                    <p className="text-muted-foreground">Manage incoming project proposals.</p>
                </div>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell className="font-medium">{request.id}</TableCell>
                                <TableCell>{request.client}</TableCell>
                                <TableCell>{request.project}</TableCell>
                                <TableCell>{request.budget}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            request.status === "Approved"
                                                ? "default"
                                                : request.status === "Rejected"
                                                    ? "destructive"
                                                    : "secondary"
                                        }
                                    >
                                        {request.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(request.id)}>
                                                Copy ID
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleStatusChange(request.id, "Approved")}>
                                                <Check className="mr-2 h-4 w-4" /> Approve
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusChange(request.id, "Rejected")}>
                                                <X className="mr-2 h-4 w-4" /> Reject
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
