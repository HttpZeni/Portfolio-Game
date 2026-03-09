import { FaGithub, FaDiscord, FaEnvelope } from "react-icons/fa";
import type { IconType } from "react-icons";
import { links } from "../data";

const icons: Record<string, IconType> = {
    "GitHub": FaGithub,
    "Discord": FaDiscord,
    "Email": FaEnvelope,
};

export default function LinkItem() {
    return (
        <>
            {Object.entries(links).map(([name, url]) => {
                const Icon = icons[name];
                const isEmail = name === "Email";
                return (
                    <a
                        key={name}
                        href={isEmail ? `mailto:${url}` : url}
                        target={isEmail ? undefined : "_blank"}
                        rel="noreferrer"
                        className="group w-fit flex flex-row gap-2 items-center justify-center font-mono text-ink-300 no-underline"
                    >
                        <Icon className="text-ink-300 text-xl transition-all duration-300 group-hover:text-gold-300" />
                        <span className="transition-all duration-300 group-hover:text-gold-300">{name}</span>
                    </a>
                );
            })}
        </>
    );
}