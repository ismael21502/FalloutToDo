import Task from './Task'
import AddButton from './AddButton'
import { useTheme } from '../context/ThemeContext'
import { useTasks } from '../context/TasksContext'
const TaskContainer = ({ title, tasks, onAddTask, onUpdateTask }) => {
  const { colors } = useTheme()
  const { loading } = useTasks()

  return (
    <div className='flex flex-1 flex-col p-4 text-2xl'
      style={{ color: colors.primary }}>
      <h1 className='textGlow mb-2'>{title}</h1>
      <div className="w-full border-b-2 mb-4"
        style={{ borderColor: colors.primary }}></div>
      {loading ? (
        <div className='flex-1 flex justify-center items-center text-xl opacity-50'>
          Loading tasks...</div>
      ) : (
          <div className="flex flex-9 min-h-0 flex-col overflow-y-auto mb-8 gap-2">
            {tasks.length > 0 ? tasks.map(task => (
              <Task key={task.id} task={task} onUpdateTask={onUpdateTask} />
            ))
              : <p className='text-lg opacity-70'>No tasks available</p>}
          </div>
      )}  
      <AddButton onClick={onAddTask} />
    </div>
  )
}

export default TaskContainer