import { useTheme } from "../context/ThemeContext"
import { useState, useEffect } from "react"
function Footer() {
    const { colors } = useTheme()
    const [date, setDate] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-row justify-between py-4 px-6 border-t"
        style={{borderColor: colors.primary, color: colors.primary}}>
            <div className="text-sm opacity-70">VAULT-TEC INDUSTRIES © 2077</div>
            <div className="">{date.toLocaleTimeString()}</div>
        </div>
    )
}

export default Footer