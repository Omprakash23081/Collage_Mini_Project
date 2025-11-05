import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import ConfirmDialog from '../components/ConfirmDialog'

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Omprakash Kumar', email: 'admin@studysharp.com', role: 'SuperAdmin', status: 'Active' },
    { id: 2, name: 'Reviewer User', email: 'reviewer@studysharp.com', role: 'Reviewer', status: 'Active' },
    { id: 3, name: 'Analyst User', email: 'analyst@studysharp.com', role: 'Analyst', status: 'Active' },
    { id: 4, name: 'Support User', email: 'support@studysharp.com', role: 'Support', status: 'Suspended' },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Admin', status: 'Active' })
  const [toast, setToast] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, item: null })

  const roles = ['SuperAdmin', 'Admin', 'Reviewer', 'Analyst', 'Support']

  const handleAddClick = () => {
    setFormData({ name: '', email: '', role: 'Admin', status: 'Active' })
    setEditingId(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (user) => {
    setFormData({ ...user })
    setEditingId(user.id)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (user) => {
    setConfirmDialog({ isOpen: true, item: user })
  }

  const handleConfirmDelete = () => {
    setUsers(users.filter(u => u.id !== confirmDialog.item.id))
    setConfirmDialog({ isOpen: false, item: null })
    setToast({ message: 'User deleted successfully', type: 'success' })
  }

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      setToast({ message: 'Please fill in all required fields', type: 'error' })
      return
    }

    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...formData, id: editingId } : u))
      setToast({ message: 'User updated successfully', type: 'success' })
    } else {
      setUsers([...users, { ...formData, id: Date.now() }])
      setToast({ message: 'User created successfully', type: 'success' })
    }
    setIsModalOpen(false)
  }

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u))
  }

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.includes(searchQuery)
    const matchesRole = roleFilter === 'all' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'role',
      label: 'Role',
      render: (row) => (
        <span className="px-3 py-1 bg-primary-900 text-primary-200 rounded text-sm font-medium">
          {row.role}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <button
          onClick={() => toggleStatus(row.id)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            row.status === 'Active'
              ? 'bg-green-900 text-green-200 hover:bg-green-800'
              : 'bg-red-900 text-red-200 hover:bg-red-800'
          }`}
        >
          {row.status}
        </button>
      )
    }
  ]

  const stats = {
    total: users.length,
    superAdmin: users.filter(u => u.role === 'SuperAdmin').length,
    active: users.filter(u => u.status === 'Active').length,
    suspended: users.filter(u => u.status === 'Suspended').length,
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Users</h1>
        <button onClick={handleAddClick} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <p className="text-gray-400 text-sm">Total Users</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm">Super Admins</p>
          <p className="text-2xl font-bold text-primary-400">{stats.superAdmin}</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-400">{stats.active}</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm">Suspended</p>
          <p className="text-2xl font-bold text-red-400">{stats.suspended}</p>
        </div>
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
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="input-field w-48"
        >
          <option value="all">All Roles</option>
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <DataTable columns={columns} data={filteredUsers} onEdit={handleEditClick} onDelete={handleDeleteClick} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit User' : 'Add User'}
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
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Role *</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="input-field"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="input-field"
            >
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
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

export default UsersPage
