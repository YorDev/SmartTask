import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";
import WelcomeMessage from "../components/WelcomeMessage";
import AiAssistant from "../components/AiAssistant";

const Main = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-950 p-4 text-white gap-4 max-h-screen">
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
