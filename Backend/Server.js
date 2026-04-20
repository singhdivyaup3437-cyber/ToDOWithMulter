import express from "express";
import cors from "cors";
import upload from "./multerConfig.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/public", express.static("public"));

let tasks = [];

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// CREATE task
app.post("/api/tasks", upload.single("thumbnail"), (req, res) => {
  const { title } = req.body;

  const newTask = {
    id: Date.now().toString(),
    title,
    thumbnail: req.file ? req.file.path.replace(/\\/g, "/") : null,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// TOGGLE task
app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);

  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// DELETE task
app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});