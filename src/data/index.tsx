import { pac1, pac2, pac3, td1, td2, td3, td4, td5, td6 } from "../assets";

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
    "Starhold": {
        name: "Starhold",
        description: "A 2D top-down tower defense game with roguelike elements, inspired by Orcs Must Die 3, built solo in Unity (C#). I mainly used it to improve my singleton and state machine usage, the player runs on a hand rolled FSM and most systems communicate through a central GameManager via events. Unlike a traditional TD game, the main progression is through upgrading your player ship between waves rather than the towers themselves, towers stay static, the player gets stronger. Enemies navigate a grid using BFS pathfinding with a nearest-goal fallback for blocked paths. There are 4 tower types (Standard, Rapid Fire, Sniper, AOE) and a drag-and-drop shop for placing them. Also has 40 configurable waves with dynamic difficulty scaling, a moveable player ship, and a ScriptableObject-driven upgrade system.",
        short_description: "A tower defense game I made in Unity, inspired by Orcs Must Die 3. I focused on improving my singleton and state machine patterns. Has 4 tower types, BFS pathfinding, and 40 waves.",
        screenshots: [td1, td2, td3, td4, td5, td6],
        tags: ["C#", "Unity"],
        play_link: "https://httpzeni.itch.io/starhold"
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
    "Starhold": {
        name: "Starhold",
        description: "A 2D top-down tower defense game with roguelike elements, inspired by Orcs Must Die 3, built solo in Unity (C#). I mainly used it to improve my singleton and state machine usage, the player runs on a hand rolled FSM and most systems communicate through a central GameManager via events. Unlike a traditional TD game, the main progression is through upgrading your player ship between waves rather than the towers themselves, towers stay static, the player gets stronger. Enemies navigate a grid using BFS pathfinding with a nearest-goal fallback for blocked paths. There are 4 tower types (Standard, Rapid Fire, Sniper, AOE) and a drag-and-drop shop for placing them. Also has 40 configurable waves with dynamic difficulty scaling, a moveable player ship, and a ScriptableObject-driven upgrade system.",
        short_description: "A tower defense game I made in Unity, inspired by Orcs Must Die 3. I focused on improving my singleton and state machine patterns. Has 4 tower types, BFS pathfinding, and 40 waves.",
        screenshots: [td1, td2, td3, td4, td5, td6],
        tags: ["C#", "Unity"],
        play_link: "https://httpzeni.itch.io/starhold"
    },
}

export const skills = {
    "Languages": ["C#", "Python"],
    "Tools": ["Unity", "Git"]
}