import React, { useState } from 'react'
import Tasks from '../components/Tasks'
import '../styles/home.scss'

const Home = () => {
  const [task,setTask]=useState("");
  const [description,setDescription]=useState("");
  const [tasks,setTasks]=useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(task, description);

    setTask("");
    setDescription("");
  }

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='Task Title' value={task} onChange={(e)=>setTask(e.target.value)} required/>
        <input type="description" placeholder='Task Description' value={description} onChange={(e)=>setDescription(e.target.value)} required/>
        <button>Add</button>
      </form>

      {tasks.map( (i) => {
        <Tasks />
      })}
    </div>
  )
}

export default Home