import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";
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

const AiAssistant = () => {
  const [task, setTask] = useState<TaskType[]>([]);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const { refreshTasks } = useTaskContext();

  useEffect(() => {
    getTasks();
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

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await api.post("/api/chatgpt/", { prompt: input });
      const aiResponse = { sender: "ai", text: response.data.response };

      setMessages((prev) => [...prev, aiResponse]);

      // Usar refreshTasks del contexto
      refreshTasks();
    } catch (error) {
      console.error("Error al comunicarse con la API de ChatGPT:", error);
      const errorMessage = {
        sender: "ai",
        text: "Lo siento, no pude procesar tu solicitud.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-5 w-full md:w-1/4 flex flex-col max-h-screen overflow-hidden">
      <div className="mb-6 flex items-center gap-2">
        <div className="font-bold text-lg">AI Assist</div>
        <span className="text-yellow-400 text-lg">✦</span>
      </div>
      <p className="text-xs text-gray-400 mb-6">How can i help u?</p>
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg mb-3 ${
              message.sender === "user"
                ? "bg-gray-700 text-right"
                : "bg-gray-800"
            }`}
          >
            <p className="text-xs text-gray-400 mb-1">
              {message.sender === "user" ? "You" : "AI"}
            </p>
            <p className="font-medium text-sm">{message.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 relative">
        <input
          type="text"
          placeholder="Write Something..."
          className="w-full p-3 pr-10 border border-gray-700 rounded focus:ring-1 focus:ring-primary-300 text-sm bg-gray-800 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500"
          onClick={handleSendMessage}
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
};

export default AiAssistant;
