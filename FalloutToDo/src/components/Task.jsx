import { useTheme } from '../context/ThemeContext'
import { useTasks } from '../context/TasksContext'
import { formatText } from '../utils/formatText'
import { useState } from 'react'
import PopUp from './PopUp'
const Task = ({ task, onUpdateTask }) => {
    const { colors } = useTheme()
    const { TASK_FLOW, deleteTask, updateTaskByKey } = useTasks()

    const [showButtons, setShowButtons] = useState(false)

    const [popUp, setPopUp] = useState({
        visible: false,
        title: "ARE YOU SURE YOU WANT TO DELETE THIS TASK?",
        subtitle: "Requesting task elimintation protocol...",
        content: "THIS ACTION CANNOT BE REVERTED",
    })

    const onDelete = () => {
        deleteTask(task.id)
        setPopUp(prev => ({ ...prev, visible: false }))
    }

    return (
        <>
            <div className='selectable flex gap-2 flex-col p-4 border-b border-dashed'
                style={{ borderColor: colors.primary }}
                onMouseEnter={() => setShowButtons(true)}
                onMouseLeave={() => setShowButtons(false)}
                onClick={()=>onUpdateTask(task)}>
                <div className="flex flex-row gap-2 items-start justify-between">
                    <h1>{task.title}</h1>
                    {/* action buttons */}
                    {/* Use opacity-0 instead of hidden when the title size problem is solved */}
                    <div className={`flex flex-row text-xs gap-2 ${showButtons ? "" : "hidden"}`}>
                        {TASK_FLOW[task.status].left
                            && <button
                                className='button border px-1 py-0.5'
                                style={{ borderColor: colors.primary }}
                                onClick={(e) => { updateTaskByKey(task.id, 'status', TASK_FLOW[task.status].left), e.stopPropagation() } }>[{`<`}]</button>}
                        <button className='button border px-1 py-0.5 flex-row flex items-center'
                            style={{ borderColor: colors.primary }}
                            onClick={(e) => { setPopUp(prev => ({ ...prev, visible: true })), e.stopPropagation() } }
                        >[<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>]</button>
                        {TASK_FLOW[task.status].right
                            && <button
                                className='button border px-1 py-0.5'
                                style={{ borderColor: colors.primary }}
                                onClick={(e) => { updateTaskByKey(task.id, 'status', TASK_FLOW[task.status].right), e.stopPropagation() } }>[{`>`}]</button>}
                    </div>
                </div>
                <p className='text-sm whitespace-pre-line'>{formatText(task.description)}</p>
            </div>
            {popUp.visible && <PopUp title={popUp.title} content={popUp.content} subtitle={popUp.subtitle} onConfirm={onDelete} onCancel={()=>setPopUp(prev => ({ ...prev, visible: false }))} />}
        </>

    )
}

export default Task