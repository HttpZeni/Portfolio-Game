import { Game, Skill, ContactInfo } from "../types";

export const games: Game[] = [
    {
        id: "pacman",
        title: "Pac-Man",
        shortDesc: "My own Pac-Man rebuild with ghost AI and BFS pathfinding.",
        description: `I tried to recreate Pac-Man in Unity, focusing on the systems. The game runs on a 23×22 tile-based grid. Pac-Man has smooth grid movement with input buffering, instant reverse movement, and proper tile centering.

        All four ghosts use BFS pathfinding which was the hardest part. Each ghost has its own unique chase behavior, along with Scatter and Frightened states.

        The project also includes a wave system with dynamic difficulty scaling, fruit spawning based on score, 3 lives, highscore saving, audio mixing, and full keyboard/gamepad support.`,
        tech: ["Unity", "C#"],
        screenshots: [
            "src/assets/Pacmanscreenshots/1.png",
            "src/assets/Pacmanscreenshots/2.png",
            "src/assets/Pacmanscreenshots/3.png",
        ],
        accentColor: "80, 120, 220",
        itchLink: "https://itch.io/embed/4350567",
        year: 2025,
        genre: "Arcade",
        platform: "PC",
        status: "Finished",
    },
];

export const skills: Skill[] = [
    { name: "Unity", level: 75 },
    { name: "C#", level: 70 },
    { name: "Aseprite", level: 55 },
];

export const contact: ContactInfo = {
    email: "lazyzeni1337@gmail.com",
    github: "https://github.com/HttpZeni",
    discord: "https://discord.gg/paK7bUHGQP",
};
