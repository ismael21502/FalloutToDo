function TaskInput({ value, onChange, defaultValue="", placeholder, type = "text" }) {
    return (
        <div className="input flex flex-row border-b-2 pb-2 gap-2 items-center">
            <span>{`>`}</span>
            <input
                type={type}
                placeholder={placeholder}
                className='w-full outline-none bg-transparent'
                onChange={onChange}
                value={value}/>
        </div>
    )
}

export default TaskInput