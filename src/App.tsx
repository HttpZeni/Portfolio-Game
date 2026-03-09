import TopBar from "./components/TopBar"
import Home from "./components/Home"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Bento from "./components/Bento"

export default function App() {
  return (
    <div className="w-screen min-h-screen bg-base-900 flex flex-col pb-5 relative">
      <div className="pointer-events-none fixed inset-0 z-50" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)" }} />
      <div className="pointer-events-none fixed inset-0 z-40" style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.35) 100%)" }} />
      <div className="w-full h-16 flex items-center justify-center relative z-10">
        <div className="w-3/5 h-full md:w-3/5 w-[90%]">
          <TopBar />
        </div>
      </div>
      <div className="w-full flex justify-center relative z-10">
        <div className="w-[90%] md:w-3/5 flex flex-col">
          <div id="home"><Home /></div>
          <div id="projects"><Projects /></div>
          <div id="more"><Bento /></div>
          <div id="more"><Contact /></div>
        </div>
      </div>
    </div>
  )
}