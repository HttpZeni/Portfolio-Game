import { useEffect, useState } from "react";
import { starterText } from "../data";
import { useFadeIn } from "../assets/hooks/useFadeIn";
import LinkItem from "./LinkItem";
import { gif1 } from "../assets";

const FULL_NAME = "Zeni";

export default function Home() {
    const [typed, setTyped] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);
    const [typingDone, setTypingDone] = useState(false);
    const { ref, visible } = useFadeIn(0.5);

    useEffect(() => {
        let i = 0;
        const type = setInterval(() => {
            i++;
            setTyped(FULL_NAME.slice(0, i));
            if (i >= FULL_NAME.length) {
                clearInterval(type);
                setTypingDone(true);
            }
        }, 200);
        return () => clearInterval(type);
    }, []);

    useEffect(() => {
        const speed = typingDone ? 550 : 200;
        const id = setInterval(() => setCursorVisible(v => !v), speed);
        return () => clearInterval(id);
    }, [typingDone]);

    return (
        <div
            ref={ref}
            className="w-full flex flex-col md:flex-row items-center gap-16 mt-[10%]"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
        >
            <div className="flex-1 flex flex-col gap-5">
                <p className="text-ink-100 text-2xl font-pixel">
                    Hey! I'm{" "}
                    <span className="text-gold-400">
                        {typed}
                        <span style={{ visibility: cursorVisible ? "visible" : "hidden" }}>_</span>
                    </span>
                </p>
                <div className="w-full h-fit">{starterText}</div>
                <div className="w-full h-fit flex flex-row gap-5">
                    <LinkItem />
                </div>
            </div>
            <div className="flex-1 flex justify-center">
                <img src={gif1} alt="Pokemon Gif" className="max-w-full max-h-96 object-contain" />
            </div>
        </div>
    );
}