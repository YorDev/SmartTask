import { Trash } from "lucide-react";

interface EditTaskViewProps {
  taskId: number;
  onDelete: (id: number) => void;
}

const EditTaskView: React.FC<EditTaskViewProps> = ({ taskId, onDelete }) => {
  return (
    <div className="flex justify-end p-4">
      <button
        onClick={() => onDelete(taskId)}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        <Trash className="h-4 w-4" />
        Eliminar tarea
      </button>
    </div>
  );
};

export default EditTaskView;
