import { use, useEffect, useState } from "react"
import Box from "./Box"
import Button from "./Button"
import { skills } from "../data"
import { fetchDcData, type DiscordPresenceData } from "../data/api"
import { useFadeIn } from "../assets/hooks/useFadeIn"
import { loadScore, saveScore } from "../data/localstorageData"
import { DiscordStatus } from "../data/api"
import WipBox from "./WipBox"

function resolveImage(src?: string): string | null {
    if (!src) return null
    if (src.startsWith("mp:external/")) {
        const decoded = decodeURIComponent(src.split("/https/")[1] ?? "")
        return decoded ? "https://" + decoded : null
    }
    return null
}

const typeLabel: Record<number, string> = {
    0: "Playing",
    2: "Listening to",
    3: "Watching",
    5: "Competing in",
}

export let userStatus: DiscordStatus = "loading";

export default function Bento() {
    const [typedCommit, setTypedCommit] = useState("")
    const { ref, visible } = useFadeIn(0.1)
    const [clicked, setClicked] = useState(loadScore())
    const [data, setData] = useState<DiscordPresenceData | null>(null)
    const [commit, setCommit] = useState<{ message: string; repo: string; date: string } | null>(null)
    const [ghStats, setGhStats] = useState<{ repos: number; followers: number } | null>(null)

    const activity = data?.activities[1]
    const img = resolveImage(activity?.assets?.large_image)

    useEffect(() => {
        async function call() {
            const response = await fetchDcData()
            setData(response.data)
        }
        call()
        const interval = setInterval(call, 4000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (!commit) return
        setTypedCommit("")
        let i = 0
        const interval = setInterval(() => {
            i++
            setTypedCommit(commit.message.slice(0, i))
            if (i >= commit.message.length) clearInterval(interval)
        }, 30)
        return () => clearInterval(interval)
    }, [commit])

    useEffect(() => {
        fetch("https://api.github.com/repos/HttpZeni/Portfolio-Game/commits?per_page=1", {
            headers: { "Accept": "application/vnd.github+json" }
        })
            .then(r => r.json())
            .then(data => {
                const c = data[0]
                if (c) setCommit({
                    message: c.commit.message,
                    repo: "Portfolio-Game",
                    date: new Date(c.commit.author.date).toLocaleDateString("de-DE"),
                })
            })
    }, [])

    useEffect(() => {
        fetch("https://api.github.com/users/HttpZeni")
            .then(r => r.json())
            .then(d => setGhStats({ repos: d.public_repos, followers: d.followers }))
    }, [])

    useEffect(() => {
        const tick = () => {
            const el = document.getElementById("clock-box")
            if (el) el.textContent = new Date().toLocaleTimeString("de-DE", { timeZone: "Europe/Berlin", hour12: false })
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        const status = data?.discord_status;
        if (status == undefined) return;
        userStatus = status;
    }, [data])

    return (
        <div ref={ref}
            className="flex flex-col gap-5 mt-44"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
            }}>

            {/* Row 1 */}
            <div className="w-full flex flex-col md:flex-row gap-5">

                {/* Skills */}
                <Box width={17}>
                    <div className="w-full h-full flex flex-col gap-3 p-4">
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-gold-400 font-pixel text-sm">◈</p>
                            <p className="text-ink-300 font-pixel text-sm">Skills</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {Object.entries(skills).map(([category, items]) => (
                                <div key={category} className="flex flex-col gap-1.5">
                                    <p className="text-ink-300 font-mono text-sm">▸ {category}</p>
                                    <div className="flex flex-row gap-1.5 flex-wrap">
                                        {items.map((skill) => (
                                            <span key={skill} className="font-mono text-sm text-gold-300 border border-gold-400/30 px-2 py-0.5 bg-gold-400/10">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Box>

                {/* Activity */}
                <Box width={17}>
                    <div className="w-full h-full flex flex-col justify-between p-4">
                        <div className="flex flex-row items-center justify-between w-full">
                            <div className="flex flex-row items-center gap-2">
                                <p className="text-gold-400 font-pixel text-sm">▶</p>
                                <p className="text-ink-300 font-pixel text-sm">
                                    {data?.listening_to_spotify ? "Listening to"
                                        : activity ? (typeLabel[activity.type] ?? "Activity")
                                            : "Activity"}
                                </p>
                            </div>
                            <div className="w-2 h-2 rounded-full" style={{
                                backgroundColor:
                                    data?.discord_status === "online" ? "#4ade80" :
                                        data?.discord_status === "idle" ? "#facc15" :
                                            data?.discord_status === "dnd" ? "#f87171" : "#6b7280",
                                boxShadow:
                                    data?.discord_status === "online" ? "0 0 6px #4ade80aa" :
                                        data?.discord_status === "idle" ? "0 0 6px #facc15aa" : "none",
                            }} />
                        </div>

                        {!data ? (
                            <p className="text-ink-300 font-mono text-sm">connecting...</p>
                        ) : data.listening_to_spotify && data.spotify ? (
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-row gap-3 items-center">
                                    <img src={data.spotify.album_art_url} alt="" className="w-12 h-12 object-cover shrink-0 border border-base-600" />
                                    <div className="flex flex-col gap-0.5 overflow-hidden">
                                        <p className="text-ink-100 font-pixel text-sm truncate">{data.spotify.song}</p>
                                        <p className="text-ink-300 font-mono text-sm truncate">{data.spotify.artist}</p>
                                        <p className="text-base-500 font-mono text-sm truncate">{data.spotify.album}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="w-full h-1 bg-base-600">
                                        <div className="h-full bg-gold-400 transition-all duration-1000" style={{ width: `${Math.min(100, ((Date.now() - data.spotify.timestamps.start) / (data.spotify.timestamps.end - data.spotify.timestamps.start)) * 100)}%` }} />
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <span className="text-base-500 font-mono text-sm">{(() => { const s = Math.floor((Date.now() - data.spotify.timestamps.start) / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` })()}</span>
                                        <span className="text-base-500 font-mono text-sm">{(() => { const s = Math.floor((data.spotify.timestamps.end - data.spotify.timestamps.start) / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` })()}</span>
                                    </div>
                                </div>
                            </div>
                        ) : !activity ? (
                            <p className="text-ink-300 font-mono text-sm">— nothing right now</p>
                        ) : activity.type === 3 ? (
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-row gap-3 items-start">
                                    {img && <img src={img} alt="" className="w-12 h-16 object-cover shrink-0 border border-base-600" />}
                                    <div className="flex flex-col gap-1 overflow-hidden">
                                        <p className="text-ink-100 font-pixel text-sm truncate">{activity.details}</p>
                                        <p className="text-ink-300 font-mono text-sm truncate">{activity.assets?.large_text}</p>
                                        <p className="text-base-500 font-mono text-sm truncate">{activity.state}</p>
                                        <div className="flex flex-row items-center gap-2 mt-1">
                                            {resolveImage(activity.assets?.small_image) && (
                                                <img src={resolveImage(activity.assets?.small_image)!} alt="" className="w-3 h-3 object-contain opacity-60" />
                                            )}
                                            <p className="text-base-500 font-mono text-sm">{activity.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-row gap-3 items-center">
                                {img && <img src={img} alt="" className="w-12 h-12 object-cover shrink-0 border border-base-600" />}
                                <div className="flex flex-col gap-0.5 overflow-hidden">
                                    <p className="text-ink-100 font-pixel text-sm truncate">{activity.name}</p>
                                    {activity.details && <p className="text-ink-300 font-mono text-sm truncate">{activity.details}</p>}
                                    {activity.state && <p className="text-base-500 font-mono text-sm truncate">{activity.state}</p>}
                                </div>
                            </div>
                        )}
                    </div>
                </Box>

                {/* Let's Connect */}
                <Box width={17}>
                    <div className="w-full h-full flex flex-col justify-between p-4">
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-gold-400 font-pixel text-sm">✦</p>
                            <p className="text-ink-300 font-pixel text-sm">Let's Connect</p>
                        </div>
                        <p className="text-ink-300 font-mono text-sm leading-relaxed">
                            Open to any kind of <span className="text-periwinkle-400">project</span> or <span className="text-periwinkle-400">collaboration</span>.
                        </p>
                        <div className="flex flex-col gap-2">
                            <a href="https://github.com/HttpZeni" target="_blank" rel="noreferrer" className="flex flex-row items-center gap-2 text-ink-300 font-mono text-sm hover:text-gold-300 transition-colors duration-200">
                                <span className="text-gold-400">→</span> GitHub
                            </a>
                            <a href="https://discord.gg/paK7bUHGQP" target="_blank" rel="noreferrer" className="flex flex-row items-center gap-2 text-ink-300 font-mono text-sm hover:text-gold-300 transition-colors duration-200">
                                <span className="text-gold-400">→</span> Discord
                            </a>
                            <a href="mailto:lazyzeni1337@gmail.com" className="flex flex-row items-center gap-2 text-ink-300 font-mono text-sm hover:text-gold-300 transition-colors duration-200">
                                <span className="text-gold-400">→</span> Email
                            </a>
                        </div>
                    </div>
                </Box>

                {/* Click Counter */}
                <Box width={17}>
                    <div className="w-full h-full flex flex-col justify-between p-4">
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-gold-400 font-pixel text-sm">★</p>
                            <p className="text-ink-300 font-pixel text-sm">Score</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <p
                                key={clicked}
                                className="text-gold-400 font-pixel leading-none"
                                style={{ fontSize: "2.5rem", textShadow: "0 0 20px rgba(200,149,42,0.5)" }}
                            >
                                {String(clicked).padStart(4, "0")}
                            </p>
                            <p className="text-ink-300 font-mono text-sm">clicks</p>
                        </div>
                        <Button
                            onClick={() => setClicked((prev) => {
                                const next = prev + 1;
                                saveScore(next);
                                return next;
                            })}
                            text="► CLICK ME"
                            className="w-full flex justify-center items-center text-sm"
                        />
                    </div>
                </Box>

            </div>

            {/* Row 2 */}
            <div className="w-full flex flex-col md:flex-row gap-5">

                {/* Latest Commit */}
                <Box width={17}>
                    <div className="w-full h-full flex flex-col justify-between p-4">
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-gold-400 font-pixel text-sm">★</p>
                            <p className="text-ink-300 font-pixel text-sm">Latest Commit</p>
                        </div>
                        <div className="flex flex-col gap-2 overflow-hidden">
                            <p className="text-periwinkle-400 font-mono text-sm truncate">{commit?.repo ?? "—"}</p>
                            <p className="text-ink-100 font-mono text-sm line-clamp-2 leading-relaxed">
                                {typedCommit || "loading..."}
                            </p>
                        </div>
                        <p className="text-base-500 font-mono text-sm">{commit?.date ?? ""}</p>
                    </div>
                </Box>

                {/* GitHub Stats */}
                <Box width={17}>
                    <div className="w-full h-full flex flex-col justify-between p-4">
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-gold-400 font-pixel text-sm">⌥</p>
                            <p className="text-ink-300 font-pixel text-sm">GitHub</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-0.5">
                                <p className="text-gold-400 font-pixel text-2xl">{ghStats?.repos ?? "—"}</p>
                                <p className="text-ink-300 font-mono text-sm">public repos</p>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <p className="text-gold-400 font-pixel text-2xl">{ghStats?.followers ?? "—"}</p>
                                <p className="text-ink-300 font-mono text-sm">followers</p>
                            </div>
                        </div>
                        <a href="https://github.com/HttpZeni" target="_blank" rel="noreferrer" className="text-ink-300 font-mono text-sm hover:text-gold-300 transition-colors duration-200">
                            → HttpZeni
                        </a>
                    </div>
                </Box>

                {/* Based In */}
                <Box width={17}>
                    <div className="w-full h-full flex flex-col justify-between p-4">
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-gold-400 font-pixel text-sm">◎</p>
                            <p className="text-ink-300 font-pixel text-sm">Based In</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-ink-100 font-pixel text-sm">Bavaria, DE</p>
                            <p className="text-ink-300 font-mono text-sm">UTC+1 · CET</p>
                        </div>
                        <p className="text-gold-400 font-mono text-sm" id="clock-box">--:--:--</p>
                    </div>
                </Box>
                <WipBox />
            </div>
        </div>
    )
}