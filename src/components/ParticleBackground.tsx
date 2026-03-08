import { JSX, useMemo } from "react";
import { Particle } from "../types";
import { ACCENT } from "../styles/theme";

export function ParticleBackground(): JSX.Element {
    const particles = useMemo<Particle[]>(() =>
        Array.from({ length: 22 }, (_, i) => ({
            id: i,
            left: `${(i * 4.5) % 100}%`,
            size: i % 3 === 0 ? 2 : 1,
            duration: `${16 + (i * 1.3) % 18}s`,
            delay: `${(i * 0.9) % 16}s`,
            opacity: 0.1 + (i % 5) * 0.04,
        }))
        , []);

    return (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
            {particles.map(p => (
                <div key={p.id} style={{
                    position: "absolute", bottom: "-4px", left: p.left,
                    width: `${p.size}px`, height: `${p.size}px`,
                    background: ACCENT,
                    animation: `drift ${p.duration} ${p.delay} linear infinite`,
                    opacity: p.opacity,
                }} />
            ))}
        </div>
    );
}