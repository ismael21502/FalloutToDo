import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TasksProvider } from './context/TasksContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TasksProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TasksProvider>
  </StrictMode>,
)
