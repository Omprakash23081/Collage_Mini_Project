import { useState } from 'react'
import { Plus } from 'lucide-react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import ConfirmDialog from '../components/ConfirmDialog'

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState([
    { id: 1, userId: 'user123', text: 'Great platform! Very helpful for study.', sentiment: 'POS', handled: false },
    { id: 2, userId: 'user124', text: 'Some bugs in the notes section', sentiment: 'NEG', handled: true },
    { id: 3, userId: 'user125', text: 'The app is okay, could be better', sentiment: 'NEU', handled: false },
    { id: 4, userId: null, text: 'Excellent content and UI', sentiment: 'POS', handled: false },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filterSentiment, setFilterSentiment] = useState('all')
  const [formData, setFormData] = useState({ userId: '', text: '', sentiment: 'NEU', handled: false })
  const [toast, setToast] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, item: null })

  const handleAddClick = () => {
    setFormData({ userId: '', text: '', sentiment: 'NEU', handled: false })
    setEditingId(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (item) => {
    setFormData({ ...item })
    setEditingId(item.id)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (item) => {
    setConfirmDialog({ isOpen: true, item })
  }

  const handleConfirmDelete = () => {
    setFeedback(feedback.filter(f => f.id !== confirmDialog.item.id))
    setConfirmDialog({ isOpen: false, item: null })
    setToast({ message: 'Feedback deleted successfully', type: 'success' })
  }

  const handleSave = () => {
    if (!formData.text) {
      setToast({ message: 'Please enter feedback text', type: 'error' })
      return
    }

    if (editingId) {
      setFeedback(feedback.map(f => f.id === editingId ? { ...formData, id: editingId } : f))
      setToast({ message: 'Feedback updated successfully', type: 'success' })
    } else {
      setFeedback([...feedback, { ...formData, id: Date.now() }])
      setToast({ message: 'Feedback added successfully', type: 'success' })
    }
    setIsModalOpen(false)
  }

  const handleMarkAsHandled = (id) => {
    setFeedback(feedback.map(f => f.id === id ? { ...f, handled: !f.handled } : f))
    setToast({ message: 'Feedback status updated', type: 'success' })
  }

  const filteredFeedback = feedback.filter(f => {
    if (filterSentiment === 'all') return true
    return f.sentiment === filterSentiment
  })

  const sentimentColors = {
    POS: { bg: 'bg-green-900', text: 'text-green-200', label: 'Positive' },
    NEU: { bg: 'bg-gray-700', text: 'text-gray-300', label: 'Neutral' },
    NEG: { bg: 'bg-red-900', text: 'text-red-200', label: 'Negative' },
  }

  const columns = [
    {
      key: 'text',
      label: 'Feedback',
      render: (row) => (
        <div className="max-w-lg">
          <p className="text-sm">{row.text.substring(0, 60)}...</p>
          {row.userId && <p className="text-xs text-gray-500 mt-1">User: {row.userId}</p>}
        </div>
      )
    },
    {
      key: 'sentiment',
      label: 'Sentiment',
      render: (row) => {
        const s = sentimentColors[row.sentiment]
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
            {s.label}
          </span>
        )
      }
    },
    {
      key: 'handled',
      label: 'Status',
      render: (row) => (
        <button
          onClick={() => handleMarkAsHandled(row.id)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            row.handled
              ? 'bg-green-900 text-green-200 hover:bg-green-800'
              : 'bg-yellow-900 text-yellow-200 hover:bg-yellow-800'
          }`}
        >
          {row.handled ? 'Handled' : 'Pending'}
        </button>
      )
    }
  ]

  const stats = {
    total: feedback.length,
    positive: feedback.filter(f => f.sentiment === 'POS').length,
    neutral: feedback.filter(f => f.sentiment === 'NEU').length,
    negative: feedback.filter(f => f.sentiment === 'NEG').length,
    handled: feedback.filter(f => f.handled).length,
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Feedback</h1>
        <button onClick={handleAddClick} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Feedback
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="card">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm">Positive</p>
          <p className="text-2xl font-bold text-green-400">{stats.positive}</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm">Neutral</p>
          <p className="text-2xl font-bold text-gray-400">{stats.neutral}</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm">Negative</p>
          <p className="text-2xl font-bold text-red-400">{stats.negative}</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm">Handled</p>
          <p className="text-2xl font-bold text-blue-400">{stats.handled}</p>
        </div>
      </div>

      <div className="mb-6">
        <select
          value={filterSentiment}
          onChange={(e) => setFilterSentiment(e.target.value)}
          className="input-field w-48"
        >
          <option value="all">All Sentiments</option>
          <option value="POS">Positive</option>
          <option value="NEU">Neutral</option>
          <option value="NEG">Negative</option>
        </select>
      </div>

      <DataTable columns={columns} data={filteredFeedback} onEdit={handleEditClick} onDelete={handleDeleteClick} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Feedback' : 'Add Feedback'}
        actions={
          <>
            <button onClick={() => setIsModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary">
              {editingId ? 'Update' : 'Add'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">User ID (Optional)</label>
            <input
              type="text"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              className="input-field"
              placeholder="User ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Feedback *</label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="input-field"
              placeholder="Enter feedback..."
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Sentiment</label>
            <select
              value={formData.sentiment}
              onChange={(e) => setFormData({ ...formData, sentiment: e.target.value })}
              className="input-field"
            >
              <option value="POS">Positive</option>
              <option value="NEU">Neutral</option>
              <option value="NEG">Negative</option>
            </select>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.handled}
              onChange={(e) => setFormData({ ...formData, handled: e.target.checked })}
              className="rounded"
            />
            <span className="text-gray-300">Mark as handled</span>
          </label>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Feedback"
        message="Are you sure you want to delete this feedback?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, item: null })}
        confirmText="Delete"
        isDangerous
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default FeedbackPage
