import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";
import Task from "./Task";
import { Trash } from "lucide-react";
import { useTaskContext } from "../context/TaskContext";

interface TaskType {
  category: string | number | readonly string[] | undefined;
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
}

const TaskList = () => {
  const [task, setTask] = useState<TaskType[]>([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { setRefreshTasks } = useTaskContext();

  const PRIORITY_CHOICES = ["", "Baja", "Media", "Alta"];
  const STATUS_CHOICES = ["", "Pendiente", "En progreso", "Completada"];

  useEffect(() => {
    getTasks();
    setRefreshTasks(() => getTasks);
  }, []);

  const getTasks = async () => {
    try {
      const res = await api.get("/api/tasks/");
      const data = res.data;
      setTask(data);
      console.log(data);
    } catch (err) {
      alert(err);
    }
  };

  const deleteTask = (id: number): void => {
    api
      .delete(`/api/task/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) console.log("Note deleted!");
        else alert("Failed to delete note.");
        getTasks();
      })
      .catch((error: unknown) => alert(error));
  };

  const tasksByStatus = {
    Pendiente: task.filter((t) => t.status === "Pendiente"),
    "En progreso": task.filter((t) => t.status === "En progreso"),
    Completada: task.filter((t) => t.status === "Completada"),
  };

  const createTask = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    api
      .post("/api/tasks/", {
        user,
        title,
        description,
        due_date: `${dueDate}T${dueTime}`,
        category,
        priority,
        status,
      })
      .then((res) => {
        if (res.status === 201) console.log("Task created!");
        else alert("Failed to create task.");
        getTasks();
      })
      .catch((err: unknown) => alert(err));
  };

  const handleTaskClick = (task: TaskType) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const updateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTask) return;

    try {
      const res = await api.put(
        `/api/tasks/update/${selectedTask.id}/`,
        selectedTask
      );
      if (res.status === 200) {
        console.log("Task updated!");
        getTasks();
        setShowEditModal(false);
      } else {
        alert("Failed to update task.");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-sm p-5 w-full lg:min-w-[500px]">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tasks</h2>
          <div className="flex gap-2">
            <button
              className="px-4 py-1.5 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors text-sm"
              onClick={() => setShowModal(true)}
            >
              Add Task
            </button>
            <button className="px-4 py-1.5 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center gap-1 text-sm">
              <span className="text-yellow-400 text-xs">✦</span>
              AI Assist
            </button>
          </div>
        </div>
        {/* Ventana emergente */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">Create a Task</h2>
              <form
                onSubmit={(e) => {
                  createTask(e);
                  setShowModal(false);
                }}
              >
                <label htmlFor="title">Title:</label>
                <br />
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                />
                <label htmlFor="description">Description:</label>
                <br />
                <textarea
                  id="description"
                  name="description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                ></textarea>
                <label htmlFor="due_date">Due Date:</label>
                <br />
                <input
                  type="date"
                  id="due_date"
                  name="due_date"
                  required
                  onChange={(e) => setDueDate(e.target.value)}
                  value={dueDate}
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                />
                <label htmlFor="due_time">Due Time:</label>
                <br />
                <input
                  type="time"
                  id="due_time"
                  name="due_time"
                  required
                  onChange={(e) => setDueTime(e.target.value)}
                  value={dueTime}
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                />
                <label htmlFor="category">Category:</label>
                <br />
                <input
                  type="text"
                  id="category"
                  name="category"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                />
                <label htmlFor="priority">Priority:</label>
                <br />
                <select
                  id="priority"
                  name="priority"
                  required
                  onChange={(e) => setPriority(e.target.value)}
                  value={priority}
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                >
                  {PRIORITY_CHOICES.map((choice) => (
                    <option key={choice} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
                <label htmlFor="status">Status:</label>
                <br />
                <select
                  id="status"
                  name="status"
                  required
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                >
                  {STATUS_CHOICES.map((choice) => (
                    <option key={choice} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="overflow-auto scrollbar-hide min-h-[657px]">
          <div className="flex gap-4">
            {Object.entries(tasksByStatus).map(([status, tasks]) => (
              <div key={status} className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{status}</h3>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskClick(task)}
                      className={`
                        ${
                          task.status === "Pendiente"
                            ? "bg-yellow-800 hover:bg-yellow-900"
                            : ""
                        }
                        ${
                          task.status === "En progreso"
                            ? "bg-green-800 hover:bg-green-900"
                            : ""
                        }
                        ${
                          task.status === "Completada"
                            ? "bg-blue-800 hover:bg-blue-900"
                            : ""
                        }
                        rounded-lg transition-colors
                      `}
                    >
                      <Task task={task} onDelete={deleteTask} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Ventana emergente para editar tarea */}
        {showEditModal && selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">Edit Task</h2>
              <form onSubmit={updateTask}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={selectedTask.title}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, title: e.target.value })
                  }
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                />
                <label htmlFor="description">Description:</label>
                <br />
                <textarea
                  id="description"
                  name="description"
                  required
                  value={selectedTask.description}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                ></textarea>
                <label htmlFor="due_date">Due Date:</label>
                <br />
                <input
                  type="date"
                  id="due_date"
                  name="due_date"
                  required
                  value={selectedTask.due_date.split("T")[0]} // Extraer solo la fecha
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      due_date: `${e.target.value}T${
                        selectedTask.due_date.split("T")[1]
                      }`,
                    })
                  }
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                />
                <label htmlFor="due_time">Due Time:</label>
                <br />
                <input
                  type="time"
                  id="due_time"
                  name="due_time"
                  required
                  value={selectedTask.due_date.split("T")[1]} // Extraer solo la hora
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      due_date: `${selectedTask.due_date.split("T")[0]}T${
                        e.target.value
                      }`,
                    })
                  }
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                />
                <label htmlFor="category">Category:</label>
                <br />
                <input
                  type="text"
                  id="category"
                  name="category"
                  required
                  value={selectedTask.category}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      category: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                />
                <label htmlFor="priority">Priority:</label>
                <br />
                <select
                  id="priority"
                  name="priority"
                  required
                  value={selectedTask.priority}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      priority: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                >
                  {PRIORITY_CHOICES.map((choice) => (
                    <option key={choice} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
                <label htmlFor="status">Status:</label>
                <br />
                <select
                  id="status"
                  name="status"
                  required
                  value={selectedTask.status}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, status: e.target.value })
                  }
                  className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                >
                  {STATUS_CHOICES.map((choice) => (
                    <option key={choice} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
                <div className="flex justify-between gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                    onClick={() => {
                      deleteTask(selectedTask.id);
                      setShowEditModal(false);
                    }}
                  >
                    <Trash className="h-4 w-4 inline mr-2" />
                    Delete
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
