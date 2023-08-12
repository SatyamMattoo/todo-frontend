import React, { useContext, useEffect, useState } from "react";
import Tasks from "../components/Tasks";
import "../styles/home.scss";
import axios from "axios";
import { Context, server } from "..";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated} = useContext(Context);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [refresh,setRefresh]= useState(true);

  const updateTask = async (id) => {
    try {
      setLoad(true);
      await axios.put(
        `${server}/tasks/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setRefresh(prev=>!prev);
      toast.success("Task Updated");
    } catch (error) {
      toast.success(error.response.data.message);
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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/tasks/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRefresh(prev=>!prev);
      setLoading(false);
      toast.success(data.message);
      setTitle("");
      setDescription("");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/tasks/my`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="description"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button>{loading ? "Adding task..." : "Add"}</button>
      </form>

      <div className="tasksContainer">
        {tasks.map((i) => (
          <Tasks
            key={i._id}
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateTask={updateTask}
            deleteTask={deleteTask}
            id={i._id}
            loading={load}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
