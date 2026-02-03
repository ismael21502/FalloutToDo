import { useTheme } from '../context/ThemeContext'
import { useTasks } from '../context/TasksContext'
import { formatText } from '../utils/formatText'
import { useState } from 'react'

const Task = ({ task }) => {
    const { colors } = useTheme()
    const { loadTasks, TASK_FLOW } = useTasks()
    const onDelete = () => {
        fetch(`http://localhost:8000/api/tasks/${task.id}/`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error deleting task")
                }
            })
            .then(() => {
                console.log("Task eliminada")
                loadTasks()
            })
            .catch(err => console.error(err))
    }

    const onMove = (newStatus) => {
        if (!newStatus) return
        console.log(newStatus)
        fetch(`http://localhost:8000/api/tasks/${task.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: newStatus
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error updating task")
                }
                return res.json()
            })
            .then(updatedTask => {
                console.log(updatedTask)
                loadTasks()
            })
            .catch(err => console.error(err))

    }

    const [showButtons, setShowButtons] = useState(false)
    return (
        <div className='selectable flex gap-2 flex-col p-4 border-b border-dashed'
            style={{ borderColor: colors.primary }}
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}>

            <div className="flex flex-row gap-2 items-start justify-between">
                <h1>{task.title}</h1>
                {/* action buttons */}
                 <div className={`flex flex-row text-xs gap-2 ${showButtons ? "" : "opacity-0"}`}>
                    {TASK_FLOW[task.status].left && <button className='button border px-1 py-0.5' style={{ borderColor: colors.primary }} onClick={() => onMove(TASK_FLOW[task.status].left)}>[{`<`}]</button>}
                    <button className='button border px-1 py-0.5 flex-row flex items-center'
                        style={{ borderColor: colors.primary }}
                        onClick={onDelete}
                    >[<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>]</button>
                    {TASK_FLOW[task.status].right && <button className='button border px-1 py-0.5' style={{ borderColor: colors.primary }} onClick={() => onMove(TASK_FLOW[task.status].right)}>[{`>`}]</button>}
                </div>
            </div>
            <p className='text-sm whitespace-pre-line'> {formatText(task.description)}</p>
        </div>
    )
}

export default Task