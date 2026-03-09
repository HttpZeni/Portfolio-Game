interface props {
    className?: string
    width?: number
    height?: number
    children?: React.ReactNode
}

export default function Box({ className = "", width = 17, height = 12, children }: props) {
    return (
        <div
            style={{ width: `${width}rem`, height: `${height}rem` }}
            className={`bg-base-800 border border-base-600 [box-shadow:_8px_8px_0_#1a1d26] hover:[box-shadow:_2px_2px_0_#1a1d26] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 ${className}`}
        >
            {children}
        </div>
    )
}