import { useContext, createContext } from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const colors = {
        primary: "#32e20e",
        background: "#0a0f06"
    }

    const theme = {
        colors: colors
    }
    return <ThemeContext.Provider value = {theme}>
        <div style={{'--primary': theme.colors.primary, '--bg': theme.colors.background, backgroundColor: theme.colors.background}}>
            {children}
        </div>
    </ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)