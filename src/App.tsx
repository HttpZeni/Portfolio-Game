import TopBar from "./components/TopBar"
import Home from "./components/Home"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Contact from "./components/Contact"

export default function App() {
  return (
    <div className="w-screen min-h-screen bg-base-900 flex flex-col pb-5 relative">

      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      <div className="w-full h-16 flex items-center justify-center relative z-10">
        <div className="w-[70%] h-full">
          <TopBar />
        </div>
      </div>

      <div id="home" className="relative z-10"><Home /></div>
      <div id="projects" className="relative z-10"><Projects /></div>
      <div id="skills" className="relative z-10"><Skills /></div>
      <div id="contact" className="relative z-10"><Contact /></div>
    </div>
  )
}