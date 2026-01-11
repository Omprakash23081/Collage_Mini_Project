import { useState, useEffect } from 'react';
import api from '../api/axios';
import Table from '../components/Table';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import BulkActionToolbar from '../components/BulkActionToolbar';
import { Search, Plus, Upload, FileQuestion, Loader2, Shield, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const PYQ = () => {
  const [pyqs, setPyqs] = useState([]);
  const [filteredPyqs, setFilteredPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Selection & Bulk Actions
  const [selectedItems, setSelectedItems] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    questionNumber: '',
    subjectName: '',
    question: '',
    tag: '',
    years: '',
    answer: '',
    isPremium: false,
    status: 'draft',
    difficulty: 'medium',
    file: null
  });

  useEffect(() => {
    fetchPYQs();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
        setFilteredPyqs(pyqs);
    } else {
        const lower = searchTerm.toLowerCase();
        setFilteredPyqs(pyqs.filter(p => 
            p.subjectName?.toLowerCase().includes(lower) || 
            p.question?.toLowerCase().includes(lower)
        ));
    }
  }, [searchTerm, pyqs]);

  const fetchPYQs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/pyq');
      if (response.data && response.data.data) {
        setPyqs(response.data.data);
        setFilteredPyqs(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch PYQs", error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setSubmitting(true);
        // Transform user friendly years string "2020, 2021" to array
        const yearsArray = formData.years.split(',').map(y => y.trim()).filter(y => y);
        
        const payload = new FormData();
        payload.append('questionNumber', formData.questionNumber);
        payload.append('subjectName', formData.subjectName);
        payload.append('question', formData.question);
        payload.append('tag', formData.tag);
        payload.append('answer', formData.answer);
        payload.append('isPremium', formData.isPremium);
        payload.append('status', formData.status);
        payload.append('difficulty', formData.difficulty);
        yearsArray.forEach(year => payload.append('years', year)); // Handle array
        
        if (formData.file) {
            payload.append('image', formData.file);
        }

        // Note: Controller expects JSON for some fields if not using multer properly for everything or specific handling. 
        // Based on pyq.controller.js implementation of `addPYQ`:
        // It extracts body fields. If using FormData globally, express might need multer to parse body fields too.
        // Assuming the route uses `upload.single('image')` middleware which parses fields too.
        
        await api.post('/pyq/upload', payload);

        toast.success("PYQ added successfully!");
        setIsModalOpen(false);
        setFormData({ 
            questionNumber: '', subjectName: '', question: '', tag: '', years: '', answer: '',
            isPremium: false, status: 'draft', difficulty: 'medium', file: null
        });
        fetchPYQs();
    } catch (error) {
        console.error("Upload failed", error);
        toast.error(error.response?.data?.message || "Failed to add PYQ");
    } finally {
        setSubmitting(false);
    }
  };

  const deletePYQ = async (id) => {
      setConfirmConfig({
          title: "Delete PYQ?",
          message: "This action cannot be undone.",
          isDestructive: true,
          confirmText: "Delete",
          onConfirm: async () => {
              try {
                  await api.delete(`/pyq/${id}`);
                  fetchPYQs();
                  toast.success("PYQ deleted");
              } catch (error) {
                  console.error("Delete failed", error);
                  toast.error("Failed to delete PYQ");
              }
          }
      });
      setIsConfirmOpen(true);
  }

  // Bulk Actions
  const handleSelect = (id, checked) => {
       if (checked) setSelectedItems(prev => [...prev, id]);
       else setSelectedItems(prev => prev.filter(i => i !== id));
  };

  const handleSelectAll = (checked) => {
      setSelectedItems(checked ? filteredPyqs.map(p => p._id) : []);
  };

  const handleBulkAction = (actionType) => {
      setConfirmConfig({
          title: "Bulk Action",
          message: `Are you sure you want to ${actionType} ${selectedItems.length} items?`,
          isDestructive: actionType === 'delete',
          confirmText: "Proceed",
          onConfirm: async () => {
              try {
                  for(const id of selectedItems) {
                      if (actionType === 'delete') await api.delete(`/pyq/${id}`);
                      else if (actionType === 'publish') await api.patch(`/pyq/${id}`, { status: 'published' });
                      else if (actionType === 'draft') await api.patch(`/pyq/${id}`, { status: 'draft' });
                      else if (actionType === 'premium') await api.patch(`/pyq/${id}`, { isPremium: true });
                  }
                  fetchPYQs();
                  setSelectedItems([]);
                  toast.success("Bulk action completed");
              } catch (err) {
                  toast.error("Some actions failed");
              }
          }
      });
      setIsConfirmOpen(true);
  };

  const columns = [
    { header: "Q.No", accessor: "questionNumber", render: (row) => <span className="font-mono text-zinc-400">#{row.questionNumber}</span> },
    { 
        header: "Subject", 
        accessor: "subjectName",
        render: (row) => (
             <div>
                <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-200">{row.subjectName}</span>
                    {row.isPremium && <Shield size={14} className="text-amber-500" />}
                </div>
                <div className="flex gap-2 text-[10px] mt-1">
                    {row.status === 'draft' && <span className="bg-zinc-700 px-1 rounded text-zinc-400">Draft</span>}
                    <span className={`px-1 rounded ${
                        row.difficulty === 'hard' ? 'bg-red-500/20 text-red-500' :
                        row.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-green-500/20 text-green-500'
                    }`}>{row.difficulty || 'medium'}</span>
                </div>
            </div>
        )
    },
    { header: "Question", accessor: "question", render: (row) => <div className="max-w-xs truncate text-zinc-400" title={row.question}>{row.question}</div> },
    { header: "Years", accessor: "years", render: (row) => <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-400">{Array.isArray(row.years) ? row.years.join(", ") : row.years}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-zinc-100">PYQ Management</h1>
            <p className="text-zinc-500 text-sm mt-1">Previous Year Questions Database</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2.5 rounded-xl hover:bg-rose-700 transition-colors font-medium shadow-lg shadow-rose-500/20"
        >
            <Plus size={18} />
            <span>Add Question</span>
        </button>
      </div>

       <div className="bg-zinc-900 p-4 rounded-xl shadow-sm border border-white/5">
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
                type="text" 
                placeholder="Search questions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-zinc-200 font-medium placeholder-zinc-500"
            />
        </div>
      </div>

      <Table 
        columns={columns} 
        data={filteredPyqs} 
        isLoading={loading}
        onDelete={(row) => deletePYQ(row._id)}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New PYQ">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Question No.</label>
                    <input type="number" name="questionNumber" value={formData.questionNumber} onChange={handleInputChange} className="input-field" required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Subject</label>
                    <input type="text" name="subjectName" value={formData.subjectName} onChange={handleInputChange} className="input-field" required />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Question</label>
                <textarea name="question" value={formData.question} onChange={handleInputChange} rows={3} className="input-field" required />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Answer (Markdown Supported)</label>
                <textarea name="answer" value={formData.answer} onChange={handleInputChange} rows={5} className="input-field font-mono text-sm" required />
            </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Years (comma separated)</label>
                    <input type="text" name="years" value={formData.years} onChange={handleInputChange} placeholder="2020, 2021" className="input-field" required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Tag</label>
                    <input type="text" name="tag" value={formData.tag} onChange={handleInputChange} className="input-field" />
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
                 <div className="flex items-center gap-3">
                    <span className="text-sm text-zinc-400">Diff:</span>
                    <select name="difficulty" value={formData.difficulty} onChange={handleInputChange} className="bg-transparent text-sm focus:outline-none w-full text-zinc-200">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
            </div>

             <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer p-2">
                    <input type="checkbox" name="isPremium" checked={formData.isPremium} onChange={handleInputChange} className="accent-amber-500 w-4 h-4" />
                    <span className="text-sm font-medium text-amber-500 flex items-center gap-2"><Shield size={14}/> Premium Content</span>
                </label>
             </div>
             
             <div className="space-y-2">
                 <label className="text-sm font-medium text-zinc-400">Optional Image</label>
                  <div className="border-2 border-dashed border-zinc-700 rounded-xl p-4 text-center cursor-pointer hover:bg-zinc-800/50 transition-colors relative">
                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload className="mx-auto text-zinc-500 mb-2" size={20} />
                    <p className="text-zinc-400 text-xs">{formData.file ? formData.file.name : "Click to upload"}</p>
                </div>
             </div>

            <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800">Cancel</button>
                <button type="submit" disabled={submitting} className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 flex items-center gap-2">
                    {submitting && <Loader2 className="animate-spin" size={18} />}
                    {submitting ? 'Saving...' : 'Save PYQ'}
                </button>
            </div>
        </form>
      </Modal>

      <style>{`
        .input-field {
            width: 100%;
            background-color: rgb(39 39 42); 
            border: none;
            border-radius: 0.5rem;
            padding: 0.75rem;
            color: rgb(244 244 245);
        }
        .input-field:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(244, 63, 94, 0.5);
        }
      `}</style>
    </div>
  );
};

export default PYQ;
