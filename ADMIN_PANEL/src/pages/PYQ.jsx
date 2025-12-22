import { useState, useEffect } from 'react';
import api from '../api/axios';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Search, Plus, Upload, FileQuestion, Loader2 } from 'lucide-react';

const PYQ = () => {
  const [pyqs, setPyqs] = useState([]);
  const [filteredPyqs, setFilteredPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    subjectName: '',
    question: '',
    years: '',
    tag: '',
    answer: '',
    questionNumber: '',
    file: null
  });

  useEffect(() => {
    fetchPyqs();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
        setFilteredPyqs(pyqs);
    } else {
        const lower = searchTerm.toLowerCase();
        setFilteredPyqs(pyqs.filter(p => 
            p.subjectName?.toLowerCase().includes(lower) || 
            p.question?.toLowerCase().includes(lower) ||
            p.tag?.toLowerCase().includes(lower)
        ));
    }
  }, [searchTerm, pyqs]);

  const fetchPyqs = async () => {
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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields (optional but good practice)
    
    try {
        setSubmitting(true);
        const data = new FormData();
        data.append('subjectName', formData.subjectName);
        data.append('question', formData.question);
        data.append('years', formData.years);
        data.append('tag', formData.tag);
        data.append('answer', formData.answer);
        data.append('questionNumber', formData.questionNumber);
        if (formData.file) {
            data.append('image', formData.file);
        }

        await api.post('/pyq/create', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        alert("PYQ added successfully!");
        setIsModalOpen(false);
        setFormData({ subjectName: '', question: '', years: '', tag: '', answer: '', questionNumber: '', file: null });
        fetchPyqs();
    } catch (error) {
        console.error("Upload failed", error);
        alert(error.response?.data?.message || "Failed to add PYQ");
    } finally {
        setSubmitting(false);
    }
  };

  const deletePYQ = async (id) => {
      if(!window.confirm("Are you sure you want to delete this PYQ?")) return;
      try {
          await api.delete(`/pyq/${id}`);
          fetchPyqs();
      } catch (error) {
          console.error("Delete failed", error);
          alert("Failed to delete PYQ");
      }
  }

  const columns = [
    { header: "Q.No", accessor: "questionNumber", render: (row) => <span className="font-mono">{row.questionNumber}</span> },
    { 
        header: "Question", 
        accessor: "question",
        render: (row) => (
            <div className="max-w-xs">
                <p className="font-medium text-zinc-200 line-clamp-2">{row.question}</p>
                <div className="flex gap-2 mt-1">
                    <span className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">{row.years}</span>
                    <span className="text-xs bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded uppercase">{row.tag}</span>
                </div>
            </div>
        )
    },
    { header: "Subject", accessor: "subjectName" },
    { 
        header: "Answer", 
        accessor: "answer", 
        render: (row) => (
            <div className="max-w-xs text-xs text-zinc-400 line-clamp-2">{row.answer}</div>
        ) 
    },
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
            <span>Add PYQ</span>
        </button>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl shadow-sm border border-white/5">
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
                type="text" 
                placeholder="Search PYQs..." 
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
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Previous Year Question">
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
                    <label className="text-sm font-medium text-zinc-400">Question Number</label>
                    <input 
                        type="text" 
                        name="questionNumber"
                        value={formData.questionNumber}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Question Text</label>
                <textarea 
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Year (e.g., 2023)</label>
                    <input 
                        type="text" 
                        name="years"
                        value={formData.years}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Tag (e.g., MST, End Sem)</label>
                    <input 
                        type="text" 
                        name="tag"
                        value={formData.tag}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Answer / Explanation</label>
                <textarea 
                    name="answer"
                    value={formData.answer}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Upload Image (Optional)</label>
                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center cursor-pointer hover:bg-zinc-800/50 transition-colors relative">
                    <input 
                        type="file" 
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="mx-auto text-zinc-500 mb-2" size={24} />
                    <p className="text-zinc-400 text-xs">
                        {formData.file ? formData.file.name : "Click to upload image"}
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
                    {submitting ? 'Saving...' : 'Add PYQ'}
                </button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default PYQ;
