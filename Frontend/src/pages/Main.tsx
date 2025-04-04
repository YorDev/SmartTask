import { Check, Github, Moon, Sun, User } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-sm p-5 w-full md:w-1/5 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="font-bold text-lg tracking-wide">SMARTTASK</div>
        </div>
        <div className="mb-6">
          <div className="font-medium text-xs uppercase tracking-wider mb-3 text-neutral-400">Menu</div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 py-2 px-2 hover:bg-gray-800 rounded cursor-pointer">
              <span className="material-symbols-outlined text-sm"><Check/></span>
              <span>To-do</span>
            </li>
            <li className="flex items-center gap-2 py-1 px-2 hover:bg-gray-800 rounded cursor-pointer">
              <span className="material-symbols-outlined text-sm"><Github /></span>
              <span>Repository</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <button className="p-2 rounded-full hover:bg-gray-700">
          <span className="material-symbols-outlined"><Sun/></span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-700">
          <span className="material-symbols-outlined"><Moon/></span>
        </button>
      </div>
    </div>
  );
};

const WelcomeMessage = () => {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-sm p-5 w-full lg:min-w-[500px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome, Name!</h1>
          <p className="text-gray-400 text-sm">What we gon do today?</p>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-gray-700 flex items-center justify-center">
          <span className="material-symbols-outlined"><User/></span>
        </button>
      </div>
    </div>
  );
}

const TaskList = () => {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-sm p-5 w-full lg:min-w-[500px]">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tasks</h2>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors text-sm">
              Add Task
            </button>
            <button className="px-4 py-1.5 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center gap-1 text-sm">
              <span className="text-yellow-400 text-xs">✦</span>
              AI Assist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AiAssistant = () => {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-5 w-full md:w-1/5 flex flex-col">
      <div className="mb-6 flex items-center gap-2">
        <div className="font-bold text-lg">AI Assist</div>
        <span className="text-yellow-400 text-lg">✦</span>
      </div>
      <p className="text-xs text-gray-400 mb-6">I can help u with whatever u need!</p>
      <div className="flex-1 overflow-y-auto">
        <div className="bg-gray-800 p-4 rounded-lg mb-3">
          <p className="text-xs text-gray-400 mb-1">Hi, Name</p>
          <p className="font-medium text-sm">How can I help u?</p>
        </div>
      </div>
      <div className="mt-4 relative">
        <input type="text" placeholder="Write Something..." className="w-full p-3 pr-10 border border-gray-700 rounded focus:ring-1 focus:ring-primary-300 text-sm bg-gray-800 text-white"/>
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500">
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
};

const TestPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-950 p-4 text-white gap-4">
      <Sidebar />
      <div className="flex flex-col gap-4 w-full">
        <WelcomeMessage />
        <TaskList />
      </div>
      <AiAssistant />
    </div>
  );
};

export default TestPage;
