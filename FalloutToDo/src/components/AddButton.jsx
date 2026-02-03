import { useTheme } from '../context/ThemeContext'

const AddButton = ({onClick}) => {
  const { colors } = useTheme()
  return (
    <button className='selectable border-2 rounded-sm border-dashed p-1 text-base'
      style={{ borderColor: colors.primary, color: colors.primary }}
      onClick={onClick}>
        [+ ADD TASK]
    </button>
  )
}

export default AddButton