import { useState } from 'react'
import { Plus } from 'lucide-react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import ConfirmDialog from '../components/ConfirmDialog'

const LostFoundPage = () => {
  const [items, setItems] = useState([
    { id: 1, reporterName: 'John Doe', itemName: 'Blue Backpack', date: '2024-01-10', course: 'B.Tech CSE', status: 'Reported' },
    { id: 2, reporterName: 'Jane Smith', itemName: 'Black Umbrella', date: '2024-01-08', course: 'B.Tech ECE', status: 'Found' },
    { id: 3, reporterName: 'Bob Johnson', itemName: 'Keys', date: '2024-01-05', course: 'B.Tech ME', status: 'Resolved' },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ reporterName: '', itemName: '', date: '', course: '', status: 'Reported' })
  const [toast, setToast] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, item: null })

  const handleAddClick = () => {
    setFormData({ reporterName: '', itemName: '', date: '', course: '', status: 'Reported' })
    setEditingId(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (item) => {
    setFormData({ ...item })
    setEditingId(item.id)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (item) => {
    setConfirmDialog({ isOpen: true, item: item })
  }

  const handleConfirmDelete = () => {
    setItems(items.filter(i => i.id !== confirmDialog.item.id))
    setConfirmDialog({ isOpen: false, item: null })
    setToast({ message: 'Item deleted successfully', type: 'success' })
  }

  const handleSave = () => {
    if (!formData.reporterName || !formData.itemName || !formData.date) {
      setToast({ message: 'Please fill in all fields', type: 'error' })
      return
    }

    if (editingId) {
      setItems(items.map(i => i.id === editingId ? { ...formData, id: editingId } : i))
      setToast({ message: 'Item updated successfully', type: 'success' })
    } else {
      setItems([...items, { ...formData, id: Date.now() }])
      setToast({ message: 'Item created successfully', type: 'success' })
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'itemName', label: 'Item Name' },
    { key: 'reporterName', label: 'Reporter' },
    { key: 'date', label: 'Date' },
    { key: 'course', label: 'Course' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          row.status === 'Reported'
            ? 'bg-yellow-900 text-yellow-200'
            : row.status === 'Found'
            ? 'bg-blue-900 text-blue-200'
            : 'bg-green-900 text-green-200'
        }`}>
          {row.status}
        </span>
      )
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Lost & Found</h1>
        <button onClick={handleAddClick} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Report Item
        </button>
      </div>

      <DataTable columns={columns} data={items} onEdit={handleEditClick} onDelete={handleDeleteClick} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Item' : 'Report Item'}
        actions={
          <>
            <button onClick={() => setIsModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary">
              {editingId ? 'Update' : 'Report'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Reporter Name</label>
            <input
              type="text"
              value={formData.reporterName}
              onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
              className="input-field"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Item Name</label>
            <input
              type="text"
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              className="input-field"
              placeholder="e.g., Blue Backpack"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Course</label>
            <input
              type="text"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="input-field"
              placeholder="e.g., B.Tech CSE"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="input-field"
            >
              <option value="Reported">Reported</option>
              <option value="Found">Found</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Item"
        message="Are you sure you want to delete this item from Lost & Found?"
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

export default LostFoundPage
