import { useEffect, useState } from "react"

function LoadingDots({ text = "LOADING TASKS..." }) {
    const [dots, setDots] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(d => (d % 3) + 1)
        }, 500)

        return () => clearInterval(interval)
    }, [])

    return (
        <span className="font-mono tracking-wide">
            {text}
            {".".repeat(dots)}
        </span>
    )
}

export default LoadingDots