import { JSX, useState } from "react";
import { Game } from "../types";
import { CARD_BG } from "../styles/theme";

interface GameCardProps {
    game: Game;
    onClick: () => void;
}

export function GameCard({ game, onClick }: GameCardProps): JSX.Element {
    const [hovered, setHovered] = useState<boolean>(false);
    const accent = game.accentColor ?? "124,111,255";

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={hovered ? "pixel-border pixel-border-hover" : "pixel-border"}
            style={{ background: CARD_BG, overflow: "hidden", transition: "box-shadow 0.2s" }}
        >
            {/* Preview image */}
            <div style={{ height: "180px", background: "#000", overflow: "hidden", position: "relative" }}>
                <img
                    src={game.screenshots[0]}
                    alt={game.title}
                    style={{
                        width: "100%", height: "100%", objectFit: "cover",
                        opacity: hovered ? 1 : 0.7,
                        transform: hovered ? "scale(1.05)" : "scale(1)",
                        transition: "opacity 0.25s, transform 0.35s",
                    }}
                />
                <div style={{
                    position: "absolute", inset: 0,
                    background: `rgba(${accent}, 0.14)`,
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.25s",
                }} />
            </div>

            {/* Info */}
            <div style={{ padding: "20px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                    <p className="pixel" style={{
                        fontSize: "11px", lineHeight: 1.6,
                        color: hovered ? `rgb(${accent})` : "#999",
                        transition: "color 0.25s",
                    }}>
                        {game.title}
                    </p>
                    <span className="pixel" style={{ fontSize: "8px", color: "#22223a" }}>{game.year}</span>
                </div>
                <p className="pixel" style={{ fontSize: "8px", color: "#3a3a5a", lineHeight: 2.2 }}>
                    {game.shortDesc}
                </p>
            </div>
        </div>
    );
}