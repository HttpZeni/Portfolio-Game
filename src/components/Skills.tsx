import { useState } from "react";
import { skills } from "../data";
import { useFadeIn } from "../assets/hooks/useFadeIn";

function GlitchTag({ skill }: { skill: string }) {
    const [glitching, setGlitching] = useState(false);

    function handleHover() {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 400);
    }

    return (
        <span
            onMouseEnter={handleHover}
            className="relative font-pixel text-sm text-gold-300 border border-gold-400/30 px-4 py-2 bg-gold-400/10 [box-shadow:_3px_3px_0_#c8952a44] cursor-default select-none overflow-hidden"
            style={{
                transition: "box-shadow 0.15s",
                ...(glitching ? { boxShadow: "3px 3px 0 #c8952a, -2px -1px 0 #6b7db855" } : {}),
            }}
        >
            {glitching && (
                <>
                    <span
                        aria-hidden
                        className="absolute inset-0 flex items-center px-4 text-gold-400 pointer-events-none"
                        style={{
                            clipPath: "inset(30% 0 50% 0)",
                            transform: "translateX(-3px)",
                            opacity: 0.7,
                            color: "#6b7db8",
                        }}
                    >
                        {skill}
                    </span>
                    <span
                        aria-hidden
                        className="absolute inset-0 flex items-center px-4 pointer-events-none"
                        style={{
                            clipPath: "inset(60% 0 10% 0)",
                            transform: "translateX(3px)",
                            opacity: 0.6,
                            color: "#c8952a",
                        }}
                    >
                        {skill}
                    </span>
                </>
            )}
            <span style={{ visibility: "visible" }}>{skill}</span>
        </span>
    );
}

export default function Skills() {
    const { ref, visible } = useFadeIn(0.1);

    return (
        <div
            ref={ref}
            className="w-full flex justify-center mt-10"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
        >
            <div className="w-3/5 flex flex-col gap-10 justify-center items-start mt-[8%]">
                <div className="w-full h-fit flex flex-row items-center gap-4">
                    <p className="text-gold-400 text-lg">✦</p>
                    <p className="text-base text-ink-50 font-pixel">Skills</p>
                </div>

                <div className="w-full flex flex-col gap-8 pl-7">
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category} className="flex flex-col gap-3">
                            <p className="text-ink-300 text-xs font-mono">▸ {category}</p>
                            <div className="flex flex-row gap-3 flex-wrap">
                                {items.map((skill) => (
                                    <GlitchTag key={skill} skill={skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}