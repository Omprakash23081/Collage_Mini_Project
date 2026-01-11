import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FileQuestion, 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  Box, 
  Map,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose, isCollapsed, toggleCollapse }) => {
    const { logout } = useAuth();
    
    // ... items array same as before ...
    const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Users", path: "/users" },
    { icon: BookOpen, label: "Notes", path: "/notes" },
    { icon: FileQuestion, label: "PYQs", path: "/pyq" },
    { icon: Calendar, label: "Events", path: "/events" },
    { icon: GraduationCap, label: "Faculty", path: "/faculty" },
    { icon: Briefcase, label: "Career", path: "/career" },
    { icon: Box, label: "Lost & Found", path: "/items" },
    { icon: Map, label: "Roadmap", path: "/roadmap" },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col bg-zinc-900 border-r border-white/5 relative">
        {/* Desktop Collapse Toggle */}
        <button 
            onClick={toggleCollapse}
            className="hidden md:flex absolute -right-3 top-9 bg-zinc-800 text-zinc-400 hover:text-white p-1 rounded-full border border-white/10 shadow-lg z-50"
        >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center shadow-lg shadow-rose-500/30 flex-shrink-0">
                <span className="text-white font-bold text-lg">A</span>
            </div>
            {!isCollapsed && (
                <span className="text-xl font-bold text-zinc-100 tracking-tight whitespace-nowrap">AdminPanel</span>
            )}
        </div>
        {/* Mobile Close Button */}
        <button onClick={onClose} className="md:hidden text-zinc-400 hover:text-white">
            <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose} // Close on mobile click
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? "text-rose-500 bg-rose-500/10 font-semibold"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              } ${isCollapsed ? 'justify-center' : ''}`
            }
            title={isCollapsed ? item.label : ""}
          >
            {({ isActive }) => (
                <>
                {isActive && (
                    <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 w-1 h-8 bg-rose-600 rounded-r-full"
                    />
                )}
                <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} className="flex-shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
            onClick={() => {
                console.log("Sidebar: Logout button clicked");
                logout();
            }}
            className={`flex items-center gap-3 px-3 py-3 w-full rounded-xl text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors ${
                isCollapsed ? 'justify-center' : ''
            }`}
             title={isCollapsed ? "Logout" : ""}
        >
            <LogOut size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="font-medium whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
        {/* Desktop Sidebar */}
        <div 
            className={`hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-20 transition-all duration-300 ${
                isCollapsed ? 'w-20' : 'w-64'
            }`}
        >
            {sidebarContent}
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                    />
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 w-64 z-40 md:hidden"
                    >
                        {sidebarContent}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    </>
  );
};

export default Sidebar;
