import { Trash } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

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
  );
};

export default Task;
