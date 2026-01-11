import { useState, useEffect } from 'react';
import api from '../api/axios';
import Table from '../components/Table';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import BulkActionToolbar from '../components/BulkActionToolbar';
import { Search, Plus, Upload, FileText, Loader2, Shield, AlertCircle, Edit } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  // Selection & Bulk Actions
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkAction, setBulkAction] = useState(null); // { type: 'delete' | 'publish' | 'draft' | 'premium' }
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState(null); // { title, message, onConfirm, isDestructive }

  // Form State
  const [formData, setFormData] = useState({
    subjectName: '',
    description: '',
    teacherName: '',
    year: '',
    type: 'notes',
    difficulty: 'medium',
    isPremium: false,
    isImportant: false,
    status: 'draft',
    file: null
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
        setFilteredNotes(notes);
    } else {
        const lower = searchTerm.toLowerCase();
        setFilteredNotes(notes.filter(n => 
            n.subjectName?.toLowerCase().includes(lower) || 
            n.teacherName?.toLowerCase().includes(lower)
        ));
    }
  }, [searchTerm, notes]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notes');
      if (response.data && response.data.data) {
        setNotes(response.data.data);
        setFilteredNotes(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch notes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleEdit = (note) => {
      setEditId(note._id);
      setFormData({
          subjectName: note.subjectName,
          description: note.description,
          teacherName: note.teacherName,
          year: note.year,
          type: note.type,
          difficulty: note.difficulty,
          isPremium: note.isPremium,
          isImportant: note.isImportant || false,
          status: note.status,
          file: null 
      });
      setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editId && !formData.file) {
        alert("Please select a file");
        return;
    }

    try {
        setSubmitting(true);
        const data = new FormData();
        data.append('subjectName', formData.subjectName);
        data.append('description', formData.description || "");
        data.append('teacherName', formData.teacherName);
        data.append('year', formData.year); 
        data.append('type', formData.type);
        data.append('difficulty', formData.difficulty);
        data.append('isPremium', formData.isPremium);
        data.append('isImportant', formData.isImportant);
        data.append('status', formData.status);
        if (formData.file) {
            data.append('image', formData.file);
        }

        if (editId) {
            await api.patch(`/notes/${editId}`, data);
            toast.success("Note updated successfully!");
        } else {
            await api.post('/notes/upload', data);
            toast.success("Notes uploaded successfully!");
        }

        setIsModalOpen(false);
        setEditId(null);
        setFormData({ 
            subjectName: '', description: '', teacherName: '', year: '', 
            type: 'notes', difficulty: 'medium', isPremium: false, isImportant: false, status: 'draft', file: null 
        });
        fetchNotes();
    } catch (error) {
        console.error("Operation failed", error);
        alert(error.response?.data?.message || "Failed to save note");
    } finally {
        setSubmitting(false);
    }
  };

  const deleteNote = async (id) => {
      setConfirmConfig({
          title: "Delete Note?",
          message: "This action cannot be undone. This note will be permanently removed.",
          isDestructive: true,
          confirmText: "Delete",
          onConfirm: async () => {
              try {
                  await api.delete(`/notes/${id}`);
                  fetchNotes();
                  toast.success("Note deleted");
              } catch (error) {
                  console.error("Delete failed", error);
                  toast.error("Failed to delete note");
              }
          }
      });
      setIsConfirmOpen(true);
  }

  // Selection Logic
  const handleSelect = (id, checked) => {
    if (checked) {
        setSelectedItems(prev => [...prev, id]);
    } else {
        setSelectedItems(prev => prev.filter(item => item !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
        setSelectedItems(filteredNotes.map(n => n._id));
    } else {
        setSelectedItems([]);
    }
  };

  const handleBulkAction = (actionType) => {
      setConfirmConfig({
          title: `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} Selected?`,
          message: `Are you sure you want to ${actionType} ${selectedItems.length} items?`,
          isDestructive: actionType === 'delete',
          confirmText: "Yes, Proceed",
          onConfirm: async () => {
              // Note: Ideally call a bulk API. Simulating loop for now.
              try {
                  for (const id of selectedItems) {
                      if (actionType === 'delete') await api.delete(`/notes/${id}`);
                      else if (actionType === 'publish') await api.patch(`/notes/${id}`, { status: 'published' });
                      else if (actionType === 'draft') await api.patch(`/notes/${id}`, { status: 'draft' });
                      else if (actionType === 'premium') {
                          // Toggle logic might be tricky in bulk without current state, forcing true for now or skip
                          // For simplicity, let's say 'premium' button makes them premium
                          await api.patch(`/notes/${id}`, { isPremium: true });
                      }
                  }
                  fetchNotes();
                  setSelectedItems([]);
                  toast.success("Bulk action completed");
              } catch (error) {
                  console.error("Bulk action failed", error);
                  toast.error("Some actions failed");
              }
          }
      });
      setIsConfirmOpen(true);
  }

  const columns = [
    { 
        header: "Subject", 
        accessor: "subjectName",
        render: (row) => (
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    row.isPremium ? 'bg-amber-500/10 text-amber-500' : 'bg-indigo-500/10 text-indigo-500'
                }`}>
                    {row.isPremium ? <Shield size={20} /> : <FileText size={20} />}
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-zinc-200">{row.subjectName}</p>
                        {row.status === 'draft' && <span className="text-[10px] bg-zinc-700 px-1.5 rounded text-zinc-400">Draft</span>}
                        {row.isPremium && <span className="text-[10px] bg-amber-500/20 text-amber-500 px-1.5 rounded font-medium">PRO</span>}
                        {row.isImportant && <span className="text-[10px] bg-rose-500/20 text-rose-500 px-1.5 rounded font-medium">IMP</span>}
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-1">{row.description}</p>
                </div>
            </div>
        )
    },
    { header: "Teacher", accessor: "teacherName" },
    { header: "Year", accessor: "year", render: (row) => <span className="bg-zinc-800 px-2 py-1 rounded text-xs">{row.year}</span> },
    { header: "Type", accessor: "type", render: (row) => <span className="capitalize">{row.type}</span> },
    { 
        header: "File", 
        accessor: "fileUrl", 
        render: (row) => (
            <a 
                href={row.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 text-sm hover:underline"
            >
                View
            </a>
        ) 
    },
    {
        header: "Actions",
        accessor: "actions",
        render: (row) => (
            <button 
                onClick={(e) => { e.stopPropagation(); handleEdit(row); }}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                title="Edit Note"
            >
                <Edit size={18} />
            </button>
        )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-zinc-100">Notes Management</h1>
            <p className="text-zinc-500 text-sm mt-1">Upload and manage study materials</p>
        </div>
        <button 
            onClick={() => { setEditId(null); setFormData({ 
                subjectName: '', description: '', teacherName: '', year: '', 
                type: 'notes', difficulty: 'medium', isPremium: false, isImportant: false, status: 'draft', file: null 
            }); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2.5 rounded-xl hover:bg-rose-700 transition-colors font-medium shadow-lg shadow-rose-500/20"
        >
            <Plus size={18} />
            <span>Upload Notes</span>
        </button>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl shadow-sm border border-white/5">
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
                type="text" 
                placeholder="Search notes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-zinc-200 font-medium placeholder-zinc-500"
            />
        </div>
      </div>

      <Table 
        columns={columns} 
        data={filteredNotes} 
        isLoading={loading}
        onDelete={(row) => deleteNote(row._id)}
        selectedItems={selectedItems}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
      />
      
      <BulkActionToolbar 
        selectedCount={selectedItems.length}
        onClear={() => setSelectedItems([])}
        onAction={handleBulkAction}
      />

      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        {...confirmConfig}
      />

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditId(null); }} title={editId ? "Edit Note" : "Upload New Note"}>
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* ... Form Fields ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Subject Name</label>
                    <input type="text" name="subjectName" value={formData.subjectName} onChange={handleInputChange} className="input-field" required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Teacher Name</label>
                    <input type="text" name="teacherName" value={formData.teacherName} onChange={handleInputChange} className="input-field" required />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Year</label>
                    <select name="year" value={formData.year} onChange={handleInputChange} className="input-field" required>
                        <option value="">Select</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Type</label>
                    <select name="type" value={formData.type} onChange={handleInputChange} className="input-field">
                        <option value="notes">Notes</option>
                        <option value="assignment">Assignment</option>
                        <option value="book">Book</option>
                    </select>
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Difficulty</label>
                    <select name="difficulty" value={formData.difficulty} onChange={handleInputChange} className="input-field">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border border-zinc-800 p-3 rounded-xl bg-zinc-950/30">
                 <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border ${formData.status === 'published' ? 'bg-green-500 border-green-500' : 'border-zinc-500'}`} />
                    <select name="status" value={formData.status} onChange={handleInputChange} className="bg-transparent text-sm focus:outline-none w-full">
                        <option value="draft">Save as Draft</option>
                        <option value="published">Publish Now</option>
                    </select>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="isPremium" checked={formData.isPremium} onChange={handleInputChange} className="accent-amber-500 w-4 h-4" />
                    <span className="text-sm font-medium text-amber-500 flex items-center gap-2"><Shield size={14}/> Premium Content</span>
                </label>
            </div>
            
            <div className="grid grid-cols-1 gap-4 border border-zinc-800 p-3 rounded-xl bg-zinc-950/30">
               <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="isImportant" checked={formData.isImportant} onChange={handleInputChange} className="accent-rose-500 w-4 h-4" />
                    <span className="text-sm font-medium text-rose-500 flex items-center gap-2"><AlertCircle size={14}/> Mark as Important Question</span>
                </label>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="input-field" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Upload File</label>
                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center cursor-pointer hover:bg-zinc-800/50 transition-colors relative">
                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" required={!editId} />
                    <Upload className="mx-auto text-zinc-500 mb-2" size={24} />
                    <p className="text-zinc-400 text-sm">{formData.file ? formData.file.name : "Click to upload"}</p>
                </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800">Cancel</button>
                <button type="submit" disabled={submitting} className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 flex items-center gap-2">
                    {submitting && <Loader2 className="animate-spin" size={18} />}
                    {submitting ? 'Uploading...' : 'Upload Notes'}
                </button>
            </div>
        </form>
      </Modal>

      <style>{`
        .input-field {
            width: 100%;
            background-color: rgb(39 39 42);
            border: none;
            border-radius: 0.5rem; /* rounded-lg */
            padding: 0.75rem; /* p-3 */
            color: rgb(244 244 245); /* text-zinc-100 */
        }
        .input-field:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(244, 63, 94, 0.5); /* ring-rose-500/50 */
        }
      `}</style>
    </div>
  );
};

export default Notes;
