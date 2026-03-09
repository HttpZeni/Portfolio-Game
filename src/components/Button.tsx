interface props {
    text?: string
    width?: number | null
    height?: number | null
    className?: string
    onClick?: () => void
}

export default function Button({ text = "Button", width = null, height = null, className = "", onClick }: props) {
    return (
        <div onClick={onClick!} style={{ width: `${width ? `${width}rem` : "fit-content"}`, height: `${height ? `${height}rem` : "fit-content"}` }} className={`bg-base-600 [box-shadow:_4px_4px_0_#c8952a] text-ink-50 text-sm font-pixel hover:text-gold-300 active:[box-shadow:_2px_2px_0_#c8952a] active:translate-x-1 active:translate-y-1 transition-all duration-175 p-3 cursor-pointer ${className}`}>
            {text}
        </div>
    )
}