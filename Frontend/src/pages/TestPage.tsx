
const Sidebar = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 w-full md:w-1/5 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="font-bold text-lg tracking-wide">SMARTTASK</div>
        </div>
        <div className="mb-6">
          <div className="font-medium text-xs uppercase tracking-wider mb-3 text-neutral-500">Menu</div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 py-2 px-2 hover:bg-neutral-100 rounded cursor-pointer">
              <span className="material-symbols-outlined text-sm">check_box</span>
              <span>To-do</span>
            </li>
            <li className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
              <span className="material-symbols-outlined text-sm">bar_chart</span>
              <span>Analytics</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <button className="p-2 rounded-full hover:bg-neutral-100">
          <span className="material-symbols-outlined">light_mode</span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined">dark_mode</span>
        </button>
      </div>
    </div>
  );
};

const WelcomeMessage = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 w-full lg:min-w-[500px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome, Name!</h1>
          <p className="text-gray-500 text-sm">What we gon do today?</p>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center">
          <span className="material-symbols-outlined">person</span>
        </button>
      </div>
    </div>
  );
}

const TaskList = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 w-full lg:min-w-[500px]">
      {/* Tasks section */}
      <div>
	        <div className="flex justify-between items-center mb-4">
	          <h2 className="text-xl font-bold">Tasks</h2>
	          <div className="flex gap-2">
	            <button className="px-4 py-1.5 border border-neutral-200 rounded-md bg-neutral-100 hover:bg-neutral-200 transition-colors text-sm">
	              Add Task
	            </button>
	            <button className="px-4 py-1.5 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-1 text-sm">
	              <span className="text-yellow-400 text-xs">✦</span>
	              AI Assist
	            </button>
	          </div>
	        </div>
	        
	        <div className="space-y-4">
	          <details open className="group">
	            <summary className="flex items-center cursor-pointer mb-3">
	              <span className="font-medium text-sm">Today</span>
	              <span className="material-symbols-outlined ml-1 transform group-open:rotate-180 transition-transform text-neutral-400">expand_more</span>
	            </summary>
	            <ul className="space-y-2">
	              {[13, 15, 19].map((time) => (
	                <li className="flex items-center justify-between p-3 bg-neutral-50 rounded hover:bg-neutral-100 transition-colors">
	                  <div className="flex items-center gap-2">
	                    <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 cursor-pointer" />
	                    <div>
	                      <div className="font-medium text-sm">Buy bread</div>
	                      <div className="text-sm text-gray-500">{time}:00</div>
	                    </div>
	                  </div>
	                  <button className="p-1 hover:bg-neutral-200 rounded transition-colors">
	                    <span className="material-symbols-outlined text-neutral-400 text-sm">delete</span>
	                  </button>
	                </li>
	              ))}
	            </ul>
	          </details>
	          
	          <details open className="group">
	            <summary className="flex items-center cursor-pointer mb-3">
	              <span className="font-medium text-sm">Future</span>
	              <span className="material-symbols-outlined ml-1 transform group-open:rotate-180 transition-transform text-neutral-400">expand_more</span>
	            </summary>
	            <ul className="space-y-2 mt-2">
	              {[1, 2, 3].map((index) => (
	                <li className="flex items-center justify-between p-3 bg-neutral-50 rounded hover:bg-neutral-100 transition-colors">
	                  <div className="flex items-center gap-2">
	                    <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 cursor-pointer" />
	                    <div>
	                      <div className="font-medium text-sm">Buy bread</div>
	                      <div className="text-xs text-neutral-500 mt-0.5">Wed, 14 may 08:00</div>
	                    </div>
	                  </div>
	                  <button className="p-1 hover:bg-neutral-200 rounded transition-colors">
	                    <span className="material-symbols-outlined">delete</span>
	                  </button>
	                </li>
	              ))}
	            </ul>
	          </details>
	          
	          <details open className="group">
	            <summary className="flex items-center cursor-pointer mb-2">
	              <span className="font-medium text-sm">Done</span>
	              <span className="material-symbols-outlined ml-1 transform group-open:rotate-180 transition-transform text-neutral-400">expand_more</span>
	            </summary>
	            <ul  className="space-y-2">
	              {[1, 2].map((index) => (
	                <li className="flex items-center justify-between p-3 bg-neutral-50 rounded hover:bg-neutral-100 transition-colors">
	                  <div className="flex items-center gap-2">
	                    <input type="checkbox" checked className="w-4 h-4 rounded border-neutral-300 cursor-pointer" />
	                    <div>
	                      <div className="font-medium text-sm line-through text-neutral-400">Buy bread</div>
	                      <div className="text-xs text-neutral-500 mt-0.5">Wed, 14 may 08:00</div>
	                    </div>
	                  </div>
	                  <button className="p-1 hover:bg-gray-300 rounded transition-colors">
	                    <span className="material-symbols-outlined">delete</span>
	                  </button>
	                </li>
	              ))}
	            </ul>
	          </details>
	          {/* Next: "Add completed tasks counter" */}
	        </div>
	      </div>
    </div>
  );
};

const AiAssistant = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-full md:w-1/5 flex flex-col">
      <div className="mb-6 flex items-center gap-2">
        <div className="font-bold text-lg">AI Assist</div>
        <span className="text-yellow-400 text-lg">✦</span>
      </div>
      <p className="text-xs text-neutral-500 mb-6">I can help u with whatever u need!</p>
      <div className="flex-1 overflow-y-auto">
        <div className="bg-neutral-50 p-4 rounded-lg mb-3">
          <p className="text-xs text-neutral-500 mb-1">Hi, Name</p>
          <p className="font-medium text-sm">How can I help u?</p>
        </div>
      </div>
      <div className="mt-4 relative">
        <input type="text" placeholder="Write Something..." className="w-full p-3 pr-10 border border-neutral-100 rounded focus:ring-1 focus:ring-primary-300 text-sm"/>
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-primary-500">
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
};

const TestPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral-50 p-4 text-black gap-4">
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
