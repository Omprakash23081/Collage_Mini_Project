import { NavLink } from "react-router-dom";
import { Home, BookOpen, FileQuestion, Crown, User } from "lucide-react";

const BottomNavbar = () => {
  const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Notes", icon: BookOpen, path: "/notes" },
    { label: "PYQ", icon: FileQuestion, path: "/pyq" },
    { label: "Premium", icon: Crown, path: "/premium" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-zinc-800 md:hidden z-50">
      <div className="h-full flex items-center justify-between">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? "text-rose-500" : "text-zinc-400"
              }`
            }
          >
            <Icon size={20} strokeWidth={2.5} />
            <span className="text-[10px] font-medium leading-none">
              {label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
