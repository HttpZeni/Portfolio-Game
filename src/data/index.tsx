import { pac1, pac2, pac3 } from "../assets";

export const starterText: React.ReactNode = (
    <p className="text-ink-300 text-xl font-mono">I'm a <span className="text-periwinkle-400">hobby game developer</span> who enjoys <span className="text-periwinkle-400">building small projects</span>.
        Most of my projects are <span className="text-periwinkle-400">recreations of existing games</span> that I use to understand how different <span className="text-periwinkle-400">mechanics</span> work.
        I'm still learning and improving, but I enjoy <span className="text-periwinkle-400">solving problems</span> and understanding how games work.
    </p>
);

export const links: Record<string, string> = {
    "GitHub": "https://github.com/HttpZeni",
    "Discord": "https://discord.gg/paK7bUHGQP",
    "Email": "lazyzeni1337@gmail.com",
}

export interface ProjectProps {
    name: string,
    description: string
    short_description: string
    screenshots: string[] | null
    tags: string[]
    play_link: string | null
}

export const projects: Record<string, ProjectProps> = {
    "Pac-Man": {
        name: "Pac-Man",
        description: "I tried to recreate Pac-Man in Unity and focused mostly on the systems. The game runs on a 23×22 tile based grid.Pac-Man has grid movement with input buffering, instant reverse movement, and tile centering. All four ghosts use BFS pathfinding, which was the hardest part for me.Each ghost also has its own chase behavior, along with Scatter and Frightened states. The game also includes a wave system with dynamically increasing difficulty, fruit spawning based on score, 3 lives, highscore saving, audio, and full keyboard and gamepad support",
        short_description: "A Pac-Man recreation I built in Unity with ghost AI and BFS pathfinding.",
        screenshots: [pac1, pac2, pac3],
        tags: ["C#", "Unity"],
        play_link: "https://httpzeni.itch.io/pac-man"
    },
}

export const featuredProjects: Record<string, ProjectProps> = {
    "Pac-Man": {
        name: "Pac-Man",
        description: "I tried to recreate Pac-Man in Unity and focused mostly on the systems. The game runs on a 23×22 tile based grid.Pac-Man has grid movement with input buffering, instant reverse movement, and tile centering. All four ghosts use BFS pathfinding, which was the hardest part for me.Each ghost also has its own chase behavior, along with Scatter and Frightened states. The game also includes a wave system with dynamically increasing difficulty, fruit spawning based on score, 3 lives, highscore saving, audio, and full keyboard and gamepad support",
        short_description: "A Pac-Man recreation I built in Unity with ghost AI and BFS pathfinding.",
        screenshots: [pac1, pac2, pac3],
        tags: ["C#", "Unity"],
        play_link: "https://httpzeni.itch.io/pac-man"
    },
}

export const skills = {
    "Languages": ["C#", "Python"],
    "Tools": ["Unity", "Git"]
}