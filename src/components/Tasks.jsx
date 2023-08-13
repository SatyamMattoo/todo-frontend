import React, { useState } from 'react'
import "../styles/tasks.scss"
import axios from 'axios';
import { server } from '..';
import { toast } from 'react-hot-toast';

const Tasks = ({title,description,isCompleted,updateTask,setRefresh,id}) => {
  const [load, setLoad] = useState(false);
  
  const synth = window.speechSynthesis;
  
    const handleSpeak = () => {
      if (title.trim() !== '') {
        const utterance = new SpeechSynthesisUtterance(title);
        synth.speak(utterance);
      }
    };

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
        <button className="speak-button" onClick={handleSpeak}>&#128264;</button>
      </div>
    </div>
  )
}

export default Tasks