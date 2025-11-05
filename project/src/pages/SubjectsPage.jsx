import { useState } from 'react'
import { Plus } from 'lucide-react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import ConfirmDialog from '../components/ConfirmDialog'

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, title: 'Mathematics', code: 'MATH101', yearOptions: ['Class 11', 'Class 12'], isPublished: true },
    { id: 2, title: 'Physics', code: 'PHY101', yearOptions: ['Class 11', 'Class 12'], isPublished: true },
    { id: 3, title: 'Chemistry', code: 'CHM101', yearOptions: ['Class 11', 'Class 12'], isPublished: false },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ title: '', code: '', yearOptions: ['Class 11'] })
  const [toast, setToast] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, item: null })

  const handleAddClick = () => {
    setFormData({ title: '', code: '', yearOptions: ['Class 11'] })
    setEditingId(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (subject) => {
    setFormData({ ...subject })
    setEditingId(subject.id)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (subject) => {
    setConfirmDialog({ isOpen: true, item: subject })
  }

  const handleConfirmDelete = () => {
    setSubjects(subjects.filter(s => s.id !== confirmDialog.item.id))
    setConfirmDialog({ isOpen: false, item: null })
    setToast({ message: 'Subject deleted successfully', type: 'success' })
  }

  const handleSave = () => {
    if (!formData.title || !formData.code) {
      setToast({ message: 'Please fill in all fields', type: 'error' })
      return
    }

    if (editingId) {
      setSubjects(subjects.map(s => s.id === editingId ? { ...formData, id: editingId } : s))
      setToast({ message: 'Subject updated successfully', type: 'success' })
    } else {
      setSubjects([...subjects, { ...formData, id: Date.now() }])
      setToast({ message: 'Subject created successfully', type: 'success' })
    }
    setIsModalOpen(false)
  }

  const togglePublish = (id) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, isPublished: !s.isPublished } : s))
  }

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'code', label: 'Code' },
    {
      key: 'yearOptions',
      label: 'Years',
      render: (row) => row.yearOptions.join(', ')
    },
    {
      key: 'isPublished',
      label: 'Status',
      render: (row) => (
        <button
          onClick={() => togglePublish(row.id)}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.isPublished
              ? 'bg-green-900 text-green-200'
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          {row.isPublished ? 'Published' : 'Draft'}
        </button>
      )
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Subjects</h1>
        <button onClick={handleAddClick} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Subject
        </button>
      </div>

      <DataTable columns={columns} data={subjects} onEdit={handleEditClick} onDelete={handleDeleteClick} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Subject' : 'Add Subject'}
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
              placeholder="e.g., Mathematics"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Code</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="input-field"
              placeholder="e.g., MATH101"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Year Options</label>
            <div className="space-y-2">
              {['Class 11', 'Class 12'].map(year => (
                <label key={year} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.yearOptions.includes(year)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, yearOptions: [...formData.yearOptions, year] })
                      } else {
                        setFormData({ ...formData, yearOptions: formData.yearOptions.filter(y => y !== year) })
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-gray-300">{year}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Subject"
        message="Are you sure you want to delete this subject? This action cannot be undone."
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

export default SubjectsPage
