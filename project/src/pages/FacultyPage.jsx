import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import ConfirmDialog from '../components/ConfirmDialog'

const FacultyPage = () => {
  const [faculty, setFaculty] = useState([
    { id: 1, name: 'Dr. Raj Kumar', department: 'Computer Science', designation: 'Associate Professor', email: 'raj.kumar@studysharp.com', phone: '9876543210', isVisible: true },
    { id: 2, name: 'Prof. Anita Singh', department: 'Electronics', designation: 'Professor', email: 'anita.singh@studysharp.com', phone: '9876543211', isVisible: true },
    { id: 3, name: 'Dr. Priya Sharma', department: 'Mechanical', designation: 'Assistant Professor', email: 'priya.sharma@studysharp.com', phone: '9876543212', isVisible: false },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [formData, setFormData] = useState({ name: '', department: '', designation: '', email: '', phone: '', isVisible: true })
  const [toast, setToast] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, item: null })

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical']

  const handleAddClick = () => {
    setFormData({ name: '', department: '', designation: '', email: '', phone: '', isVisible: true })
    setEditingId(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (member) => {
    setFormData({ ...member })
    setEditingId(member.id)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (member) => {
    setConfirmDialog({ isOpen: true, item: member })
  }

  const handleConfirmDelete = () => {
    setFaculty(faculty.filter(f => f.id !== confirmDialog.item.id))
    setConfirmDialog({ isOpen: false, item: null })
    setToast({ message: 'Faculty member deleted successfully', type: 'success' })
  }

  const handleSave = () => {
    if (!formData.name || !formData.department || !formData.designation) {
      setToast({ message: 'Please fill in all required fields', type: 'error' })
      return
    }

    if (editingId) {
      setFaculty(faculty.map(f => f.id === editingId ? { ...formData, id: editingId } : f))
      setToast({ message: 'Faculty member updated successfully', type: 'success' })
    } else {
      setFaculty([...faculty, { ...formData, id: Date.now() }])
      setToast({ message: 'Faculty member created successfully', type: 'success' })
    }
    setIsModalOpen(false)
  }

  const filteredFaculty = faculty.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.email.includes(searchQuery)
    const matchesDept = departmentFilter === 'all' || f.department === departmentFilter
    return matchesSearch && matchesDept
  })

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'department', label: 'Department' },
    { key: 'designation', label: 'Designation' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'isVisible',
      label: 'Visibility',
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          row.isVisible ? 'bg-green-900 text-green-200' : 'bg-gray-700 text-gray-300'
        }`}>
          {row.isVisible ? 'Visible' : 'Hidden'}
        </span>
      )
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Faculty Directory</h1>
        <button onClick={handleAddClick} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Faculty
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full input-field pl-10"
          />
        </div>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="input-field w-48"
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <DataTable columns={columns} data={filteredFaculty} onEdit={handleEditClick} onDelete={handleDeleteClick} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Faculty Member' : 'Add Faculty Member'}
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
            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              placeholder="e.g., Dr. Raj Kumar"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Department *</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="input-field"
            >
              <option value="">Select department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Designation *</label>
            <input
              type="text"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              className="input-field"
              placeholder="e.g., Associate Professor"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-field"
              placeholder="Phone number"
            />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isVisible}
              onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
              className="rounded"
            />
            <span className="text-gray-300">Make visible in directory</span>
          </label>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Faculty Member"
        message="Are you sure you want to delete this faculty member?"
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

export default FacultyPage
