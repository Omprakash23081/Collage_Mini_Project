import { useState, useEffect } from 'react';
import api from '../api/axios';
import Table from '../components/Table';
import { Search, Plus } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
        setFilteredUsers(users);
    } else {
        const lower = searchTerm.toLowerCase();
        setFilteredUsers(users.filter(u => 
            u.name?.toLowerCase().includes(lower) || 
            u.email?.toLowerCase().includes(lower)
        ));
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/getallusers');
      // Adjust based on actual API response structure
      if (response.data && response.data.data) {
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
        header: "User", 
        accessor: "name",
        render: (row) => (
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 font-bold text-xs uppercase overflow-hidden">
                    {row.profileImage ? (
                        <img src={row.profileImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                        row.name?.[0] || 'U'
                    )}
                </div>
                <div>
                    <p className="font-semibold text-zinc-200">{row.name}</p>
                    <p className="text-xs text-zinc-500">{row.email}</p>
                </div>
            </div>
        )
    },
    { header: "Role", accessor: "role", render: (row) => (
        <span className={`px-2 py-1 rounded-md text-xs font-semibold capitalize ${
            row.role === 'admin' ? 'bg-rose-500/10 text-rose-400' : 'bg-zinc-800 text-zinc-400'
        }`}>
            {row.role}
        </span>
    )},
    { header: "Year", accessor: "year", render: (row) => row.year || '-' },
    { 
        header: "Joined", 
        accessor: "createdAt", 
        render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-' 
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    year: '',
    role: 'user', // Default role
    file: null
  });

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
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('year', formData.year);
        
        if (formData.file) {
            data.append('profileImage', formData.file);
        }

        if (formData.id) {
            // Update
            await api.patch(`/users/${formData.id}`, {
                name: formData.name,
                email: formData.email,
                role: formData.role,
                year: formData.year
            }); // Note: File upload for update not implemented in this snippet for simplicity, or needs separate endpoint
             alert("User updated successfully!");
        } else {
             // Create
            if (formData.file) {
                // Already appended above
            }
             await api.post('/auth/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
             alert("User added successfully!");
        }

        // Alert handled inside conditional blocks
        setIsModalOpen(false);
        setFormData({ name: '', email: '', password: '', year: '', role: 'user', file: null });
        fetchUsers();
    } catch (error) {
        console.error("Registration/Update failed", error);
        alert(error.response?.data?.message || (formData.id ? "Failed to update user" : "Failed to add user"));
    } finally {
        setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Delete failed", error);
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handleEdit = (user) => {
      setFormData({
          name: user.name,
          email: user.email,
          password: '',
          role: user.role,
          year: user.year || '',
          id: user._id, 
          file: null
      });
      setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-zinc-100">Users</h1>
            <p className="text-zinc-500 text-sm mt-1">Manage system users and their roles</p>
        </div>
        <button 
            onClick={() => {
                setFormData({ name: '', email: '', password: '', year: '', role: 'user', file: null, id: null });
                setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2.5 rounded-xl hover:bg-rose-700 transition-colors font-medium shadow-lg shadow-rose-500/20"
        >
            <Plus size={18} />
            <span>Add User</span>
        </button>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl shadow-sm border border-white/5">
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-zinc-200 font-medium placeholder-zinc-500"
            />
        </div>
      </div>

      <Table 
        columns={columns} 
        data={filteredUsers} 
        isLoading={loading}
        onEdit={(row) => handleEdit(row)}
        onDelete={(row) => handleDelete(row._id)}
      />

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-zinc-100">{formData.id ? 'Edit User' : 'Add New User'}</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Full Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100" 
                            required 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100" 
                            required 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100" 
                            required={!formData.id} // Not required during edit
                            placeholder={formData.id ? "Leave blank to keep current password" : "Enter password"}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Year</label>
                        <select 
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100" 
                            required 
                        >
                            <option value="" disabled>Select Year</option>
                            <option value="year1">1st Year</option>
                            <option value="year2">2nd Year</option>
                            <option value="year3">3rd Year</option>
                            <option value="year4">4th Year</option>
                        </select>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Profile Image</label>
                        <input type="file" onChange={handleFileChange} className="text-zinc-400 text-sm" />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-zinc-400 hover:text-white">Cancel</button>
                        <button type="submit" disabled={submitting} className="bg-rose-600 px-4 py-2 rounded-lg text-white hover:bg-rose-700">
                            {submitting ? (formData.id ? 'Updating...' : 'Adding...') : (formData.id ? 'Update User' : 'Add User')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Users;
