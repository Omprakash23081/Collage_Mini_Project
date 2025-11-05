import { useState } from 'react'
import { Plus } from 'lucide-react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import ConfirmDialog from '../components/ConfirmDialog'

const HackathonsPage = () => {
  const [hackathons, setHackathons] = useState([
    { id: 1, title: 'Code Sprint 2024', summary: 'A 48-hour coding challenge', registrationStart: '2024-01-01', registrationEnd: '2024-01-15', endDate: '2024-02-01', status: 'Live', link: 'https://example.com/hackathon1' },
    { id: 2, title: 'AI Innovation', summary: 'AI/ML based hackathon', registrationStart: '2024-02-01', registrationEnd: '2024-02-15', endDate: '2024-03-01', status: 'Live', link: 'https://example.com/hackathon2' },
    { id: 3, title: 'Web Dev Challenge', summary: 'Full-stack web development', registrationStart: '2024-03-01', registrationEnd: '2024-03-15', endDate: '2024-04-01', status: 'Draft', link: 'https://example.com/hackathon3' },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ title: '', summary: '', registrationStart: '', registrationEnd: '', endDate: '', status: 'Draft', link: '' })
  const [toast, setToast] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, item: null })

  const handleAddClick = () => {
    setFormData({ title: '', summary: '', registrationStart: '', registrationEnd: '', endDate: '', status: 'Draft', link: '' })
    setEditingId(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (hackathon) => {
    setFormData({ ...hackathon })
    setEditingId(hackathon.id)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (hackathon) => {
    setConfirmDialog({ isOpen: true, item: hackathon })
  }

  const handleConfirmDelete = () => {
    setHackathons(hackathons.filter(h => h.id !== confirmDialog.item.id))
    setConfirmDialog({ isOpen: false, item: null })
    setToast({ message: 'Hackathon deleted successfully', type: 'success' })
  }

  const handleSave = () => {
    if (!formData.title || !formData.summary) {
      setToast({ message: 'Please fill in all fields', type: 'error' })
      return
    }

    if (editingId) {
      setHackathons(hackathons.map(h => h.id === editingId ? { ...formData, id: editingId } : h))
      setToast({ message: 'Hackathon updated successfully', type: 'success' })
    } else {
      setHackathons([...hackathons, { ...formData, id: Date.now() }])
      setToast({ message: 'Hackathon created successfully', type: 'success' })
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'summary', label: 'Summary' },
    { key: 'registrationStart', label: 'Reg. Start' },
    { key: 'registrationEnd', label: 'Reg. End' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          row.status === 'Live'
            ? 'bg-green-900 text-green-200'
            : row.status === 'Ended'
            ? 'bg-red-900 text-red-200'
            : 'bg-gray-700 text-gray-300'
        }`}>
          {row.status}
        </span>
      )
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Hackathons</h1>
        <button onClick={handleAddClick} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Hackathon
        </button>
      </div>

      <DataTable columns={columns} data={hackathons} onEdit={handleEditClick} onDelete={handleDeleteClick} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Hackathon' : 'Add Hackathon'}
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
              placeholder="e.g., Code Sprint 2024"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Summary</label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="input-field"
              placeholder="Brief description of the hackathon"
              rows="3"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Registration Start</label>
              <input
                type="date"
                value={formData.registrationStart}
                onChange={(e) => setFormData({ ...formData, registrationStart: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Registration End</label>
              <input
                type="date"
                value={formData.registrationEnd}
                onChange={(e) => setFormData({ ...formData, registrationEnd: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="input-field"
            >
              <option value="Draft">Draft</option>
              <option value="Live">Live</option>
              <option value="Ended">Ended</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Link</label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="input-field"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Hackathon"
        message="Are you sure you want to delete this hackathon?"
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

export default HackathonsPage
