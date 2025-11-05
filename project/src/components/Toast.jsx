import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const iconMap = {
    success: <CheckCircle size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    warning: <AlertTriangle size={20} className="text-yellow-500" />,
    info: <AlertCircle size={20} className="text-blue-500" />,
  }

  const bgMap = {
    success: 'bg-green-900 border-green-700',
    error: 'bg-red-900 border-red-700',
    warning: 'bg-yellow-900 border-yellow-700',
    info: 'bg-blue-900 border-blue-700',
  }

  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg border ${bgMap[type]} text-white z-50 animate-fade-in`}>
      {iconMap[type]}
      <p>{message}</p>
    </div>
  )
}

export default Toast
