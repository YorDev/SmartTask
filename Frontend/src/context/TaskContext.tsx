import React, { createContext, useContext, useState } from "react";

interface TaskContextType {
  refreshTasks: () => void;
  setRefreshTasks: React.Dispatch<React.SetStateAction<() => void>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshTasks, setRefreshTasks] = useState(() => () => {});

  return (
    <TaskContext.Provider value={{ refreshTasks, setRefreshTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
