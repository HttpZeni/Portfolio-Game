import { JSX, useState, useEffect, useRef } from "react";
import { ACCENT } from "../styles/theme";

interface PixelSkillBarProps {
    name: string;
    level: number;
}

export function PixelSkillBar({ name, level }: PixelSkillBarProps): JSX.Element {
    const [filled, setFilled] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);
    const total = 10;
    const filledCount = Math.round((level / 100) * total);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let i = 0;
                    const t = setInterval(() => {
                        i++;
                        setFilled(i);
                        if (i >= filledCount) clearInterval(t);
                    }, 70);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [filledCount]);

    return (
        <div ref={ref} style={{ marginBottom: "28px", display: "flex", alignItems: "center", gap: "20px" }}>
            <span className="pixel" style={{ fontSize: "8px", color: "#666", width: "110px", flexShrink: 0, lineHeight: 1.8 }}>
                {name}
            </span>
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {Array.from({ length: total }).map((_, i) => (
                    <div key={i} style={{
                        width: "22px",
                        height: "18px",
                        background: i < filled ? ACCENT : "#1a1a2e",
                        border: `1px solid ${i < filled ? "rgba(124,111,255,0.5)" : "#2a2a3e"}`,
                        boxShadow: i < filled ? "0 0 5px rgba(124,111,255,0.35)" : "none",
                        transition: `background 0.1s ${i * 0.05}s`,
                    }} />
                ))}
                <span className="pixel" style={{ fontSize: "8px", color: "#333", marginLeft: "10px" }}>{level}%</span>
            </div>
        </div>
    );
}