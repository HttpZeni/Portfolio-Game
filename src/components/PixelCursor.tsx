import { JSX, useState, useEffect } from "react";
import { ACCENT } from "../styles/theme";

// ✏️ CHANGE THIS to switch cursor style:
//const CURSOR_STYLE: string = "sword";        // ← aktiv
const CURSOR_STYLE: string = "pixel_arrow";
//const CURSOR_STYLE: string = "target";
//const CURSOR_STYLE: string = "hand";
//const CURSOR_STYLE: string = "crosshair";

// ── HOOK ──────────────────────────────────────────────────────────────────────

function useCursor() {
    const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
    const [clicking, setClicking] = useState<boolean>(false);

    useEffect(() => {
        const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        const down = () => setClicking(true);
        const up = () => setClicking(false);
        window.addEventListener("mousemove", move);
        window.addEventListener("mousedown", down);
        window.addEventListener("mouseup", up);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mousedown", down);
            window.removeEventListener("mouseup", up);
        };
    }, []);

    return { pos, clicking };
}

// ── VARIANT 1: CROSSHAIR ─────────────────────────────────────────────────────
// Simple + crosshair, shrinks on click

function CrosshairCursor(): JSX.Element {
    const { pos, clicking } = useCursor();
    const size = clicking ? 10 : 16;
    const color = clicking ? "#fff" : ACCENT;

    return (
        <div style={{
            position: "fixed", zIndex: 99999, pointerEvents: "none",
            left: pos.x, top: pos.y, transform: "translate(-50%, -50%)"
        }}>
            <div style={{ position: "relative", width: size * 2, height: size * 2 }}>
                <div style={{
                    position: "absolute", top: "50%", left: 0, right: 0,
                    height: "2px", background: color, transform: "translateY(-50%)"
                }} />
                <div style={{
                    position: "absolute", left: "50%", top: 0, bottom: 0,
                    width: "2px", background: color, transform: "translateX(-50%)"
                }} />
                <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: "4px", height: "4px", background: color,
                    transform: "translate(-50%, -50%)"
                }} />
            </div>
        </div>
    );
}

// ── VARIANT 2: SWORD ─────────────────────────────────────────────────────────
// Pixel art sword that tilts on click

function SwordCursor(): JSX.Element {
    const { pos, clicking } = useCursor();

    const pixels: { x: number; y: number; part: "blade" | "guard" | "handle" }[] = [
        { x: 12, y: 0, part: "blade" },
        { x: 9, y: 3, part: "blade" },
        { x: 6, y: 6, part: "blade" },
        { x: 3, y: 9, part: "blade" },
        { x: 0, y: 12, part: "guard" },
        { x: 3, y: 12, part: "guard" },
        { x: 6, y: 12, part: "guard" },
        { x: 3, y: 15, part: "handle" },
        { x: 3, y: 18, part: "handle" },
    ];

    const colors = {
        blade: clicking ? "#fff" : ACCENT,
        guard: clicking ? "#aaa" : "#a78bfa",
        handle: clicking ? "#888" : "#4a4a6a",
    };

    return (
        <div style={{
            position: "fixed", zIndex: 99999, pointerEvents: "none",
            left: pos.x, top: pos.y,
            transform: `translate(-2px, -2px) rotate(${clicking ? "20deg" : "0deg"})`,
            transition: "transform 0.08s",
        }}>
            <div style={{ position: "relative", width: "24px", height: "24px" }}>
                {pixels.map((p, i) => (
                    <div key={i} style={{
                        position: "absolute", left: p.x, top: p.y,
                        width: "3px", height: "3px",
                        background: colors[p.part],
                    }} />
                ))}
            </div>
        </div>
    );
}

// ── VARIANT 3: PIXEL ARROW ───────────────────────────────────────────────────
// Classic pixel-art mouse pointer

