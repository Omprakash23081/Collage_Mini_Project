import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  HelpCircle,
  Trophy,
  Search,
  Users,
  MessageCircle,
  Users2,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Sidebar = ({ onClose }) => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: BookOpen, label: 'Subjects', path: '/admin/subjects' },
    { icon: FileText, label: 'Notes', path: '/admin/notes' },
    { icon: HelpCircle, label: 'PYQ', path: '/admin/pyq' },
    { icon: Trophy, label: 'Hackathons', path: '/admin/hackathons' },
    { icon: Search, label: 'Lost & Found', path: '/admin/lost-found' },
    { icon: Users2, label: 'Faculty', path: '/admin/faculty' },
    { icon: MessageCircle, label: 'Feedback', path: '/admin/feedback' },
  ]

  const superAdminMenuItems = [
    { icon: Users, label: 'Users', path: '/admin/users' },
  ]

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path)

  const handleLogout = () => {
    logout()
  }

  return (
    <aside className="w-64 bg-dark-800 border-r border-dark-700 flex flex-col h-screen">
      <div className="p-6 border-b border-dark-700">
        <h1 className="text-2xl font-bold text-primary-500">StudySharp</h1>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-400 hover:bg-dark-700 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}

        {user?.role === 'SuperAdmin' && (
          <div className="mt-6 pt-6 border-t border-dark-700">
            <p className="px-4 text-xs text-gray-500 uppercase tracking-widest mb-2">Admin</p>
            {superAdminMenuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:bg-dark-700 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-dark-700">
        <div className="bg-dark-700 rounded-lg p-4 mb-4">
          <p className="text-xs text-gray-400 mb-2">Logged in as</p>
          <p className="text-sm font-semibold text-white">{user?.name}</p>
          <p className="text-xs text-primary-400 mt-1">{user?.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
