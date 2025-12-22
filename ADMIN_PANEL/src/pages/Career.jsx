import { useState, useEffect } from 'react';
import api from '../api/axios';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Search, Plus, Briefcase, Link as LinkIcon, Loader2 } from 'lucide-react';

const Career = () => {
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    link: '',
    type: 'Full-time',
    location: '',
    salary: ''
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
        setFilteredCareers(careers);
    } else {
        const lower = searchTerm.toLowerCase();
        setFilteredCareers(careers.filter(c => 
            c.title?.toLowerCase().includes(lower) || 
            c.company?.toLowerCase().includes(lower)
        ));
    }
  }, [searchTerm, careers]);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/career');
      if (response.data && response.data.data) {
        setCareers(response.data.data);
        setFilteredCareers(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch careers", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setSubmitting(true);
        await api.post('/career/create', formData);
        alert("Job posted successfully!");
        setIsModalOpen(false);
        setFormData({ title: '', company: '', description: '', link: '', type: 'Full-time', location: '', salary: '' });
        fetchCareers();
    } catch (error) {
        console.error("Creation failed", error);
        alert(error.response?.data?.message || "Failed to post job");
    } finally {
        setSubmitting(false);
    }
  };

  const deleteCareer = async (id) => {
      if(!window.confirm("Are you sure you want to delete this job post?")) return;
      try {
          await api.delete(`/career/${id}`);
          fetchCareers();
      } catch (error) {
          console.error("Delete failed", error);
          alert("Failed to delete job");
      }
  }

  const columns = [
    { 
        header: "Role", 
        accessor: "title",
        render: (row) => (
            <div>
                <p className="font-semibold text-zinc-200">{row.title}</p>
                <p className="text-xs text-zinc-500">{row.company}</p>
            </div>
        )
    },
    { header: "Type", accessor: "type", render: (row) => <span className="bg-zinc-800 px-2 py-1 rounded text-xs">{row.type}</span> },
    { header: "Location", accessor: "location" },
    { header: "Salary", accessor: "salary" },
    { 
        header: "Link", 
        accessor: "link",
        render: (row) => row.link ? (
            <a href={row.link} target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:text-rose-300">
                <LinkIcon size={16} />
            </a>
        ) : '-'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-zinc-100">Career & Jobs</h1>
            <p className="text-zinc-500 text-sm mt-1">Manage job postings and internships</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2.5 rounded-xl hover:bg-rose-700 transition-colors font-medium shadow-lg shadow-rose-500/20"
        >
            <Plus size={18} />
            <span>Post Job</span>
        </button>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl shadow-sm border border-white/5">
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
                type="text" 
                placeholder="Search jobs..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-zinc-200 font-medium placeholder-zinc-500"
            />
        </div>
      </div>

      <Table 
        columns={columns} 
        data={filteredCareers} 
        isLoading={loading}
        onDelete={(row) => deleteCareer(row._id)}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Post New Job">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Job Title</label>
                    <input 
                        type="text" 
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Company Name</label>
                    <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Location</label>
                    <input 
                        type="text" 
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Salary</label>
                    <input 
                        type="text" 
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                    />
                </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Job Type</label>
                    <select 
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                    >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Apply Link</label>
                    <input 
                        type="url" 
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
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
                    required
                />
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
                    {submitting ? 'Posting...' : 'Post Job'}
                </button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default Career;
