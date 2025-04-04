import { Bot } from "lucide-react";
import { useState } from "react";

const AiAssist = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Simulación de respuesta de IA
    setTimeout(() => {
      setResponse(`🤖 AI says: "${message}" sounds important!`);
    }, 1000);

    setMessage("");
  };

  return (
    <div className="bg-white p-5 rounded shadow h-full text-black">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Bot className="mr-2" size={20} /> AI Assist ✨
      </h2>
      <p className="text-gray-500">I can help u with whatever u need!</p>
      <div className="mt-5 border p-3 rounded-lg bg-gray-50">
        <p className="font-medium">Hi, Name</p>
        <p className="text-gray-700 font-semibold">How can I help u?</p>
        {response && <p className="mt-2 text-blue-500">{response}</p>}
      </div>
      <div className="mt-3 flex">
        <input
          type="text"
          className="border p-2 flex-grow rounded-l"
          placeholder="Write Something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
};

export default AiAssist;
