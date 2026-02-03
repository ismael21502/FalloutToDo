import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import TaskContainer from './components/TaskContainer'
import { useTasks } from './context/TasksContext'
import { useTheme } from './context/ThemeContext'
import AddTaskModal from './components/AddTaskModal'
function App() {
  const { tasks, loadTasks } = useTasks()
  const { colors } = useTheme()

  const [taskStatusLabel, setTaskStatusLabel] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  const [taskStatus, setTaskStatus] = useState("")
  const openModal = (label, status) => {
    // fetch

    setTaskStatusLabel(label)
    setModalVisible(true)
    setTaskStatus(status)
  }

  const onSendTask = (title, description) => {
    fetch("http://localhost:8000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        status: taskStatus
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Error creating task")
        }
        loadTasks()
        return res.json()
      })
      .then(data => {
        console.log("Task creada:", data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <div className='flex flex-col h-[100dvh] p-[2%]'>
      <div className="flex flex-col h-full w-full border-25 rounded-[50px]"
        style={{ borderColor: "#23251f", backgroundColor: colors.background }}>
        <Header />
        <div className="flex flex-9 flex-row overflow-y-hidden ">
          <TaskContainer title={"01. TO DO"} tasks={tasks?.filter(task => task.status === "TODO")} onAddTask={() => openModal("TODO", "TODO")} />
          <span className="border-l" style={{ borderColor: colors.primary }}></span>
          <TaskContainer title={"02. IN PROGRESS"} tasks={tasks?.filter(task => task.status === "IN_PROGRESS")} onAddTask={() => openModal("IN PROGRESS", "IN_PROGRESS")} />
          <span className="border-l" style={{ borderColor: colors.primary }}></span>
          <TaskContainer title={"03. DONE"} tasks={tasks?.filter(task => task.status === "DONE")} onAddTask={() => openModal("DONE", "DONE")} />
        </div>
        <div className="filter" />
      </div>

      {modalVisible && <AddTaskModal status={taskStatusLabel} onClose={() => setModalVisible(false)} onConfirm={onSendTask} />}
    </div>

  )
}

export default App
