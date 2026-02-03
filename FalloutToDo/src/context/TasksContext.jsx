import { createContext, useContext, useEffect, useState } from 'react'

const TasksContext = createContext()
export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    const TASK_FLOW = {
        TODO: {
            right: "IN_PROGRESS",
        },
        IN_PROGRESS: {
            left: "TODO",
            right: "DONE",
        },
        DONE: {
            left: "IN_PROGRESS",
        },
      }

    useEffect(() => {
        loadTasks()
    }, [])

    const loadTasks = () => {
        fetch('http://localhost:8000/api/tasks/')
            .then(res => res.json())
            .then(data => setTasks(data))
    }

    return <TasksContext.Provider value={{tasks, loadTasks, TASK_FLOW}}>
        {children}
    </TasksContext.Provider>
}

export const useTasks = () => useContext(TasksContext)