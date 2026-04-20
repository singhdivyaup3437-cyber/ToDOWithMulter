import { useState } from "react";
import axios from "axios";

export default function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    if (file) formData.append("thumbnail", file);

    await axios.post("http://localhost:5000/api/tasks", formData);

    setTitle("");
    setFile(null);
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button>Add Task</button>
    </form>
  );
}