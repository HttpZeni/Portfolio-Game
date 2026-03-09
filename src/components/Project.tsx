import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import type { ProjectProps } from "../data"
import Button from "./Button";

interface props {
    project: ProjectProps
}

export default function Project({ project }: props) {
    const [open, setOpen] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<number>(0);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    function next() {
        setCurrentImage((prev) => (prev + 1) % project.screenshots!.length);
    }

    function prev() {
        setCurrentImage((prev) => (prev - 1 + project.screenshots!.length) % project.screenshots!.length);
    }

    const modal = (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
            <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.92) translateY(12px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                .modal-enter { animation: modalIn 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
            `}</style>

            <div onClick={() => setOpen(false)} className="absolute inset-0 bg-black/80" />

            <div className="modal-enter relative w-1/3 bg-base-800 border border-base-600 [box-shadow:_8px_8px_0_#1a1d26] z-10 flex flex-col">
                <div className="w-full h-8 bg-base-600 flex items-center justify-between px-5">
                    <h1 className="text-gold-400 text-sm font-pixel">{project.name}</h1>
                    <span onClick={() => setOpen(false)} className="text-ink-300 text-sm font-pixel hover:text-red-400 cursor-pointer transition-colors duration-300">X</span>
                </div>
                <div className="relative w-full aspect-video bg-base-900">
                    <img src={project.screenshots![currentImage]} alt="" className="w-full h-full object-contain" />
                    {currentImage > 0 && (
                        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-50 text-xl hover:text-gold-400 transition-colors duration-300">←</button>
                    )}
                    {currentImage < project.screenshots!.length - 1 && (
                        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-50 text-xl hover:text-gold-400 transition-colors duration-300">→</button>
                    )}
                </div>
                <div className="flex flex-col gap-3 p-5">
                    <div className="flex flex-row gap-2 flex-wrap">
                        {project.tags.map((tag) => (
                            <span key={tag} className="text-xs font-mono text-gold-300 border border-gold-400/30 px-2 py-0.5">{tag}</span>
                        ))}
                    </div>
                    <p className="text-ink-300 text-base font-mono leading-relaxed">{project.description}</p>
                    {project.play_link && (
                        <Button text="Play Now ->" onClick={() => window.open(project.play_link!, "_blank")} />
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="w-[27rem] h-[22rem] shrink-0 bg-base-800 [box-shadow:_8px_8px_0_#1a1d26] flex flex-col transition-all duration-175 hover:[box-shadow:_8px_8px_0_#a87820] active:[box-shadow:_4px_4px_0_#a87820] active:translate-x-1 active:translate-y-1 cursor-pointer"
            >
                <div className="relative w-full h-[65%] overflow-hidden">
                    <img
                        src={project.screenshots ? project.screenshots[0] : ""}
                        alt="Game Screenshot"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <h1 className="text-ink-50 text-md font-pixel">{project.name}</h1>
                    <p className="text-ink-300 text-sm font-mono">{project.short_description}</p>
                    <div className="flex flex-row gap-2 mt-1">
                        {project.tags.map((tag) => (
                            <span key={tag} className="text-xs font-mono text-gold-300 border border-gold-400/30 px-2 py-0.5 bg-gold-400/10">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            {open && ReactDOM.createPortal(modal, document.body)}
        </>
    );
}