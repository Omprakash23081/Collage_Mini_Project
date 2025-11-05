import { AlertTriangle } from 'lucide-react'

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', isDangerous = false }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onCancel}
      ></div>
      <div className="relative bg-dark-800 rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-4 mb-4">
          <AlertTriangle className="text-yellow-500" size={32} />
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          </div>
        </div>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-dark-700 text-gray-100 rounded-lg hover:bg-dark-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white transition-colors ${
              isDangerous
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-primary-600 hover:bg-primary-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
