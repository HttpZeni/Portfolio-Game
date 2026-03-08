import { JSX, useState, useEffect, CSSProperties } from "react";
import { ACCENT } from "../styles/theme";

interface TypedTextProps {
    text: string;
    speed?: number;
    style?: CSSProperties;
}

export function TypedText({ text, speed = 60, style = {} }: TypedTextProps): JSX.Element {
    const [displayed, setDisplayed] = useState<string>("");
    const [done, setDone] = useState<boolean>(false);

    useEffect(() => {
        let i = 0;
        setDisplayed("");
        setDone(false);
        const t = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) { clearInterval(t); setDone(true); }
        }, speed);
        return () => clearInterval(t);
    }, [text, speed]);

    return (
        <span style={style}>
            {displayed}
            {!done && <span className="blink" style={{ color: ACCENT }}>█</span>}
        </span>
    );
}