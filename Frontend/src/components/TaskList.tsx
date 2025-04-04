import { useEffect, useState } from "react";
import TaskItem from "../api/TaskItem";

const API_URL = "http://localhost:5000/tasks";

interface Task {
  id: number;
  task: string;
  time: string;
  completed: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // Cargar tareas desde la API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Agregar tarea nueva
  const addTask = () => {
    if (!newTask.trim()) return;

    const taskData = {
      task: newTask,
      time: "08:00",
      completed: false,
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    })
      .then((res) => res.json())
      .then((data) => setTasks([...tasks, data]));

    setNewTask("");
  };

  // Eliminar tarea
  const deleteTask = (id: number) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)));
  };

  return (
    <div className="bg-white p-5 rounded shadow text-black">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>

      {/* Formulario para agregar tarea */}
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded-l"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded-r">
          Add
        </button>
      </div>

      {/* Lista de tareas */}
      {tasks.map((task) => (
        <TaskItem key={task.id} {...task} onDelete={deleteTask} />
      ))}
    </div>
  );
};

export default TaskList;
