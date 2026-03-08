import { ACCENT_BORDER, BG } from "./theme";

export const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${BG}; cursor: none !important; }
  * { cursor: none !important; }

  .pixel { font-family: 'Press Start 2P', monospace; }

  .scanlines::after {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.07) 2px,
      rgba(0,0,0,0.07) 4px
    );
    pointer-events: none;
    z-index: 9998;
  }

  .scanlines::before {
    content: '';
    position: fixed;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%);
    pointer-events: none;
    z-index: 9997;
  }

  .pixel-border {
    box-shadow:
      -3px 0 0 0 ${ACCENT_BORDER},
       3px 0 0 0 ${ACCENT_BORDER},
       0 -3px 0 0 ${ACCENT_BORDER},
       0  3px 0 0 ${ACCENT_BORDER};
    border-radius: 0 !important;
    border: none !important;
    outline: 3px solid ${ACCENT_BORDER};
    outline-offset: -1px;
    image-rendering: pixelated;
  }

  .pixel-border-hover {
    box-shadow:
      -3px 0 0 0 rgba(124,111,255,0.7),
       3px 0 0 0 rgba(124,111,255,0.7),
       0 -3px 0 0 rgba(124,111,255,0.7),
       0  3px 0 0 rgba(124,111,255,0.7),
       0 0 24px rgba(124,111,255,0.25);
    outline: 3px solid rgba(124,111,255,0.7);
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  .blink { animation: blink 0.9s step-end infinite; }

  @keyframes drift {
    0%   { transform: translateY(0); opacity: 0; }
    8%   { opacity: 1; }
    92%  { opacity: 1; }
    100% { transform: translateY(-100vh); opacity: 0; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-in { animation: fadeIn 0.5s ease both; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${BG}; }
  ::-webkit-scrollbar-thumb { background: #2a2a4a; border-radius: 0; }
`;