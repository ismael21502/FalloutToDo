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

    const deleteTask = (taskId) => {
        if (!taskId) return
        fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error deleting task")
                }
            })
            .then(() => {
                // console.log("Task eliminada")
                setTasks(tasks.filter(task => task.id !== taskId))
            })
            .catch(err => console.error(err))

    }

    const updateTask = (taskId, newObj) => {
        if (!taskId) return
        fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
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
                // console.log(updatedTask)
                setTasks(tasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                ))
            })
            .catch(err => console.error(err))
    }

    const updateTaskByKey = (taskId, key, newVal) => {
        if (!newVal || !key) return
        fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
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
                // console.log(updatedTask)
                setTasks(tasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                ))
            })
            .catch(err => console.error(err))

    }

    const createTask = (title, description, status) => {
        fetch("http://localhost:8000/api/tasks/", {
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
                console.log("Task creada:", data)
                setTasks(prev => [...prev, data])
            })
            .catch(err => {
                console.error(err)
            })
    }

    return <TasksContext.Provider value={{ tasks, loadTasks, TASK_FLOW, deleteTask, updateTask, updateTaskByKey, createTask }}>
        {children}
    </TasksContext.Provider>
}

export const useTasks = () => useContext(TasksContext)