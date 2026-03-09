import LinkItem from "./LinkItem";
import { loadVisited, saveVisited } from "../data/localstorageData";
import { useEffect, useState } from "react";

export default function Contact() {
    const [count, setCount] = useState<number>(loadVisited())
    let set = false;

    useEffect(() => {
        if (set) return;
        const current = loadVisited();
        const updated = current + 1;
        saveVisited(updated);
        setCount(updated);
        set = true;
    }, []);

    return (
        <div className="w-full flex flex-row justify-between gap-5 mt-20">
            <div className="w-1/2 flex flex-row gap-5">
                <LinkItem />
            </div>
            <p className="font-pixel text-ink-300 text-xs">
                Site visited by <span className="text-gold-400">{count}</span> people.
            </p>
        </div>
    );
}