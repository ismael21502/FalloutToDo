import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import TaskInput from './TaskInput'
import TaskTextArea from './TaskTextArea'

function AddTaskModal({ onClose, modalTitle="", task, onConfirm }) {
    const { colors } = useTheme()
    const [title, setTitle] = useState(task?.title ?? "")
    const [description, setDescription] = useState(task?.description ?? "")
    
    const handleConfirm = (e) => {
        e.preventDefault()
        onConfirm(title, description)
    }
    return (
        <div className='flex fixed inset-0 w-full h-full bg-black/50 z-100 items-center justify-center'>
            <div className="glow flex flex-col h-[90%] aspect-7/8 max-w-[90vw] border-6 p-6 gap-4"
                style={{ borderColor: colors.primary, backgroundColor: colors.background, color: colors.primary }}>
                <h1 className='text-4xl'>{modalTitle}</h1>
                <div className='border-b-3' style={{ borderColor: colors.primary }} />
                <form className='flex flex-1 flex-col gap-6 text-base overflow-y-auto'>
                    <div className="flex flex-col gap-2">
                        <p>Task title</p>
                        <TaskInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder={"Enter task title"} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Description</p>
                        <TaskTextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={"Enter task description (optional)"} type='textarea' />
                    </div>
                    <div className="flex flex-row gap-4 text-xl mt-auto">
                        <button className='button flex flex-1 justify-center border-2 p-2'
                            onClick={onClose}
                            style={{ borderColor: colors.primary }}>[ CANCEL ]</button>
                        <button className='button flex flex-1 justify-center border-2 p-2'
                            onClick={handleConfirm}
                            style={{ borderColor: colors.primary }}
                            type='submit'>[ CONFIRM ]</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTaskModal