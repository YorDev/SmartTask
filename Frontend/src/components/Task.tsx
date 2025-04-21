import React, { useState } from "react";

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

const Task: React.FC<Task> = ({ task, onDelete }) => {
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <div className="task-container">
      <li className="flex items-center justify-between p-3 bg-gray-900 rounded hover:bg-gray-800 transition-colors">
        <div className="flex items-center gap-2">
          <div>
            <div className="font-medium text-sm text-neutral-200">
              {task.title}
            </div>
            <div className="text-sm text-neutral-400">
              {formatDateTime(task.due_date)}
            </div>
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
  );
};

export default Task;
