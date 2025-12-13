import { Zap, Eye, Shield, Sparkles, PanelsTopLeft, ChartColumn, ArrowRight, CheckCircle, Clock, Loader2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardFlowMapProps {
    request: any
    phases?: any[]
}

export function DashboardFlowMap({ request, phases = [] }: DashboardFlowMapProps) {
    if (!request) return null

    // Determine current step based on status
    let currentStep = 1
    if (request.status === 'converted' || request.status === 'in_progress') currentStep = 2
    if (request.status === 'completed') currentStep = 3

    // Determine status colors/text
    const isProposalReady = request.proposal_status === 'proposal_ready'
    const isConverted = request.status === 'converted'

    return (
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
                {phases.length > 0 ? (
                    // Render Dynamic Phases
                    phases.map((phase, index) => {
                        const isProcessing = phase.status === 'processing'
                        const isCompleted = phase.status === 'completed'

                        return (
                            <div
                                key={phase.id}
                                className={cn(
                                    "group p-5 rounded-xl border transition-all duration-300 cursor-default relative overflow-hidden",
                                    isProcessing ? "bg-black/40 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]" :
                                        isCompleted ? "bg-blue-500/5 border-blue-500/10" :
                                            "bg-transparent border-transparent opacity-50"
                                )}
                            >
                                {isProcessing && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                                <div className="flex items-start gap-4 pl-2">
                                    <div className={cn(
                                        "p-3 rounded-xl transition-colors duration-300",
                                        isProcessing || isCompleted ? "bg-blue-500/10" : "bg-white/5"
                                    )}>
                                        {isCompleted ? (
                                            <CheckCircle className="w-6 h-6 text-blue-500" />
                                        ) : isProcessing ? (
                                            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                                        ) : (
                                            <Circle className="w-6 h-6 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className={cn(
                                            "text-lg font-semibold mb-1 transition-colors duration-300",
                                            isProcessing || isCompleted ? "text-foreground" : "text-muted-foreground"
                                        )}>
                                            {phase.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {phase.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    // Fallback Static Steps (if no phases)
                    <>
                        {/* Step 1: Request & Plan */}
                        <div className={`group p-5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${currentStep === 1 ? 'bg-black/40 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'bg-transparent border-transparent opacity-50'}`}>
                            {currentStep === 1 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                            <div className="flex items-start gap-4 pl-2">
                                <div className={`p-3 rounded-xl transition-colors duration-300 ${currentStep === 1 ? 'bg-blue-500/10' : 'bg-white/5'}`}>
                                    <Zap className={`w-6 h-6 transition-colors duration-300 ${currentStep === 1 ? 'text-blue-500' : 'text-muted-foreground'}`} />
                                </div>
                                <div>
                                    <h3 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${currentStep === 1 ? 'text-foreground' : 'text-muted-foreground'}`}>1. Request &amp; Plan</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {isProposalReady ? "Proposal Ready! Review below." : "Analyzing your vision..."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Track Progress */}
                        <div className={`group p-5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${currentStep === 2 ? 'bg-black/40 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'bg-transparent border-transparent'}`}>
                            {currentStep === 2 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                            <div className="flex items-start gap-4 pl-2">
                                <div className={`p-3 rounded-xl transition-colors duration-300 ${currentStep === 2 ? 'bg-blue-500/10' : 'bg-white/5'}`}>
                                    <Eye className={`w-6 h-6 transition-colors duration-300 ${currentStep === 2 ? 'text-blue-500' : 'text-muted-foreground'}`} />
                                </div>
                                <div>
                                    <h3 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${currentStep === 2 ? 'text-foreground' : 'text-muted-foreground'}`}>2. Track Progress</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {currentStep === 2 ? "Project is active. Tracking milestones." : "Pending launch."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Verify & Launch */}
                        <div className={`group p-5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${currentStep === 3 ? 'bg-black/40 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'bg-transparent border-transparent'}`}>
                            {currentStep === 3 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                            <div className="flex items-start gap-4 pl-2">
                                <div className={`p-3 rounded-xl transition-colors duration-300 ${currentStep === 3 ? 'bg-blue-500/10' : 'bg-white/5'}`}>
                                    <Shield className={`w-6 h-6 transition-colors duration-300 ${currentStep === 3 ? 'text-blue-500' : 'text-muted-foreground'}`} />
                                </div>
                                <div>
                                    <h3 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${currentStep === 3 ? 'text-foreground' : 'text-muted-foreground'}`}>3. Verify &amp; Launch</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">Final validation and deployment.</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Right Side: Dynamic Analysis Card */}
            <div className="relative h-[450px] w-full">
                <div className="absolute inset-0 rounded-2xl border backdrop-blur-xl transition-all duration-500 overflow-hidden bg-black/40 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                    <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                        <div className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-white/5 transition-colors duration-500 text-blue-500">
                            {isProposalReady ? "Analysis Complete" : "Analysis Mode"}
                        </div>
                    </div>
                    <div className="p-6 h-[calc(100%-3rem)]">
                        <div className="h-full">
                            <div className="flex flex-col h-full gap-4">
                                {/* User Request Bubble */}
                                <div className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <div className="bg-blue-500/10 rounded-2xl rounded-tl-none p-4 text-sm text-blue-100 max-w-[85%]">
                                        I need a {request.project_field} project.
                                        {request.budget_range && <span className="block mt-1 text-xs opacity-70">Budget: {request.budget_range}</span>}
                                    </div>
                                </div>

                                {/* AI Response / Status */}
                                <div className="flex-1 space-y-3 mt-2">
                                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider ml-1">
                                        {isProposalReady ? "System Generated Plan" : "AI Analysis in progress..."}
                                    </div>

                                    {/* Feature 1: Plan */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                                        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                            <PanelsTopLeft className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">Proposed Plan</div>
                                            <div className="text-xs text-white/50">{request.proposal_plan || "Calculating..."}</div>
                                        </div>
                                        {request.proposal_plan && <CheckCircle className="w-4 h-4 text-indigo-500 ml-auto" />}
                                    </div>

                                    {/* Feature 2: Price */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                            <ChartColumn className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">Estimated Cost</div>
                                            <div className="text-xs text-white/50">{request.proposal_price || "Calculating..."}</div>
                                        </div>
                                        {request.proposal_price && <CheckCircle className="w-4 h-4 text-blue-500 ml-auto" />}
                                    </div>

                                    {/* Timeline */}
                                    <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-xl p-3 flex items-center justify-between">
                                        <span className="text-sm font-medium text-blue-200">
                                            {request.deadline ? `Target: ${request.deadline}` : "Estimating Timeline..."}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-blue-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
