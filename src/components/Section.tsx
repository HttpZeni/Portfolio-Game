import { JSX, ReactNode } from "react";
import { ACCENT } from "../styles/theme";

interface SectionProps {
    title: string;
    children: ReactNode;
}

export function Section({ title, children }: SectionProps): JSX.Element {
    return (
        <section style={{ marginBottom: "6rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "2.5rem" }}>
                <span className="pixel" style={{ fontSize: "10px", color: ACCENT, opacity: 0.75, whiteSpace: "nowrap" }}>
                    ▶ {title}
                </span>
                <div style={{
                    flex: 1, height: "1px",
                    background: "linear-gradient(90deg, rgba(124,111,255,0.35), transparent)",
                }} />
            </div>
            {children}
        </section>
    );
}