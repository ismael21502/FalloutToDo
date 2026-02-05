import { useTheme } from '../context/ThemeContext'
function Header() {
    const { colors } = useTheme()
    return (
        <div className='flex flex-row w-full justify-between p-6 text-2xl items-start border-b'
            style={{ color: colors.primary, borderColor: colors.primary }}>
            <div className="flex flex-col gap-2">
                <h1 className='textGlow'>PIP-BOY 3000 MARK IV</h1>
                <h2 className='textGlow text-lg opacity-60'>{`> `}VAULT-OS [V.1.0]</h2>
            </div>
            {/* <div className="selectable p-1 flex-row gap-4 text-lg">
                <h3>[LOGIN]</h3>
                <h3>[REGISTER]</h3>
            </div> */}
        </div>
    )
}

export default Header