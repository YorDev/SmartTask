<<<<<<< HEAD
import { Trash } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
=======
import React, { useState } from "react";
>>>>>>> d7c6c70215bf74e63b102a18a480d7efc3cbae23

interface Task {
  task: {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    due_date: string;
  };
  onDelete: (id: number) => void;
}

<<<<<<< HEAD
const Task: React.FC<Task> = ({ task }) => {
  const { isDarkMode } = useTheme();

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <li className="flex items-center justify-between cursor-pointer p-3 bg-transparent hover:bg-opacity-50 rounded transition-colors">
      <div className="flex items-center gap-2">
        <div>
          <div
            className={`font-medium text-sm ${
              isDarkMode ? "text-neutral-200" : "text-gray-900"
            }`}
          >
            {task.title}
          </div>
          <div
            className={`text-sm ${
              isDarkMode ? "text-neutral-400" : "text-gray-600"
            }`}
          >
            {formatDateTime(task.due_date)}
          </div>
        </div>
      </div>
    </li>
=======
const Task: React.FC<Task> = ({ task, onDelete }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="task-container">
      <li className="flex items-center justify-between p-3 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-neutral-600 bg-neutral-900 text-neutral-300 cursor-pointer"
          />
          <div>
            <div className="font-medium text-sm text-neutral-200">
              {task.title}
            </div>
            <div className="text-sm text-neutral-400">{task.due_date}</div>
          </div>
        </div>
        <button className="p-1 hover:bg-neutral-600 rounded transition-colors">
          <button
            className="material-symbols-outlined text-neutral-500 text-sm"
            onClick={() => onDelete(task.id)}
          >
            delete
          </button>
        </button>
      </li>
    </div>
>>>>>>> d7c6c70215bf74e63b102a18a480d7efc3cbae23
  );
};

export default Task;
