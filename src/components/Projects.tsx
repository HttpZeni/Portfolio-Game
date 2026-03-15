import { Star } from "lucide-react";
import { featuredProjects } from "../data";
import Project from "./Project";
import { useFadeIn } from "../assets/hooks/useFadeIn";

export default function Projects() {
    const { ref, visible } = useFadeIn(0.1);

    return (
        <div
            ref={ref}
            className="w-full flex flex-col gap-10 mt-[8%]"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
        >
            <div className="w-full h-fit flex flex-row items-center gap-4">
                <Star className="text-gold-400 w-5 h-5" />
                <p className="text-base text-ink-50 font-pixel">Featured Projects</p>
            </div>
            <div className="w-full flex flex-row gap-5">
                {Object.values(featuredProjects).map((project) => (
                    <Project key={project.name} project={project} />
                ))}
            </div>
        </div>
    );
}