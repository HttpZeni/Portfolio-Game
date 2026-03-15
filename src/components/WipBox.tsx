import Box from "./Box"

type WipStatus = "IN DEV" | "PAUSED" | "SOON"

interface WipProject {
    name: string
    description: string
    tags: string[]
    status: WipStatus
}

const statusStyle: Record<WipStatus, { color: string; bg: string; border: string; glow?: string }> = {
    "IN DEV": {
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/40",
        glow: "0 0 8px rgba(74,222,128,0.3)",
    },
    "PAUSED": {
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/40",
    },
    "SOON": {
        color: "text-periwinkle-400",
        bg: "bg-periwinkle-400/10",
        border: "border-periwinkle-400/40",
    },
}

const wipProjects: WipProject[] = [
    {
        name: "Tower Defense Game",
        description: "I'm currently trying to build a TD game.",
        tags: ["C#", "Unity"],
        status: "IN DEV",
    },
]

function BlinkingDot({ status }: { status: WipStatus }) {
    if (status !== "IN DEV") return null
    return (
        <span className="relative flex h-2 w-2 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
    )
}

export default function WipBox() {
    return (
        <Box width={17} height={12}>
            <div className="w-full h-full flex flex-col gap-3 p-4 overflow-hidden">
                <div className="flex flex-row items-center gap-2">
                    <p className="text-gold-400 font-pixel text-sm">⚙</p>
                    <p className="text-ink-300 font-pixel text-sm">In Progress</p>
                </div>

                <div className="flex flex-col gap-3 overflow-y-auto">
                    {wipProjects.map((project) => {
                        const s = statusStyle[project.status]
                        return (
                            <div key={project.name} className="flex flex-col gap-1.5">
                                <div className="flex flex-row items-center gap-2 flex-wrap">
                                    <p className="text-ink-100 font-pixel text-xs">{project.name}</p>
                                </div>

                                {/* Description */}
                                <p className="text-ink-300 font-mono text-xs leading-relaxed line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-row gap-1.5 flex-wrap">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="font-mono text-xs text-gold-300 border border-gold-400/30 px-1.5 py-0.5 bg-gold-400/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Box>
    )
}
