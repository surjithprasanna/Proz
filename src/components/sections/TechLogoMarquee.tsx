"use client"

import { motion } from "framer-motion"
import {
    type LucideIcon,
    Code2,
    Blocks,
    Wind,
    Database,
    Layers,
    Cloud,
    Container,
    GitBranch,
    Palette,
    CreditCard,
    Binary,
    Brain
} from "lucide-react"

type TechLogo = {
    id: string
    name: string
    IconComponent: LucideIcon | React.FC<{ className?: string }>
    brandColor: string
}

interface TechLogoMarqueeProps {
    technologies?: TechLogo[]
}

// Custom SVG Icons for specific brands
const ReactIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
    </svg>
)

const NextJsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.5 0C5.15 0 0 5.15 0 11.5S5.15 23 11.5 23 23 17.85 23 11.5 17.85 0 11.5 0zm5.88 16.3l-3.22-4.68v4.68h-2.5V6.7h2.5v4.35l3.1-4.35h2.9l-3.65 4.95 3.87 5.65h-3z" />
    </svg>
)

const TypeScriptIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <rect width="20" height="20" x="2" y="2" rx="2" />
        <text x="12" y="16" fontSize="12" fill="#fff" textAnchor="middle" fontWeight="bold">TS</text>
    </svg>
)

const NodeJsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22h-.96c-.12 0-.22.1-.22.22v8.06c0 .62-.64 1.24-1.67.72l-2.04-1.18a.11.11 0 01-.06-.09V7.41c0-.04.02-.07.06-.09l7.44-4.3a.11.11 0 01.12 0l7.44 4.3c.04.02.06.05.06.09v8.58c0 .04-.02.07-.06.09l-7.44 4.3a.11.11 0 01-.12 0l-1.89-1.12c-.04-.02-.09-.03-.13 0-.36.2-.43.23-.76.33-.09.03-.21.07.05.2l2.46 1.46c.24.14.51.2.78.2s.54-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.41c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2z" />
    </svg>
)

const defaultTechnologies: TechLogo[] = [
    { id: "react", name: "React", IconComponent: ReactIcon, brandColor: "#61DAFB" },
    { id: "nextjs", name: "Next.js", IconComponent: NextJsIcon, brandColor: "#FFFFFF" },
    { id: "typescript", name: "TypeScript", IconComponent: TypeScriptIcon, brandColor: "#3178C6" },
    { id: "tailwind", name: "Tailwind CSS", IconComponent: Wind, brandColor: "#06B6D4" },
    { id: "nodejs", name: "Node.js", IconComponent: NodeJsIcon, brandColor: "#339933" },
    { id: "python", name: "Python", IconComponent: Code2, brandColor: "#3776AB" },
    { id: "go", name: "Go", IconComponent: Blocks, brandColor: "#00ADD8" },
    { id: "postgresql", name: "PostgreSQL", IconComponent: Database, brandColor: "#4169E1" },
    { id: "mongodb", name: "MongoDB", IconComponent: Layers, brandColor: "#47A248" },
    { id: "aws", name: "AWS", IconComponent: Cloud, brandColor: "#FF9900" },
    { id: "azure", name: "Azure", IconComponent: Cloud, brandColor: "#0078D4" },
    { id: "vercel", name: "Vercel", IconComponent: GitBranch, brandColor: "#FFFFFF" },
    { id: "docker", name: "Docker", IconComponent: Container, brandColor: "#2496ED" },
    { id: "kubernetes", name: "Kubernetes", IconComponent: Container, brandColor: "#326CE5" },
    { id: "tensorflow", name: "TensorFlow", IconComponent: Brain, brandColor: "#FF6F00" },
    { id: "openai", name: "OpenAI", IconComponent: Binary, brandColor: "#10A37F" },
    { id: "langchain", name: "Langchain", IconComponent: Blocks, brandColor: "#10A37F" },
    { id: "stripe", name: "Stripe", IconComponent: CreditCard, brandColor: "#635BFF" },
    { id: "figma", name: "Figma", IconComponent: Palette, brandColor: "#F24E1E" },
    { id: "github", name: "GitHub", IconComponent: GitBranch, brandColor: "#FFFFFF" },
]

// Individual Tile Component
interface TechLogoTileProps {
    tech: TechLogo
    rowKey: string
}

function TechLogoTile({ tech, rowKey }: TechLogoTileProps) {
    const Icon = tech.IconComponent

    return (
        <div
            key={`${rowKey}-${tech.id}`}
            className="relative flex-shrink-0 flex items-center gap-4 px-8 py-4 group cursor-default transition-all duration-300"
        >
            {/* Hover Glow Background */}
            <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{
                    background: `radial-gradient(circle at center, ${tech.brandColor}15 0%, transparent 70%)`,
                }}
            />

            {/* Brand Logo Icon */}
            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                <Icon
                    className="w-8 h-8"
                    style={{
                        color: tech.brandColor,
                        filter: `drop-shadow(0 0 2px ${tech.brandColor}40)`
                    }}
                />
            </div>

            {/* Brand Name */}
            <div className="relative z-10 text-base font-medium text-muted-foreground/80 group-hover:text-foreground transition-colors duration-300">
                {tech.name}
            </div>
        </div>
    )
}

export function TechLogoMarquee({ technologies = defaultTechnologies }: TechLogoMarqueeProps) {
    // Duplicate for seamless infinite scroll
    const allTechs = [...technologies, ...technologies]

    return (
        <div className="relative overflow-hidden mb-20">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

            {/* First Row - Left to Right */}
            <div className="relative mb-8">
                <motion.div
                    className="flex items-center"
                    animate={{
                        x: [0, -1920],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear",
                        },
                    }}
                >
                    {allTechs.map((tech, index) => (
                        <TechLogoTile key={`row1-${index}`} tech={tech} rowKey="row1" />
                    ))}
                </motion.div>
            </div>

            {/* Second Row - Right to Left (Slower) */}
            <div className="relative">
                <motion.div
                    className="flex items-center"
                    animate={{
                        x: [-1920, 0],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 45,
                            ease: "linear",
                        },
                    }}
                >
                    {[...allTechs].reverse().map((tech, index) => (
                        <TechLogoTile key={`row2-${index}`} tech={tech} rowKey="row2" />
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
