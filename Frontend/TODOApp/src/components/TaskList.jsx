import axios from "axios";

export default function TaskList({ tasks, fetchTasks }) {

  const toggleTask = async (id) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id} style={{ margin: "10px 0" }}>
          
          <h3 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </h3>

          {task.thumbnail && (
            <img
              src={`http://localhost:5000/${task.thumbnail}`}
              width="100"
            />
          )}

          <br />

          <button onClick={() => toggleTask(task.id)}>Toggle</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>

        </div>
      ))}
    </div>
  );
}