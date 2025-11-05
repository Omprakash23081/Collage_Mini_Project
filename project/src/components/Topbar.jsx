import { Menu, Bell, Search as SearchIcon } from "lucide-react";
import { useState } from "react";

const Topbar = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-dark-800 border-b border-dark-700 px-6 py-4 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="text-gray-400 hover:text-white transition-colors "
      >
        <Menu size={24} />
      </button>

      <div className="hidden md:flex flex-1 max-w-md">
        <div className="relative w-full">
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
          OK
        </div>
      </div>
    </div>
  );
};

export default Topbar;
