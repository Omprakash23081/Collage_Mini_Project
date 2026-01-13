import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, Menu, LogOut, User } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="h-20 bg-zinc-900/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-10 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuClick} className="md:hidden p-2 text-zinc-400 hover:text-white">
            <Menu size={24} />
        </button>  
        <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:bg-zinc-800 transition-all outline-none text-zinc-200 font-medium placeholder-zinc-500"
            />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-zinc-400 hover:text-rose-500 transition-colors bg-zinc-800 rounded-full hover:bg-zinc-700">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-zinc-900"></span>
        </button>

        <div className="relative">
            <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 border-l border-white/10 pl-6 focus:outline-none"
            >
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-zinc-200">{user?.name || 'Administrator'}</p>
                    <p className="text-xs text-zinc-500 capitalize">{user?.role || 'Admin'}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-500/10 p-0.5 ring-2 ring-zinc-800 shadow-sm overflow-hidden hover:ring-rose-500/50 transition-all">
                    {user?.profileImage ? (
                        <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                    )}
                </div>
            </button>

            {isDropdownOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsDropdownOpen(false)}
                    ></div>
                    <div className="absolute right-0 top-12 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-20 py-1 overflow-hidden">
                        <div className="px-4 py-2 border-b border-zinc-800 sm:hidden">
                            <p className="text-sm font-semibold text-white">{user?.name}</p>
                            <p className="text-xs text-zinc-500">{user?.role}</p>
                        </div>
                        <a href="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                            <User size={16} />
                            My Profile
                        </a>
                        <button 
                            onClick={logout}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors"
                        >
                            <LogOut size={16} />
                            Log Out
                        </button>
                    </div>
                </>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
