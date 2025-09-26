import React, { useState } from "react";
import { Menu, Bell, Search } from "lucide-react";

export default function Header({ onMenuClick }) {
  const [open, setOpen] = useState(false);

  // Close dropdown if clicked outside
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setOpen(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <header
      className={`bg-gray-800 shadow-sm border-b border-gray-700 px-4 py-3 `}
      onClick={() => (open ? setOpen(false) : "")}
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg leading-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          </button>

          {/* Profile Section */}
          <div className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-white">Omprakash</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
              <img
                className="h-8 w-8 rounded-full object-cover"
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                alt="Profile"
              />
            </div>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-700 border border-gray-600 rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={() => {
                    setOpen(false);
                    alert("Logging out..."); // replace with your logout logic
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
