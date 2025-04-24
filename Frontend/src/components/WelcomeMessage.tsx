import { useState, useEffect } from "react";
import api from "../api/api";
import { User } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const WelcomeMessage = () => {
  const [userName, setUserName] = useState("");
  const { isDarkMode } = useTheme();

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
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } rounded-lg shadow-sm p-5 w-full lg:min-w-[500px]`}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome{userName}!</h1>
          <p
            className={`${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            } text-sm`}
          >
            What we gonna do today?
          </p>
        </div>
        <button
          className={`w-10 h-10 rounded-full ${
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } flex items-center justify-center`}
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
