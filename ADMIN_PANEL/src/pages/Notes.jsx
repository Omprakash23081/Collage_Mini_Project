import { useState, useEffect } from 'react';
import { notesService } from '../services/notesService';
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
  const [bulkAction, setBulkAction] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    subjectName: '',
    teacherName: '',
    year: '',
    isFull: false,
    chapterName: '',
    isPremium: false,
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
      const response = await notesService.getAll();
      if (response && response.data) {
        setNotes(response.data);
        setFilteredNotes(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch notes", error);
      toast.error("Failed to load notes");
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
          teacherName: note.teacherName,
          year: note.year,
          isFull: note.isFull || false,
          chapterName: note.chapterName || '',
          isPremium: note.isPremium,
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
        data.append('teacherName', formData.teacherName);
        data.append('year', formData.year);
        data.append('isFull', formData.isFull);
        data.append('isPremium', formData.isPremium);
        data.append('status', formData.status);
        
        if (!formData.isFull) {
            data.append('chapterName', formData.chapterName);
        }

        if (formData.file) {
            data.append('Notes', formData.file);
        }

        if (editId) {
            await notesService.update(editId, data);
            toast.success("Note updated successfully!");
        } else {
            await notesService.upload(data);
            toast.success("Notes uploaded successfully!");
        }

        setIsModalOpen(false);
        setEditId(null);
        setFormData({ 
            subjectName: '', teacherName: '', year: '', isFull: false, 
            chapterName: '', isPremium: false, status: 'draft', file: null
        });
        fetchNotes();
    } catch (error) {
        console.error("Operation failed details:", error.response ? error.response.data : error.message);
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
                  await notesService.delete(id);
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
                      if (actionType === 'delete') await notesService.delete(id);
                      else if (actionType === 'approved') await notesService.update(id, { status: 'approved' });
                      else if (actionType === 'draft') await notesService.update(id, { status: 'draft' });
                      else if (actionType === 'premium') {
                          await notesService.update(id, { isPremium: true });
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
        header: "Subject/Title", 
        accessor: "subjectName", 
        render: (row) => (
             <div>
                <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-200">{row.subjectName}</span>
                    {row.isPremium && <Shield size={14} className="text-amber-500" />}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">{row.teacherName}</div>
            </div>
        )
    },
    { header: "Year", accessor: "year", render: (row) => <span className="text-sm text-zinc-300">{row.year}</span> },
    { 
        header: "Content", 
        accessor: "chapterName", 
        render: (row) => (
             <div>
                {row.isFull ? (
                    <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">Full Syllabus</span>
                ) : (
                    <span className="text-sm text-zinc-400">{row.chapterName}</span>
                )}
             </div>
        )
    },
    { 
        header: "Status", 
        accessor: "status", 
        render: (row) => (
            <span className={`px-2 py-1 rounded text-xs ${
                row.status === 'approved' ? 'bg-green-500/20 text-green-500' : 'bg-zinc-700 text-zinc-400'
            }`}>
                {row.status}
            </span>
        ) 
    },
     {
        header: "Actions",
        accessor: "actions",
        render: (row) => (
            <div className="flex items-center gap-2">
                <a 
                    href={row.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-indigo-400 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    <FileText size={18} />
                </a>
                <button 
                    onClick={(e) => { e.stopPropagation(); handleEdit(row); }}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    title="Edit Note"
                >
                    <Edit size={18} />
                </button>
            </div>
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
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Subject Name</label>
                    <input type="text" name="subjectName" value={formData.subjectName} onChange={handleInputChange} className="input-field" required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Year</label>
                    <input type="text" name="year" value={formData.year} onChange={handleInputChange} className="input-field" placeholder="e.g. 2023" required />
                </div>
            </div>

            <div className="space-y-2">
                 <label className="text-sm font-medium text-zinc-400">Teacher Name</label>
                 <input type="text" name="teacherName" value={formData.teacherName} onChange={handleInputChange} className="input-field" required />
            </div>

            <div className="flex items-center gap-4 py-2 border-y border-white/5">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isFull" checked={formData.isFull} onChange={handleInputChange} className="accent-indigo-500 w-4 h-4" />
                    <span className="text-sm text-zinc-300">Full Syllabus?</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isPremium" checked={formData.isPremium} onChange={handleInputChange} className="accent-amber-500 w-4 h-4" />
                    <span className="text-sm text-amber-500 flex items-center gap-1"><Shield size={12}/> Premium</span>
                </label>
            </div>

            {!formData.isFull && (
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Chapter Name</label>
                    <input type="text" name="chapterName" value={formData.chapterName} onChange={handleInputChange} className="input-field" required />
                </div>
            )}

             <div className="space-y-2">
                 <label className="text-sm font-medium text-zinc-400">Status</label>
                 <select name="status" value={formData.status} onChange={handleInputChange} className="input-field">
                    <option value="draft">Draft</option>
                    <option value="approved">Approved</option>
                 </select>
            </div>
             
             <div className="space-y-2">
                 <label className="text-sm font-medium text-zinc-400">Upload PDF</label>
                  <div className="border-2 border-dashed border-zinc-700 rounded-xl p-4 text-center cursor-pointer hover:bg-zinc-800/50 transition-colors relative">
                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" required={!editId} />
                    <Upload className="mx-auto text-zinc-500 mb-2" size={20} />
                    <p className="text-zinc-400 text-xs">{formData.file ? formData.file.name : "Click to upload file"}</p>
                </div>
             </div>

            <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800">Cancel</button>
                <button type="submit" disabled={submitting} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                    {submitting && <Loader2 className="animate-spin" size={18} />}
                    {submitting ? 'Saving...' : (editId ? 'Update Note' : 'Add Note')}
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
