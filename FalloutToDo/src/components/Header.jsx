import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
function Header() {
    const [date, setDate] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date())   
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const {colors} = useTheme()
    return (
        <div className='flex flex-row w-full justify-between p-6 text-2xl items-start border-b'
            style={{ color: colors.primary, borderColor: colors.primary }}>
            <div className="flex flex-col gap-2">
                <h1 className='textGlow'>PIP-BOY 3000 MARK IV</h1>
                <h2 className='textGlow text-lg opacity-60'>{`> `}VAULT-OS [V.1.0]</h2>
            </div>
            <h2 className='text-xl'>{date.toLocaleTimeString()}</h2>
        </div>
    )
}

export default Header