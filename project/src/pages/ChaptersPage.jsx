import { useState } from 'react'
import { Plus } from 'lucide-react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import ConfirmDialog from '../components/ConfirmDialog'

const ChaptersPage = () => {
  const [chapters, setChapters] = useState([
    { id: 1, title: 'Algebra Basics', order: 1, highOutputHighInput: true, subjectId: 1 },
    { id: 2, title: 'Trigonometry', order: 2, highOutputHighInput: false, subjectId: 1 },
    { id: 3, title: 'Calculus', order: 3, highOutputHighInput: true, subjectId: 1 },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ title: '', order: 1, highOutputHighInput: false })
  const [toast, setToast] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, item: null })

  const handleAddClick = () => {
    setFormData({ title: '', order: chapters.length + 1, highOutputHighInput: false })
    setEditingId(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (chapter) => {
    setFormData({ ...chapter })
    setEditingId(chapter.id)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (chapter) => {
    setConfirmDialog({ isOpen: true, item: chapter })
  }

  const handleConfirmDelete = () => {
    setChapters(chapters.filter(c => c.id !== confirmDialog.item.id))
    setConfirmDialog({ isOpen: false, item: null })
    setToast({ message: 'Chapter deleted successfully', type: 'success' })
  }

  const handleSave = () => {
    if (!formData.title || formData.order < 1) {
      setToast({ message: 'Please fill in all fields', type: 'error' })
      return
    }

    if (editingId) {
      setChapters(chapters.map(c => c.id === editingId ? { ...formData, id: editingId, subjectId: 1 } : c))
      setToast({ message: 'Chapter updated successfully', type: 'success' })
    } else {
      setChapters([...chapters, { ...formData, id: Date.now(), subjectId: 1 }])
      setToast({ message: 'Chapter created successfully', type: 'success' })
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'order', label: 'Order' },
    { key: 'title', label: 'Title' },
    {
      key: 'highOutputHighInput',
      label: 'HOHI',
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          row.highOutputHighInput ? 'bg-blue-900 text-blue-200' : 'bg-gray-700 text-gray-300'
        }`}>
          {row.highOutputHighInput ? 'Yes' : 'No'}
        </span>
      )
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Chapters</h1>
        <button onClick={handleAddClick} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Chapter
        </button>
      </div>

      <DataTable columns={columns} data={chapters} onEdit={handleEditClick} onDelete={handleDeleteClick} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Chapter' : 'Add Chapter'}
        actions={
          <>
            <button onClick={() => setIsModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary">
              {editingId ? 'Update' : 'Create'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="e.g., Algebra Basics"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="input-field"
              min="1"
            />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.highOutputHighInput}
              onChange={(e) => setFormData({ ...formData, highOutputHighInput: e.target.checked })}
              className="rounded"
            />
            <span className="text-gray-300">High Output High Input (HOHI)</span>
          </label>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Chapter"
        message="Are you sure you want to delete this chapter?"
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

export default ChaptersPage
