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
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="task-container">
      <li className="flex items-center justify-between p-3 bg-neutral-50 rounded hover:bg-neutral-100 transition-colors">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-neutral-300 cursor-pointer"
          />
          <div>
            <div className="font-medium text-sm">Buy bread</div>
            <div className="text-sm text-gray-500">{task.due_date}</div>
          </div>
        </div>
        <button className="p-1 hover:bg-neutral-200 rounded transition-colors">
          <button
            className="material-symbols-outlined text-neutral-400 text-sm "
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
