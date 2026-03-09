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
            className={`bg-base-800 border border-base-600 [box-shadow:_8px_8px_0_#6b7db8] hover:[box-shadow:_8px_8px_0_#c8952a] transition-all duration-200 ${className}`}
        >
            {children}
        </div>
    )
}