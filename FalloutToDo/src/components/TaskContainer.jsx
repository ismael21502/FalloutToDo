import Task from './Task'
import AddButton from './AddButton'
import { useTheme } from '../context/ThemeContext'
import { useTasks } from '../context/TasksContext'
import LoadingDots from './LoadingDots'

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
        <div className="flex flex-1 p-6 opacity-70">
          <LoadingDots text='LOADING TASKS' />
        </div>
      ) : (
        <div className="flex flex-9 min-h-0 flex-col overflow-y-auto mb-8 gap-2">
          {tasks.length > 0 ? tasks.map(task => (
            <Task key={task.id} task={task} onUpdateTask={onUpdateTask} />
          ))
            : <p className='text-lg opacity-70'>NO TASKS AVAILABLE</p>}
        </div>
      )}
      <AddButton onClick={onAddTask} />
    </div>
  )
}

export default TaskContainer