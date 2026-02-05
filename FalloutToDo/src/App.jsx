import { useState } from 'react'
import Header from './components/Header'
import TaskContainer from './components/TaskContainer'
import { useTasks } from './context/TasksContext'
import { useTheme } from './context/ThemeContext'
import AddTaskModal from './components/AddTaskModal'
import Footer from './components/Footer'

function App() {
  const { tasks, createTask, updateTask } = useTasks()
  const { colors } = useTheme()

  const [modal, setModal] = useState({
    modalTitle: "",
    modalVisible: false,
    task: {},
    onConfirm: null,
  })

  const openCreateTask = (label, status) => {
    setModal(prev=>({...prev,
      modalTitle: `NEW TASK (${label})`, 
      modalVisible: true,
      task: {},
      onConfirm:  (title, description) => {
        createTask(title, description, status)
        hideModal()
      }
    }))
  }

  const openUpdateTask = (task) => {
    setModal(prev=>({...prev,
      modalTitle: `Modify: ${task.title}`,
      modalVisible: true,
      task: task,
      onConfirm: (title, description) => {
        updateTask(task.id, {
          title: title,
          description: description,
        })
        hideModal()
      }
    }))
  }

  const hideModal = () => {
    setModal(prev => ({ ...prev, modalVisible: false }))
  }
  
  return (
    <div className='flex flex-col h-[100dvh] p-[2%]'>
      <div className="relative h-full w-full border-[max(2vw,3vh)] rounded-[50px] overflow-hidden"
        style={{ borderColor: "#23251f" }}>
        <div className="flex flex-col w-full h-full blink"
          style={{ backgroundColor: colors.background }}>
          <Header />
          <div className="flex flex-9 flex-row overflow-y-hidden ">
            <TaskContainer
              title={"01. TO DO"}
              tasks={tasks?.filter(task => task.status === "TODO")}
              onAddTask={() => openCreateTask("TO DO", "TODO")} 
              onUpdateTask={openUpdateTask}/>
            <span className="border-l" style={{ borderColor: colors.primary }}></span>
            <TaskContainer
              title={"02. IN PROGRESS"}
              tasks={tasks?.filter(task => task.status === "IN_PROGRESS")}
              onAddTask={() => openCreateTask("IN PROGRESS", "IN_PROGRESS")} 
              onUpdateTask={openUpdateTask}/>
            <span className="border-l" style={{ borderColor: colors.primary }}></span>
            <TaskContainer
              title={"03. DONE"}
              tasks={tasks?.filter(task => task.status === "DONE")}
              onAddTask={() => openCreateTask("DONE", "DONE")} 
              onUpdateTask={openUpdateTask}/>
          </div>
          <Footer />
          {/* <div className="filter blink" /> */}
        </div>
        <div className="absolute inset-0 filter blink"></div>
      </div>
      {modal.modalVisible && <AddTaskModal modalTitle={modal.modalTitle} task={modal.task} onClose={hideModal} onConfirm={modal.onConfirm} />}
    </div>

  )
}

export default App
