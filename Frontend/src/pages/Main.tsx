import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";
import WelcomeMessage from "../components/WelcomeMessage";
import AiAssistant from "../components/AiAssistant";
import { useTheme } from "../context/ThemeContext";

const Main = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen ${
        isDarkMode ? "bg-gray-950" : "bg-gray-100"
      } p-4 gap-4 max-h-screen`}
    >
      <Sidebar />
      <div className="flex flex-col gap-4 w-full">
        <WelcomeMessage />
        <TaskList />
      </div>
      <AiAssistant />
    </div>
  );
};

export default Main;
