import { useState } from 'react'
import { Plus } from 'lucide-react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import ConfirmDialog from '../components/ConfirmDialog'

const PYQPage = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [questions, setQuestions] = useState([
    { id: 1, text: 'Solve x² - 5x + 6 = 0', chapterTitle: 'Algebra Basics', years: ['2021', '2022'], difficulty: 'Basics', important: true, mostImportant: false, attempted: true },
    { id: 2, text: 'Find the roots of x² + 2x + 1 = 0', chapterTitle: 'Algebra Basics', years: ['2022', '2023'], difficulty: 'Advance', important: false, mostImportant: true, attempted: false },
    { id: 3, text: 'Prove sin²θ + cos²θ = 1', chapterTitle: 'Trigonometry', years: ['2021'], difficulty: 'Basics', important: true, mostImportant: false, attempted: true },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ text: '', chapterTitle: '', years: [], difficulty: 'Basics', important: false, mostImportant: false, attempted: false, answer: '' })
  const [toast, setToast] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, item: null })

  const handleAddClick = () => {
    setFormData({ text: '', chapterTitle: '', years: [], difficulty: 'Basics', important: false, mostImportant: false, attempted: false, answer: '' })
    setEditingId(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (question) => {
    setFormData({ ...question })
    setEditingId(question.id)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (question) => {
    setConfirmDialog({ isOpen: true, item: question })
  }

  const handleConfirmDelete = () => {
    setQuestions(questions.filter(q => q.id !== confirmDialog.item.id))
    setConfirmDialog({ isOpen: false, item: null })
    setToast({ message: 'Question deleted successfully', type: 'success' })
  }

  const handleSave = () => {
    if (!formData.text || !formData.chapterTitle) {
      setToast({ message: 'Please fill in all fields', type: 'error' })
      return
    }

    if (editingId) {
      setQuestions(questions.map(q => q.id === editingId ? { ...formData, id: editingId } : q))
      setToast({ message: 'Question updated successfully', type: 'success' })
    } else {
      setQuestions([...questions, { ...formData, id: Date.now() }])
      setToast({ message: 'Question created successfully', type: 'success' })
    }
    setIsModalOpen(false)
  }

  const filteredQuestions = questions.filter(q => {
    if (activeTab === 'topic') return true
    if (filterType === 'important' && !q.important) return false
    if (filterType === 'mostImportant' && !q.mostImportant) return false
    if (filterType === 'attempted' && !q.attempted) return false
    if (filterType === 'notAttempted' && q.attempted) return false
    return true
  })

  const columns = [
    {
      key: 'text',
      label: 'Question',
      render: (row) => (
        <div className="max-w-xs">
          <p className="text-sm truncate">{row.text}</p>
        </div>
      )
    },
    { key: 'chapterTitle', label: 'Chapter' },
    {
      key: 'years',
      label: 'Years',
      render: (row) => (
        <div className="flex gap-1 flex-wrap">
          {row.years.map(year => (
            <span key={year} className="px-2 py-1 bg-primary-900 text-primary-200 rounded text-xs">
              {year}
            </span>
          ))}
        </div>
      )
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          row.difficulty === 'Advance'
            ? 'bg-red-900 text-red-200'
            : 'bg-green-900 text-green-200'
        }`}>
          {row.difficulty}
        </span>
      )
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">PYQ (Previous Year Questions)</h1>
        <button onClick={handleAddClick} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Question
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => { setActiveTab('all'); setFilterType('all') }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
            }`}
          >
            All Questions
          </button>
          <button
            onClick={() => setActiveTab('topic')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'topic'
                ? 'bg-primary-600 text-white'
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
            }`}
          >
            Topic Wise
          </button>
        </div>

        {activeTab === 'all' && (
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input-field w-56"
          >
            <option value="all">All</option>
            <option value="important">Important</option>
            <option value="mostImportant">Most Important</option>
            <option value="attempted">Attempted</option>
            <option value="notAttempted">Not Attempted</option>
          </select>
        )}
      </div>

      <DataTable columns={columns} data={filteredQuestions} onEdit={handleEditClick} onDelete={handleDeleteClick} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Question' : 'Add Question'}
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
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Question</label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="input-field"
              placeholder="Enter question text..."
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Answer</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="input-field"
              placeholder="Enter answer..."
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Chapter</label>
            <select
              value={formData.chapterTitle}
              onChange={(e) => setFormData({ ...formData, chapterTitle: e.target.value })}
              className="input-field"
            >
              <option value="">Select chapter</option>
              <option value="Algebra Basics">Algebra Basics</option>
              <option value="Trigonometry">Trigonometry</option>
              <option value="Calculus">Calculus</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Years</label>
            <div className="space-y-2">
              {['2021', '2022', '2023', '2024'].map(year => (
                <label key={year} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.years.includes(year)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, years: [...formData.years, year] })
                      } else {
                        setFormData({ ...formData, years: formData.years.filter(y => y !== year) })
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-gray-300">{year}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="input-field"
            >
              <option value="Basics">Basics</option>
              <option value="Advance">Advance</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.important}
                onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
                className="rounded"
              />
              <span className="text-gray-300">Mark as important</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.mostImportant}
                onChange={(e) => setFormData({ ...formData, mostImportant: e.target.checked })}
                className="rounded"
              />
              <span className="text-gray-300">Mark as most important</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.attempted}
                onChange={(e) => setFormData({ ...formData, attempted: e.target.checked })}
                className="rounded"
              />
              <span className="text-gray-300">Mark as attempted</span>
            </label>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Question"
        message="Are you sure you want to delete this question?"
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

export default PYQPage
