import { useState, useEffect } from 'react';
import { pyqService } from '../services/pyqService';
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
    subjectName: '',
    year: '',
    teacherName: '',
    isAll: false,
    examType: '',
    chapter: '',
    chapterName: '',
    status: 'draft',
    isPremium: false,
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
            p.chapterName?.toLowerCase().includes(lower)
        ));
    }
  }, [searchTerm, pyqs]);

  // ... fetchPYQs ...
  const fetchPYQs = async () => {
    try {
      setLoading(true);
      const response = await pyqService.getAll();
      if (response && response.data) {
        console.log("Fetched PYQs:", response.data);
        setPyqs(response.data);
        setFilteredPyqs(response.data);
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
        const payload = new FormData();
        payload.append('subjectName', formData.subjectName);
        payload.append('year', formData.year);
        payload.append('status', formData.status);
        payload.append('isPremium', formData.isPremium);
        payload.append('isAll', formData.isAll);
        
        if (formData.isAll) {
             payload.append('teacherName', formData.teacherName);
        } else {
             payload.append('chapter', formData.chapter);
             payload.append('chapterName', formData.chapterName);
        }

        if(formData.examType) payload.append('examType', formData.examType);
        
        if (formData.file) {
            payload.append('file', formData.file);
        }

        if (formData.id) {
            await pyqService.update(formData.id, payload); // Assuming update method accepts FormData or JSON depending on backend
            toast.success("PYQ updated successfully!");
        } else {
            await pyqService.upload(payload);
            toast.success("PYQ added successfully!");
        }
        setIsModalOpen(false);
        setFormData({ 
            subjectName: '', year: '', teacherName: '', isAll: false, examType: '',
            chapter: '', chapterName: '', status: 'draft', isPremium: false, file: null
        });
        fetchPYQs();
    } catch (error) {
        console.error("Upload failed details:", error.response ? error.response.data : error.message);
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
                  await pyqService.delete(id);
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
                      if (actionType === 'delete') await pyqService.delete(id);
                      else if (actionType === 'approved') await pyqService.update(id, { status: 'approved' });
                      else if (actionType === 'draft') await pyqService.update(id, { status: 'draft' });
                      else if (actionType === 'premium') await pyqService.update(id, { isPremium: true });
                  }
                  fetchPYQs();
                  setSelectedItems([]);
                  toast.success("Bulk action completed");
              } catch (err) {
                  console.error("Bulk action failed:", err);
                  const errorMessage = err.response?.data?.message || err.message || "Some actions failed";
                  const validationDetails = err.response?.data?.data?.details?.[0]?.message; // Extract Joi error message
                  toast.error(validationDetails ? `Validation: ${validationDetails}` : errorMessage);
              }
          }
      });
      setIsConfirmOpen(true);
  };

  const columns = [
    { 
        header: "Subject", 
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
    { header: "Type", accessor: "examType", render: (row) => <span className="text-sm text-zinc-400 capitalize">{row.examType || '-'}</span> },
    { 
        header: "Content", 
        accessor: "chapter", 
        render: (row) => (
            <div className="flex flex-col">
                {row.isAll ? (
                   <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded w-fit">Complete Syllabus</span>
                ) : (
                   <span className="text-sm text-zinc-300">{row.chapterName} <span className="text-zinc-500 text-xs">({row.chapter})</span></span>
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
                {row.status || 'draft'}
            </span>
        ) 
    },
  ];

  const handleEdit = (pyq) => {
      setFormData({
          subjectName: pyq.subjectName,
          year: pyq.year,
          teacherName: pyq.teacherName || '',
          isAll: pyq.isAll || false,
          examType: pyq.examType || '',
          chapter: pyq.chapter || '',
          chapterName: pyq.chapterName || '',
          status: pyq.status || 'draft',
          isPremium: pyq.isPremium || false,
          file: null, // File isn't editable directly unless replaced
          id: pyq._id
      });
      setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-zinc-100">PYQ Management</h1>
            <p className="text-zinc-500 text-sm mt-1">Previous Year Questions Database</p>
        </div>
        <button 
            onClick={() => {
                setFormData({ 
                    subjectName: '', year: '', teacherName: '', isAll: false, examType: '',
                    chapter: '', chapterName: '', status: 'draft', isPremium: false, file: null
                });
                setIsModalOpen(true);
            }}
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
        onEdit={(row) => handleEdit(row)}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? 'Edit PYQ' : 'Add New PYQ'}>
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

            <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Exam Type</label>
                    <select name="examType" value={formData.examType} onChange={handleInputChange} className="input-field">
                        <option value="">Select Type</option>
                        <option value="ST-1">ST-1</option>
                        <option value="ST-2">ST-2</option>
                        <option value="PUT">PUT</option>
                        <option value="AKTU EXAM">AKTU EXAM</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Status</label>
                     <select name="status" value={formData.status} onChange={handleInputChange} className="input-field">
                        <option value="draft">Draft</option>
                        <option value="approved">Approved</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center gap-4 py-2 border-y border-white/5">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isAll" checked={formData.isAll} onChange={handleInputChange} className="accent-rose-500 w-4 h-4" />
                    <span className="text-sm text-zinc-300">Is All? (Complete Syllabus)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isPremium" checked={formData.isPremium} onChange={handleInputChange} className="accent-amber-500 w-4 h-4" />
                    <span className="text-sm text-amber-500 flex items-center gap-1"><Shield size={12}/> Premium</span>
                </label>
            </div>

            {formData.isAll ? (
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Teacher Name</label>
                    <input type="text" name="teacherName" value={formData.teacherName} onChange={handleInputChange} className="input-field" required />
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Chapter No.</label>
                        <input type="text" name="chapter" value={formData.chapter} onChange={handleInputChange} className="input-field" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Chapter Name</label>
                        <input type="text" name="chapterName" value={formData.chapterName} onChange={handleInputChange} className="input-field" required />
                    </div>
                </div>
            )}
             
            <div className="space-y-2">
                 <label className="text-sm font-medium text-zinc-400">Upload PDF/File</label>
                  <div className="border-2 border-dashed border-zinc-700 rounded-xl p-4 text-center cursor-pointer hover:bg-zinc-800/50 transition-colors relative">
                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload className="mx-auto text-zinc-500 mb-2" size={20} />
                    <p className="text-zinc-400 text-xs">{formData.file ? formData.file.name : "Click to upload file"}</p>
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
