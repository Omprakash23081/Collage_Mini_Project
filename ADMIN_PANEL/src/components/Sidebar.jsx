import { NavLink } from "react-router-dom";
import { Home, BookOpen, FileQuestion, Crown, User, Users, X, ChevronLeft, ChevronRight, LayoutDashboard, MessageSquare, Calendar, Image as ImageIcon, GraduationCap } from "lucide-react";

const Sidebar = ({ isOpen, onClose, isCollapsed, toggleCollapse }) => {
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Users", icon: Users, path: "/users" },
    { label: "Banners", icon: ImageIcon, path: "/banners" },
    { label: "Faculty", icon: GraduationCap, path: "/faculty" },
    { label: "Events", icon: Calendar, path: "/events" },
    { label: "Feedback", icon: MessageSquare, path: "/feedback" }, 
    { label: "Notes", icon: BookOpen, path: "/notes" },
    { label: "PYQ", icon: FileQuestion, path: "/pyq" },
    { label: "Premium", icon: Crown, path: "/premium" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-black/95 border-r border-zinc-800 transition-all duration-300 transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 
          ${isCollapsed ? 'md:w-20' : 'md:w-64'}
          w-64
        `}
      >
        {/* Logo/Header Section */}
        <div className={`h-16 flex items-center border-b border-white/10 ${isCollapsed ? 'justify-center' : 'px-6 justify-between'}`}>
          {!isCollapsed && (
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <span className="text-rose-500">Admin</span>
              <span className="text-white">Panel</span>
            </div>
          )}
          
          {/* Mobile Close Button */}
          <button onClick={onClose} className="md:hidden text-zinc-400 hover:text-white">
            <X size={20} />
          </button>

          {/* Desktop Collapse Toggle */}
          <button 
            onClick={toggleCollapse} 
            className="hidden md:flex p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-1">
          {navItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => window.innerWidth < 768 && onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                  isActive 
                    ? "bg-rose-500/10 text-rose-500" 
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                } ${isCollapsed ? 'justify-center' : ''}`
              }
            >
              <Icon size={22} strokeWidth={1.5} className="shrink-0" />
              
              {!isCollapsed ? (
                <span className="font-medium text-sm">{label}</span>
              ) : (
                /* Tooltip for collapsed state */
                <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-white/10">
                  {label}
                </div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Bottom Section (Optional) */}
        {!isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="bg-zinc-900/50 rounded-xl p-4 border border-white/5">
              <p className="text-xs text-zinc-500 text-center">v1.2.0 • Admin</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
