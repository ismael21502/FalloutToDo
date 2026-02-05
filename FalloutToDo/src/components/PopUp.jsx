import { useTheme } from "../context/ThemeContext"

function PopUp({ title = "", content = "", subtitle = "", onCancel, onConfirm }) {
    const { colors } = useTheme()
    return (
        <div className="fixed flex flex-1 inset-0 bg-black/20 items-center justify-center z-100">
            <div className="glow flex flex-col h-[80%] lg:h-[70%] max-w-[90%] aspect-square border-6 p-6 gap-4"
                style={{ backgroundColor: colors.background, borderColor: colors.primary, color: colors.primary }}>
                <div className="textGlow flex flex-row gap-4 w-full text-4xl items-center border-b-4 py-4 mb-4 justify-center"
                    style={{ borderColor: colors.primary }}>
                    {/* <svg className="w-[30px] blink" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert-icon lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg> */}
                    <svg
                        className="blink"
                        style={{ fill: colors.primary }}
                        xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="1em" viewBox="0 0 24 24" width="1em"><g><rect fill="none" height="24" width="24" /></g><g><g><g><path d="M12,5.99L19.53,19H4.47L12,5.99 M12,2L1,21h22L12,2L12,2z" /><polygon points="13,16 11,16 11,18 13,18" /><polygon points="13,10 11,10 11,15 13,15" /></g></g></g></svg>
                    <h1>CRITICAL WARNING</h1>
                </div>
                <h3 className="opacity-60 text-xl">{`>`} {subtitle}</h3>
                <h2 className="text-4xl textGlow">{title}</h2>
                <p className="text-xl opacity-70">{content}</p>

                <div className="flex flex-row flex-1 items-end gap-4">
                    <button className="selectable flex flex-1 p-4 text-2xl border-4 justify-center"
                        onClick={onCancel}>[NO/ABORT]</button>
                    <button className="button flex flex-1 p-4 text-2xl border-4 justify-center"
                        onClick={onConfirm}>[YES/DELETE]</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp