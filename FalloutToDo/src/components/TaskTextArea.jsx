import React from 'react'

function TaskTextArea({ value, onChange, placeholder }) {
  return (
      <div className="input flex flex-row border-b-2 pb-2 gap-2">
          <span>{`>`}</span>
          <textarea 
          rows={4} 
          placeholder={placeholder} 
          className='w-full outline-none bg-transparent' 
          onChange={onChange} 
          value={value} 
          style={{resize: 'none'}}/>
      </div>
  )
}

export default TaskTextArea