/** @type {import('tailwindcss').Config} */

// Google Fonts (in <head>):
// https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Courier+Prime&family=Press+Start+2P&display=swap

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {

      colors: {
        base: {
          950: "#1a1d26",
          900: "#1e2130",   // main bg
          800: "#252839",   // cards
          700: "#2e3247",   // elevated
          600: "#3a3f58",   // borders
          500: "#4a5070",   // subtle
        },
        ink: {
          50:  "#e8eaf2",   // primary text
          100: "#c4c8dc",   // secondary
          300: "#8890b0",   // muted
        },
        gold: {
          300: "#e8c46a",   // hover
          400: "#c8952a",   // PRIMARY ACCENT
          500: "#a87820",   // pressed
        },
        // Second accent — muted periwinkle blue
        // Complements gold without clashing, fits the pixel/game vibe
        periwinkle: {
          300: "#9ba8d4",   // hover
          400: "#6b7db8",   // SECONDARY ACCENT
          500: "#4e5e96",   // pressed
        },
      },

      fontFamily: {
        mono:  ['"Share Tech Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
        body:  ['"Courier Prime"', '"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },

      fontSize: {
        "sm": '12px',
        "md": '14px'
      },

      borderRadius: {
        DEFAULT: "3px",
        sm:      "2px",
        md:      "4px",
        none:    "0px",
      },

      boxShadow: {
        "pixel":  "4px 4px 0px 0px #c8952a",
        "glow":   "0 0 14px 2px rgba(200, 149, 42, 0.3)",
        "panel":  "0 4px 20px rgba(0,0,0,0.4)",
      },

      // Pixel font rendering — no antialiasing
      // Usage: className="font-pixel text-pixel-sm [font-smooth:never] [-webkit-font-smoothing:none]"
      // Or add this to globals.css:
      //   .font-pixel { -webkit-font-smoothing: none; font-smooth: never; }

      keyframes: {
        blink: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0 } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-5px)" } },
        glitch: {
          "0%,100%": { transform: "translateX(0)",    clipPath: "inset(0 0 100% 0)" },
          "30%":     { transform: "translateX(-3px)", clipPath: "inset(20% 0 50% 0)" },
          "60%":     { transform: "translateX(3px)",  clipPath: "inset(60% 0 10% 0)" },
        },
      },

      animation: {
        "cursor": "blink 1s step-end infinite",
        "float":  "float 4s ease-in-out infinite",
        "glitch": "glitch 0.35s steps(1) 1",
      },

      transitionTimingFunction: {
        "pixel": "steps(3)",
        "game":  "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },

  plugins: [],
};