import React from 'react'
import "../styles/tasks.scss"

const Tasks = ({title,description,isCompleted,deleteTask,updateTask,id,loading}) => {
  return (
    <div className='taskItem'>
      <div className="task">
        <h3 className="taskTitle">{title}</h3>
        <p className="taskDescription">{description}</p>
      </div>
      <div className="taskUpdate">
        <input type="checkbox" onChange={()=>updateTask(id)} checked={isCompleted}/>
        <button onClick={()=>deleteTask(id)}>{loading?"Deleting...":"Delete"}</button>
      </div>
    </div>
  )
}

export default Tasks