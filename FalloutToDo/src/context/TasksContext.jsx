import { createContext, useContext, useEffect, useState } from 'react'

const TasksContext = createContext()
export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState()
    // const backendUrl = 'http://localhost:8000'
    // const BACKEND_URL = 'https://fallouttodo-production.up.railway.app'
    const API_URL = import.meta.env.VITE_API_URL
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
        setLoading(true)
        fetch(`${API_URL}/api/tasks/`)
            .then(res => res.json())
            .then(data => {
                setTasks(data)
                setLoading(false)
            })
    }

    const deleteTask = (taskId) => {
        if (!taskId) return
        fetch(`${API_URL}/api/tasks/${taskId}/`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error deleting task")
                }
            })
            .then(() => {
                setTasks(tasks.filter(task => task.id !== taskId))
            })
            .catch(err => console.error(err))

    }

    const updateTask = (taskId, newObj) => {
        if (!taskId || !newObj) return
        fetch(`${API_URL}/api/tasks/${taskId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObj)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error updating task")
                }
                return res.json()
            })
            .then(updatedTask => {
                setTasks(tasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                ))
            })
            .catch(err => console.error(err))
    }

    const updateTaskByKey = (taskId, key, newVal) => {
        if (!newVal || !key || !taskId) return
        fetch(`${API_URL}/api/tasks/${taskId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                [key]: newVal
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error updating task")
                }
                return res.json()
            })
            .then(updatedTask => {
                setTasks(tasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                ))
            })
            .catch(err => console.error(err))

    }

    const createTask = (title, description, status) => {
        fetch(`${API_URL}/api/tasks/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description,
                status: status
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error creating task")
                }
                return res.json()
            })
            .then(data => {
                setTasks(prev => [...prev, data])
            })
            .catch(err => {
                console.error(err)
            })
    }

    return <TasksContext.Provider value={{ 
        tasks, 
        TASK_FLOW, 
        loadTasks, deleteTask, updateTask, updateTaskByKey, createTask, 
        loading }}>
        {children}
    </TasksContext.Provider>
}

export const useTasks = () => useContext(TasksContext)