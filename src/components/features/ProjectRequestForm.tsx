"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Upload, CheckCircle2 } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { projectRequestSchema, type ProjectRequestValues } from "@/lib/schemas/projectRequest"
import { createClient } from "@/lib/supabase/client"

const steps = [
    { id: 1, title: "Contact & Organization" },
    { id: 2, title: "Project Details" },
    { id: 3, title: "Logistics & Review" },
]

export function ProjectRequestForm() {
    const [step, setStep] = React.useState(1)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)
    const supabase = createClient()

    const form = useForm<ProjectRequestValues>({
        resolver: zodResolver(projectRequestSchema),
        defaultValues: {
            organizationType: "startup",
            features: [],
            platform: "web",
            ndaRequired: false,
        },
        mode: "onChange",
    })

    const {
        register,
        handleSubmit,
        trigger,
        setValue,
        watch,
        formState: { errors, isValid },
    } = form

    const nextStep = async () => {
        let fieldsToValidate: (keyof ProjectRequestValues)[] = []
        if (step === 1) fieldsToValidate = ["fullName", "email", "organizationType"]
        if (step === 2) fieldsToValidate = ["projectField", "description", "platform"]

        const isStepValid = await trigger(fieldsToValidate)
        if (isStepValid) setStep((s) => s + 1)
    }

    const prevStep = () => setStep((s) => s - 1)

    const onSubmit = async (data: ProjectRequestValues) => {
        setIsSubmitting(true)
        try {
            // TODO: Upload file if present
            // TODO: Insert into Supabase
            console.log("Form Data:", data)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            setIsSuccess(true)
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <Card className="w-full max-w-2xl mx-auto text-center py-12">
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                        <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold">Request Received!</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Thank you for submitting your project request. Our team will review it and get back to you within 24 hours.
                    </p>
                    <Button onClick={() => window.location.href = "/"}>Return Home</Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-2">
                    {steps.map((s) => (
                        <span
                            key={s.id}
                            className={`text-sm font-medium ${step >= s.id ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            {s.title}
                        </span>
                    ))}
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / steps.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            <Card>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>{steps[step - 1].title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 min-h-[300px]">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName">Full Name</Label>
                                            <Input id="fullName" {...register("fullName")} placeholder="John Doe" />
                                            {errors.fullName && (
                                                <p className="text-xs text-destructive">{errors.fullName.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" {...register("email")} placeholder="john@example.com" />
                                            {errors.email && (
                                                <p className="text-xs text-destructive">{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone (Optional)</Label>
                                        <Input id="phone" {...register("phone")} placeholder="+1 (555) 000-0000" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Organization Type</Label>
                                        <RadioGroup
                                            onValueChange={(val) => setValue("organizationType", val as any)}
                                            defaultValue={watch("organizationType")}
                                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                                        >
                                            {["student", "startup", "business", "enterprise"].map((type) => (
                                                <div key={type}>
                                                    <RadioGroupItem value={type} id={type} className="peer sr-only" />
                                                    <Label
                                                        htmlFor={type}
                                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer capitalize"
                                                    >
                                                        {type}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label>Project Field</Label>
                                        <Select onValueChange={(val) => setValue("projectField", val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a field" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="web-dev">Web Development</SelectItem>
                                                <SelectItem value="mobile-app">Mobile Application</SelectItem>
                                                <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                                                <SelectItem value="saas">SaaS Product</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.projectField && (
                                            <p className="text-xs text-destructive">{errors.projectField.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Platform</Label>
                                        <RadioGroup
                                            onValueChange={(val) => setValue("platform", val as any)}
                                            defaultValue={watch("platform")}
                                            className="flex gap-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="web" id="web" />
                                                <Label htmlFor="web">Web</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="mobile" id="mobile" />
                                                <Label htmlFor="mobile">Mobile</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="both" id="both" />
                                                <Label htmlFor="both">Both</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Project Description</Label>
                                        <Textarea
                                            id="description"
                                            {...register("description")}
                                            placeholder="Describe your project idea, core features, and goals..."
                                            className="h-32"
                                        />
                                        {errors.description && (
                                            <p className="text-xs text-destructive">{errors.description.message}</p>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Budget Range</Label>
                                            <Select onValueChange={(val) => setValue("budgetRange", val)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select budget" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="<1k">Less than $1,000</SelectItem>
                                                    <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                                                    <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                                                    <SelectItem value="10k+">$10,000+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.budgetRange && (
                                                <p className="text-xs text-destructive">{errors.budgetRange.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Deadline</Label>
                                            <Select onValueChange={(val) => setValue("deadline", val)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select timeline" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1-month">Within 1 month</SelectItem>
                                                    <SelectItem value="1-3-months">1-3 months</SelectItem>
                                                    <SelectItem value="3-6-months">3-6 months</SelectItem>
                                                    <SelectItem value="flexible">Flexible</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.deadline && (
                                                <p className="text-xs text-destructive">{errors.deadline.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Attachments (Optional)</Label>
                                        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                                            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                            <p className="text-sm text-muted-foreground">
                                                Click to upload or drag and drop files
                                            </p>
                                            <input type="file" className="hidden" />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="nda"
                                            onCheckedChange={(checked) => setValue("ndaRequired", checked as boolean)}
                                        />
                                        <Label htmlFor="nda" className="text-sm font-normal">
                                            I require an NDA (Non-Disclosure Agreement) for this project
                                        </Label>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {step > 1 ? (
                            <Button type="button" variant="outline" onClick={prevStep}>
                                Back
                            </Button>
                        ) : (
                            <div />
                        )}

                        {step < 3 ? (
                            <Button type="button" onClick={nextStep}>
                                Next Step
                            </Button>
                        ) : (
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Submit Request
                            </Button>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
