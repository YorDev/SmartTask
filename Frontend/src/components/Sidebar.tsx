import { Check, Github, Moon, Sun } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-sm p-5 w-full md:w-1/5 flex flex-col justify-between max-h-screen">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="font-bold text-lg tracking-wide">SMARTTASK</div>
        </div>
        <div className="mb-6">
          <div className="font-medium text-xs uppercase tracking-wider mb-3 text-neutral-400">
            Menu
          </div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 py-2 px-2 hover:bg-gray-800 rounded cursor-pointer">
              <Check className="text-sm" />
              <span>Tasks</span>
            </li>
            <li className="flex items-center gap-2 py-1 px-2 hover:bg-gray-800 rounded cursor-pointer">
              <Github className="text-sm" />
              <span>Repository</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <button className="p-2 rounded-full hover:bg-gray-700">
          <Sun />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-700">
          <Moon />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
