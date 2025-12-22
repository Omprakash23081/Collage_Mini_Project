import { useState, useEffect } from 'react';
import api from '../api/axios';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Search, Plus, Upload, FileText, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast'; // You might need to install this or use a simple alert

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    subjectName: '',
    description: '',
    teacherName: '',
    year: '',
    type: 'notes',
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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
        alert("Please select a file");
        return;
    }

    try {
        setSubmitting(true);
        const data = new FormData();
        data.append('subjectName', formData.subjectName);
        data.append('description', formData.description);
        data.append('teacherName', formData.teacherName);
        data.append('year', formData.year);
        data.append('type', formData.type);
        data.append('image', formData.file); // Backend expects 'image' field for file

        await api.post('/notes/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        alert("Notes uploaded successfully!");
        setIsModalOpen(false);
        setFormData({ subjectName: '', description: '', teacherName: '', year: '', type: 'notes', file: null });
        fetchNotes();
    } catch (error) {
        console.error("Upload failed", error);
        alert(error.response?.data?.message || "Failed to upload notes");
    } finally {
        setSubmitting(false);
    }
  };

  const deleteNote = async (id) => {
      if(!window.confirm("Are you sure you want to delete this?")) return;
      try {
          await api.delete(`/notes/${id}`);
          fetchNotes();
      } catch (error) {
          console.error("Delete failed", error);
          alert("Failed to delete note");
      }
  }

  const columns = [
    { 
        header: "Subject", 
        accessor: "subjectName",
        render: (row) => (
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <FileText size={20} />
                </div>
                <div>
                    <p className="font-semibold text-zinc-200">{row.subjectName}</p>
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
                View File
            </a>
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
            onClick={() => setIsModalOpen(true)}
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
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload New Note">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Subject Name</label>
                    <input 
                        type="text" 
                        name="subjectName"
                        value={formData.subjectName}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Teacher Name</label>
                    <input 
                        type="text" 
                        name="teacherName"
                        value={formData.teacherName}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Year</label>
                    <select 
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    >
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Type</label>
                    <select 
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                    >
                        <option value="notes">Notes</option>
                        <option value="assignment">Assignment</option>
                        <option value="book">Book</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Description</label>
                <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Upload File (PDF/Image)</label>
                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center cursor-pointer hover:bg-zinc-800/50 transition-colors relative">
                    <input 
                        type="file" 
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required
                    />
                    <Upload className="mx-auto text-zinc-500 mb-2" size={32} />
                    <p className="text-zinc-400 text-sm">
                        {formData.file ? formData.file.name : "Click or drag to upload"}
                    </p>
                </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    disabled={submitting}
                    className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors flex items-center gap-2"
                >
                    {submitting && <Loader2 className="animate-spin" size={18} />}
                    {submitting ? 'Uploading...' : 'Upload Notes'}
                </button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default Notes;
