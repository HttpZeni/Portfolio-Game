import { JSX, useState, useEffect, CSSProperties } from "react";
import { Game } from "./types";
import { games, skills, contact } from "./data";
import { ACCENT, ACCENT_BORDER, BG, AVATAR } from "./styles/theme";
import { globalCss } from "./styles/globalCss";
import { PixelCursor } from "./components/PixelCursor";
import { ParticleBackground } from "./components/ParticleBackground";
import { TypedText } from "./components/TypedText";
import { PixelSkillBar } from "./components/PixelSkillBar";
import { GameCard } from "./components/GameCard";
import { GameModal } from "./components/GameModal";
import { Section } from "./components/Section";

export default function App(): JSX.Element {
  const [selected, setSelected] = useState<Game | null>(null);
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = globalCss;
    document.head.appendChild(s);
    setTimeout(() => setStarted(true), 300);
    return () => { document.head.removeChild(s); };
  }, []);

  const cornerPositions: CSSProperties[] = [
    { top: -5, left: -5 },
    { top: -5, right: -5 },
    { bottom: -5, left: -5 },
    { bottom: -5, right: -5 },
  ];

  const contactRows: [string, string, string][] = [
    ["EMAIL", contact.email, `mailto:${contact.email}`],
    ["GITHUB", contact.github, contact.github],
    ["DISCORD", contact.discord, contact.discord],
  ];

  return (
    <div
      className="scanlines"
      style={{ minHeight: "100vh", background: BG, color: "#ccc", position: "relative" }}
    >
      <PixelCursor />
      <ParticleBackground />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", padding: "6rem 2.5rem 8rem" }}>

        {/* ── HERO ── */}
        <div className="fade-in" style={{ marginBottom: "7rem", display: "flex", alignItems: "center", gap: "3rem" }}>
          {/* Avatar with pixel corners */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <img
              src={AVATAR}
              alt="avatar"
              style={{
                width: "120px", height: "120px",
                objectFit: "cover",
                filter: "brightness(0.85)",
                outline: `3px solid ${ACCENT_BORDER}`,
              }}
            />
            {cornerPositions.map((pos, i) => (
              <div key={i} style={{ position: "absolute", width: "8px", height: "8px", background: ACCENT, ...pos }} />
            ))}
          </div>

          {/* Text */}
          <div>
            <h1 className="pixel" style={{ fontSize: "2rem", color: "#e8e8f8", marginBottom: "20px", lineHeight: 1.4 }}>
              {started && <TypedText text="ZENI" speed={120} />}
            </h1>
            <p className="pixel" style={{ fontSize: "10px", color: "#3a3a5a", marginBottom: "20px", lineHeight: 2 }}>
              Game dev
            </p>
            <p className="pixel" style={{ fontSize: "9px", lineHeight: 2.4, maxWidth: "420px" }}>
              {started && (
                <TypedText
                  text=":D"
                  speed={28}
                  style={{ color: "#3a3a5a" }}
                />
              )}
            </p>
          </div>
        </div>

        {/* ── GAMES ── */}
        <Section title="GAMES">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
            {games.map(g => (
              <GameCard key={g.id} game={g} onClick={() => setSelected(g)} />
            ))}
          </div>
        </Section>

        {/* ── SKILLS ── */}
        <Section title="SKILLS">
          <div style={{ marginTop: "8px" }}>
            {skills.map(s => (
              <PixelSkillBar key={s.name} name={s.name} level={s.level} />
            ))}
          </div>
        </Section>

        {/* ── ABOUT ── */}
        <Section title="ABOUT">
          <p className="pixel" style={{ fontSize: "9px", color: "#3a3a5a", lineHeight: 2.6, maxWidth: "640px" }}>
            Self-taught dev. Got into gamedev to understand how games actually work
            under the hood. First big project: rebuilding Pac-Man from scratch —
            ghost AI and all. More games coming.
          </p>
        </Section>

        {/* ── CONTACT ── */}
        <Section title="CONTACT">
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {contactRows.map(([label, value, href]) => (
              <div key={label} style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                <span className="pixel" style={{ fontSize: "8px", color: "#2a2a4a", width: "75px", flexShrink: 0 }}>
                  {label}
                </span>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel"
                  style={{ fontSize: "9px", color: "#3a3a6a", textDecoration: "none", transition: "color 0.15s", lineHeight: 2 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ACCENT; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#3a3a6a"; }}
                >
                  {value}
                </a>
              </div>
            ))}
          </div>
        </Section>

      </div>

      {selected && <GameModal game={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}