import { useState, useEffect } from "react";
import api from "../api/api";
import { User } from "lucide-react";

const WelcomeMessage = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await api.get("/api/getuser");
        const data = res.data;
        setUserName(data.username);
        console.log(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-sm p-5 w-full lg:min-w-[500px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome, User{userName}!</h1>
          <p className="text-gray-400 text-sm">What we gon do today?</p>
        </div>
        <button
          className="w-10 h-10 rounded-full hover:bg-gray-700 flex items-center justify-center"
          onClick={() => {
            window.location.href = "/logout";
          }}
        >
          <User />
        </button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