function PixelArrowCursor(): JSX.Element {
    const { pos, clicking } = useCursor();
    const color = clicking ? "#fff" : ACCENT;
    const shadow = clicking ? "rgba(255,255,255,0.3)" : "rgba(124,111,255,0.35)";
    const scale = clicking ? 0.85 : 1;

    const arrowPixels: [number, number][] = [
        [0, 0], [0, 2], [0, 4], [0, 6], [0, 8], [0, 10], [0, 12], [0, 14],
        [2, 2], [2, 4], [2, 6], [2, 8], [2, 10], [2, 12],
        [4, 4], [4, 6], [4, 8], [4, 10],
        [6, 6], [6, 8],
        [8, 8],
    ];

    return (
        <div style={{
            position: "fixed", zIndex: 99999, pointerEvents: "none",
            left: pos.x, top: pos.y,
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
            transition: "transform 0.08s",
        }}>
            <div style={{ position: "relative", width: "18px", height: "18px" }}>
                {arrowPixels.map(([x, y], i) => (
                    <div key={`s${i}`} style={{
                        position: "absolute", left: x + 1, top: y + 1,
                        width: "2px", height: "2px", background: shadow
                    }} />
                ))}
                {arrowPixels.map(([x, y], i) => (
                    <div key={`p${i}`} style={{
                        position: "absolute", left: x, top: y,
                        width: "2px", height: "2px", background: color
                    }} />
                ))}
            </div>
        </div>
    );
}

// ── VARIANT 4: TARGET ────────────────────────────────────────────────────────
// Hollow corner-bracket target

function TargetCursor(): JSX.Element {
    const { pos, clicking } = useCursor();
    const size = clicking ? 12 : 16;
    const color = clicking ? "#fff" : ACCENT;
    const L = 5; // bracket arm length in px

    const brackets = [
        // top-left
        { top: 0, left: 0, width: L, height: "2px" },
        { top: 0, left: 0, width: "2px", height: L },
        // top-right
        { top: 0, right: 0, width: L, height: "2px" },
        { top: 0, right: 0, width: "2px", height: L },
        // bottom-left
        { bottom: 0, left: 0, width: L, height: "2px" },
        { bottom: 0, left: 0, width: "2px", height: L },
        // bottom-right
        { bottom: 0, right: 0, width: L, height: "2px" },
        { bottom: 0, right: 0, width: "2px", height: L },
    ];

    return (
        <div style={{
            position: "fixed", zIndex: 99999, pointerEvents: "none",
            left: pos.x, top: pos.y,
            transform: "translate(-50%, -50%)",
        }}>
            <div style={{ position: "relative", width: size * 2, height: size * 2 }}>
                {brackets.map((s, i) => (
                    <div key={i} style={{ position: "absolute", background: color, transition: "all 0.1s", ...s }} />
                ))}
                <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: "3px", height: "3px", background: color,
                    transform: "translate(-50%, -50%)",
                }} />
            </div>
        </div>
    );
}

// ── VARIANT 5: HAND ──────────────────────────────────────────────────────────
// Pixel art pointing hand, presses down on click

function HandCursor(): JSX.Element {
    const { pos, clicking } = useCursor();
    const color = clicking ? "#e0e0e0" : "#d0d0e8";
    const offset = clicking ? 2 : 0;

    const pixels: [number, number][] = [
        [4, 0], [4, 2], [4, 4], [4, 6],
        [8, 2], [8, 4], [8, 6],
        [12, 4], [12, 6],
        [0, 8], [2, 8], [4, 8], [6, 8], [8, 8], [10, 8], [12, 8], [14, 8],
        [0, 10], [2, 10], [4, 10], [6, 10], [8, 10], [10, 10], [12, 10], [14, 10], [16, 10],
        [0, 12], [2, 12], [4, 12], [6, 12], [8, 12], [10, 12], [12, 12], [14, 12],
        [2, 14], [4, 14], [6, 14], [8, 14], [10, 14], [12, 14],
        [4, 16], [6, 16], [8, 16], [10, 16],
    ];

    return (
        <div style={{
            position: "fixed", zIndex: 99999, pointerEvents: "none",
            left: pos.x, top: pos.y + offset,
            transform: "translate(-4px, 0px)",
            transition: "top 0.06s",
        }}>
            <div style={{ position: "relative", width: "22px", height: "20px" }}>
                {pixels.map(([x, y], i) => (
                    <div key={i} style={{
                        position: "absolute", left: x, top: y,
                        width: "2px", height: "2px", background: color,
                    }} />
                ))}
            </div>
        </div>
    );
}

// ── EXPORT ────────────────────────────────────────────────────────────────────

export function PixelCursor(): JSX.Element {
    switch (CURSOR_STYLE) {
        case "sword": return <SwordCursor />;
        case "pixel_arrow": return <PixelArrowCursor />;
        case "target": return <TargetCursor />;
        case "hand": return <HandCursor />;
        case "crosshair":
        default: return <CrosshairCursor />;
    }
}