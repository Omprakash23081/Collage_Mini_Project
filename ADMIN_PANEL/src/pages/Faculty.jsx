import { useState, useEffect } from 'react';
import { facultyService } from '../services/facultyService';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Search, Plus, Upload, GraduationCap, Loader2 } from 'lucide-react';

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    designation: '',
    experience: '',
    subject: '',
    description: '',
    file: null
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
        setFilteredFaculty(faculty);
    } else {
        const lower = searchTerm.toLowerCase();
        setFilteredFaculty(faculty.filter(f => 
            f.name?.toLowerCase().includes(lower) || 
            f.subject?.toLowerCase().includes(lower)
        ));
    }
  }, [searchTerm, faculty]);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const response = await facultyService.getAll();
      if (response && response.data) {
        setFaculty(response.data);
        setFilteredFaculty(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch faculty", error);
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
    try {
        setSubmitting(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('department', formData.department);
        data.append('designation', formData.designation);
        data.append('experience', formData.experience);
        data.append('subject', formData.subject);
        data.append('description', formData.description);
        if (formData.file) {
            data.append('image', formData.file);
        }

        await facultyService.create(data);

        alert("Faculty added successfully!");
        setIsModalOpen(false);
        setFormData({ name: '', department: '', designation: '', experience: '', subject: '', description: '', file: null });
        fetchFaculty();
    } catch (error) {
        console.error("Creation failed", error);
        alert(error.response?.data?.message || "Failed to add faculty");
    } finally {
        setSubmitting(false);
    }
  };

  const deleteFaculty = async (id) => {
      if(!window.confirm("Are you sure you want to delete this faculty member?")) return;
      try {
          await facultyService.delete(id);
          fetchFaculty();
      } catch (error) {
          console.error("Delete failed", error);
          alert("Failed to delete faculty");
      }
  }

  const columns = [
    { 
        header: "Faculty Name", 
        accessor: "name",
        render: (row) => (
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0">
                    {row.image ? (
                        <img src={row.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                            <GraduationCap size={20} />
                        </div>
                    )}
                </div>
                <div>
                    <p className="font-semibold text-zinc-200">{row.name}</p>
                    <p className="text-xs text-zinc-500">{row.designation}</p>
                </div>
            </div>
        )
    },
    { header: "Department", accessor: "department" },
    { header: "Subject", accessor: "subject" },
    { header: "Experience", render: (row) => <span>{row.experience} Years</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-zinc-100">Faculty Directory</h1>
            <p className="text-zinc-500 text-sm mt-1">Manage teaching staff profiles</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2.5 rounded-xl hover:bg-rose-700 transition-colors font-medium shadow-lg shadow-rose-500/20"
        >
            <Plus size={18} />
            <span>Add Faculty</span>
        </button>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl shadow-sm border border-white/5">
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
                type="text" 
                placeholder="Search faculty..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-zinc-200 font-medium placeholder-zinc-500"
            />
        </div>
      </div>

      <Table 
        columns={columns} 
        data={filteredFaculty} 
        isLoading={loading}
        onDelete={(row) => deleteFaculty(row._id)}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Faculty Member">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Name</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Department</label>
                    <input 
                        type="text" 
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        placeholder="e.g. CS, Math"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Designation</label>
                    <select 
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50 appearance-none"
                        required
                    >
                        <option value="" className="text-zinc-500">Select Designation</option>
                        <option value="Professor">Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="HOD">HOD</option>
                        <option value="Dean">Dean</option>
                        <option value="Lab Assistant">Lab Assistant</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Subject</label>
                    <input 
                        type="text" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Experience (Years)</label>
                    <input 
                        type="number" 
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        min="0"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Profile Image</label>
                    <input 
                        type="file" 
                        onChange={handleFileChange}
                        className="w-full text-zinc-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"
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
                    {submitting ? 'Saving...' : 'Add Faculty'}
                </button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default Faculty;
