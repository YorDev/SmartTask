import { ListChecks, BarChart3 } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-60 bg-gray-100 h-screen p-5 flex flex-col text-black">
      <h1 className="text-2xl font-bold mb-6">SMARTTASK</h1>
      <nav className="flex-grow">
        <ul>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer">
            <ListChecks className="mr-2" size={20} /> To-do
          </li>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer">
            <BarChart3 className="mr-2" size={20} /> Analytics
          </li>
        </ul>
      </nav>
      <div className="mt-auto p-2 text-center text-gray-600">⚙️</div>
    </aside>
  );
};

export default Sidebar;
