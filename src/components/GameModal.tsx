import { JSX, useState, useEffect } from "react";
import { Game } from "../types";
import { ACCENT, ACCENT_DIM, ACCENT_BORDER, CARD_BG } from "../styles/theme";

interface GameModalProps {
    game: Game;
    onClose: () => void;
}

export function GameModal({ game, onClose }: GameModalProps): JSX.Element {
    const [shot, setShot] = useState<number>(0);
    const n = game.screenshots.length;

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") setShot(s => (s + 1) % n);
            if (e.key === "ArrowLeft") setShot(s => (s - 1 + n) % n);
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [n, onClose]);

    const tags = (
        [game.genre, game.platform, game.status] as (string | undefined)[]
    ).filter(Boolean) as string[];

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(0,0,0,0.92)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "2rem",
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    width: "100%", maxWidth: "720px",
                    background: CARD_BG,
                    outline: `3px solid ${ACCENT_BORDER}`,
                    maxHeight: "92vh", overflowY: "auto",
                }}
            >
                {/* Screenshot */}
                <div style={{ position: "relative", height: "400px", background: "#000", flexShrink: 0 }}>
                    {game.screenshots.map((src, i) => (
                        <div key={i} style={{ position: "absolute", inset: 0, opacity: shot === i ? 1 : 0, transition: "opacity 0.25s" }}>
                            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                    ))}

                    {n > 1 && (
                        <>
                            <button
                                onClick={() => setShot(s => (s - 1 + n) % n)}
                                style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.7)", color: "#ccc", border: "2px solid #444", width: "40px", height: "40px", fontSize: "22px" }}
                            >‹</button>
                            <button
                                onClick={() => setShot(s => (s + 1) % n)}
                                style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.7)", color: "#ccc", border: "2px solid #444", width: "40px", height: "40px", fontSize: "22px" }}
                            >›</button>
                            <div style={{ position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px" }}>
                                {game.screenshots.map((_, i) => (
                                    <div key={i} style={{ width: "10px", height: "10px", background: shot === i ? ACCENT : "#333", transition: "background 0.2s" }} />
                                ))}
                            </div>
                        </>
                    )}

                    <button
                        onClick={onClose}
                        style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.7)", color: "#888", border: "2px solid #444", width: "32px", height: "32px", fontSize: "14px" }}
                    >✕</button>
                </div>

                {/* Content */}
                <div style={{ padding: "2.5rem" }}>
                    {/* Title + tags */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                        <h2 className="pixel" style={{ fontSize: "16px", color: "#e0e0f0", lineHeight: 1.6 }}>
                            {game.title}
                        </h2>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {tags.map(tag => (
                                <span key={tag} className="pixel" style={{ fontSize: "8px", padding: "5px 10px", background: ACCENT_DIM, color: ACCENT, outline: `1px solid ${ACCENT_BORDER}` }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    {game.description.trim().split("\n\n").map((para, i) => (
                        <p key={i} className="pixel" style={{ fontSize: "8px", color: "#555", lineHeight: 2.4, marginBottom: "18px" }}>
                            {para.trim()}
                        </p>
                    ))}

                    {/* Tech stack */}
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", margin: "24px 0" }}>
                        {game.tech.map(t => (
                            <span key={t} className="pixel" style={{ fontSize: "8px", padding: "6px 12px", background: ACCENT_DIM, color: ACCENT, outline: `1px solid ${ACCENT_BORDER}` }}>
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* itch link */}
                    {game.itchLink && (
                        <a
                            href={game.itchLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pixel"
                            style={{ display: "inline-block", fontSize: "9px", padding: "12px 20px", background: ACCENT_DIM, color: ACCENT, outline: `2px solid ${ACCENT_BORDER}`, textDecoration: "none", transition: "background 0.15s", lineHeight: 2 }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,111,255,0.22)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ACCENT_DIM; }}
                        >
                            [ PLAY ON ITCH.IO ]
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}