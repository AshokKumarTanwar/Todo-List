"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import UserInput from "./components/UserInput";
import AddButton from "./components/AddButton";
import ItemList from "./components/ItemList";

export default function Home() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/Task");

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      await axios.post("/api/Task", {
        text,
      });

      setText("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete("/api/Task", {
        data: { id },
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

const editTask = async (task: any) => {

  if (editId === task._id) {

    try {

      await axios.patch("/api/Task", {
        id: task._id,
        text,
      });

      setEditId("");
      setText("");

      fetchTasks();

    } catch (error) {
      console.log(error);
    }

  } else {

    setEditId(task._id);
    setText(task.text);

  }
};

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="todoContainer">

      <h1 className="todoHeading">
        Todo List
      </h1>

      <div className="inputSection">
        <UserInput
          value={text}
          onChange={setText}
        />

        <AddButton
          onClick={addTask}
          loading={loading}
        />
      </div>

      <ItemList
        items={tasks}
        onDelete={deleteTask}
        onEdit={editTask}
        editId={editId}
      />

    </div>
  );
}