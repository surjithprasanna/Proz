import { z } from "zod"

export const projectRequestSchema = z.object({
    // Step 1: Contact & Org
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    organizationType: z.enum(["student", "startup", "business", "enterprise"], {
        required_error: "Please select an organization type",
    }),

    // Step 2: Project Details
    projectField: z.string().min(1, "Please select a field"),
    features: z.array(z.string()).min(1, "Select at least one feature"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    platform: z.enum(["web", "mobile", "both"], {
        required_error: "Please select a platform",
    }),

    // Step 3: Logistics
    budgetRange: z.string().min(1, "Please select a budget range"),
    deadline: z.string().min(1, "Please select a deadline"),
    ndaRequired: z.boolean().default(false),
    fileUrl: z.string().optional(), // URL from Supabase storage
})

export type ProjectRequestValues = z.infer<typeof projectRequestSchema>
