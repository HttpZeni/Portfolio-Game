import { useEffect, useState } from "react";

export default function TopBar() {
    const sections = ["home", "projects", "more"];
    const [selected, setSelected] = useState<number>(0);

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const id = setInterval(() => setVisible(v => !v), 550);
        return () => clearInterval(id);
    }, []);

    function ChangeSelected(index: number) {
        setSelected(index);
        document.getElementById(sections[index])?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="w-full h-full flex flex-row-reverse">
            <div className="w-1/2 h-full flex flex-row justify-end items-end gap-14">
                <h1 onClick={() => ChangeSelected(0)} className={`${selected == 0 ? "text-gold-400 scale-125" : "text-ink-50 scale-100"} text-sm text-shadow-sm font-pixel cursor-pointer transition-all duration-300 hover:text-gold-300`}>Home</h1>
                <h1 onClick={() => ChangeSelected(1)} className={`${selected == 1 ? "text-gold-400 scale-125" : "text-ink-50 scale-100"} text-sm text-shadow-sm font-pixel cursor-pointer transition-all duration-300 hover:text-gold-300`}>Projects</h1>
                <h1 onClick={() => ChangeSelected(3)} className={`${selected == 3 ? "text-gold-400 scale-125" : "text-ink-50 scale-100"} text-sm text-shadow-sm font-pixel cursor-pointer transition-all duration-300 hover:text-gold-300`}>More..</h1>
            </div>
            <div className="w-1/2 h-full flex flex-row justify-start items-end gap-14">
                <h1 className={`text-gold-400 text-shadow-sm font-pixel`}>~/<span style={{ visibility: visible ? "visible" : "hidden" }}>_</span></h1>
            </div>
        </div>
    )
}