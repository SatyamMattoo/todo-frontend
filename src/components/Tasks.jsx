import React, { useState } from 'react'
import "../styles/tasks.scss"

const Tasks = ({title,description,isCompleted,updateTask,id}) => {
  const [load, setLoad] = useState(false);

  const deleteTask = async (id) => {
    try {
      setLoad(true);
      await axios.delete(
        `${server}/tasks/${id}`,
        {
          withCredentials: true,
        }
        );
        setRefresh(prev=>!prev);
        setLoad(false);
        toast.success("Task Deleted");
      } catch (error) {
        setLoad(false);
        toast.success(error.response.data.message);
      }
    };
  return (
    <div className='taskItem'>
      <div className="task">
        <h3 className="taskTitle">{title}</h3>
        <p className="taskDescription">{description}</p>
      </div>
      <div className="taskUpdate">
        <input type="checkbox" onChange={()=>updateTask(id)} checked={isCompleted}/>
        <button onClick={()=>deleteTask(id)}>{load?"Deleting...":"Delete"}</button>
      </div>
    </div>
  )
}

export default Tasks