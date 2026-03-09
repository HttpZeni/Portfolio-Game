import { FaGithub, FaDiscord, FaEnvelope } from "react-icons/fa"

export default function Contact() {
    return (
        <div className="w-full flex justify-center items-center mt-20">
            <div className="w-fit h-fit flex flex-row gap-5">
                <div className="group w-fit flex flex-row gap-2 items-center justify-center font-mono text-ink-300 cursor-pointer">
                    <FaGithub className="text-ink-300 text-xl transition-all duration-300 group-hover:text-gold-300" />
                    <span className="transition-all duration-300 group-hover:text-gold-300">GitHub</span>
                </div>
                <div className="group w-fit flex flex-row gap-2 items-center justify-center font-mono text-ink-300 cursor-pointer">
                    <FaDiscord className="text-ink-300 text-xl transition-all duration-300 group-hover:text-gold-300" />
                    <span className="transition-all duration-300 group-hover:text-gold-300">Discord</span>
                </div>
                <div className="group w-fit flex flex-row gap-2 items-center justify-center font-mono text-ink-300 cursor-pointer">
                    <FaEnvelope className="text-ink-300 text-xl transition-all duration-300 group-hover:text-gold-300" />
                    <span className="transition-all duration-300 group-hover:text-gold-300">Mail</span>
                </div>
            </div>
        </div>
    )
}