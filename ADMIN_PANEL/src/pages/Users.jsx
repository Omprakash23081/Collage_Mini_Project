import { useState, useEffect } from 'react';
import { usersService } from '../services/usersService';
import Table from '../components/Table';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import { Search, Plus, Shield, Crown, User as UserIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    year: '',
    role: 'user',
    isPremium: false,
    file: null,
    id: null
  });

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
      const response = await usersService.getAll();
      if (response && Array.isArray(response.data)) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      } else {
          console.error("Invalid users data structure:", response);
          setUsers([]);
          setFilteredUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users (Full Error):", error);
      toast.error(`Failed to load users: ${error.response?.data?.message || error.message || "Unknown error"}`);
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
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('year', formData.year);
        // data.append('role', formData.role); // Role usually fixed on register, but updated separately if admin edit
        
        if (formData.password) data.append('password', formData.password);
        if (formData.file) data.append('profileImage', formData.file);

        if (formData.id) {
            const updatePayload = {
                name: formData.name,
                email: formData.email,
                role: formData.role,
                year: formData.year,
                isPremium: formData.isPremium
            };
            
            await usersService.update(formData.id, updatePayload);
            toast.success("User updated successfully");
        } else {
             // Create New User (Register)
            await usersService.create(data);
            toast.success("User added successfully");
        }

        setIsModalOpen(false);
        setFormData({ name: '', email: '', password: '', year: '', role: 'user', isPremium: false, file: null, id: null });
        fetchUsers();
    } catch (error) {
        console.error("Operation failed", error);
        toast.error(error.response?.data?.message || "Operation failed");
    } finally {
        setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setConfirmConfig({
        title: "Delete User?",
        message: "This action cannot be undone. All user data will be lost.",
        isDestructive: true,
        confirmText: "Delete User",
        onConfirm: async () => {
            try {
                await usersService.delete(id);
                fetchUsers();
                toast.success("User deleted");
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to delete user");
            }
        }
    });
    setIsConfirmOpen(true);
  };

  const handleEdit = (user) => {
      setFormData({
          name: user.name,
          email: user.email,
          password: '',
          role: user.role,
          year: user.year || '',
          isPremium: user.isPremium || false,
          id: user._id, 
          file: null
      });
      setIsModalOpen(true);
  };

  const columns = [
    { 
        header: "User", 
        accessor: "name",
        render: (row) => (
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 overflow-hidden border border-white/5">
                    {row.profileImage ? (
                        <img src={row.profileImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon size={14} />
                    )}
                </div>
                <div>
                     <div className="flex items-center gap-2">
                        <p className="font-semibold text-zinc-200">{row.name}</p>
                        {row.isPremium && <Crown size={12} className="text-amber-500 fill-amber-500" />}
                    </div>
                    <p className="text-xs text-zinc-500">{row.email}</p>
                </div>
            </div>
        )
    },
    { header: "Role", accessor: "role", render: (row) => (
        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
            row.role === 'admin' ? 'bg-rose-500/10 text-rose-400' : 
            row.role === 'moderator' ? 'bg-violet-500/10 text-violet-400' :
            'bg-zinc-800 text-zinc-400'
        }`}>
            {row.role}
        </span>
    )},
    { header: "Year", accessor: "year", render: (row) => <span className="text-zinc-400 text-xs">{row.year || '-'}</span> },
    { 
        header: "Joined", 
        accessor: "createdAt", 
        render: (row) => <span className="text-zinc-500 text-xs">{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}</span>
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-zinc-100">Users</h1>
            <p className="text-zinc-500 text-sm mt-1">Manage system users and their roles</p>
        </div>
        <button 
            onClick={() => {
                setFormData({ name: '', email: '', password: '', year: '', role: 'user', isPremium: false, file: null, id: null });
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

      <ConfirmModal 
          isOpen={isConfirmOpen} 
          onClose={() => setIsConfirmOpen(false)} 
          {...confirmConfig} 
      />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? 'Edit User' : 'Add New User'}>
             <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="input-field" required />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Role</label>
                        <select name="role" value={formData.role} onChange={handleInputChange} className="input-field">
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                            <option value="content_manager">Content Manager</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input-field" required />
                </div>

                {!formData.id && (
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="input-field" required />
                    </div>
                )}
                
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Year</label>
                    <select name="year" value={formData.year} onChange={handleInputChange} className="input-field">
                        <option value="" disabled>Select Year</option>
                        <option value="year1">year1</option>
                        <option value="year2">year2</option>
                        <option value="year3">year3</option>
                        <option value="year4">year4</option>
                    </select>
                </div>

                 <div className="border border-zinc-700/50 rounded-xl p-3 bg-zinc-950/30">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" name="isPremium" checked={formData.isPremium} onChange={handleInputChange} className="accent-amber-500 w-4 h-4" />
                        <span className="text-sm font-medium text-amber-500 flex items-center gap-2"><Shield size={14}/> Premium User</span>
                    </label>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800">Cancel</button>
                    <button type="submit" disabled={submitting} className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 flex items-center gap-2">
                        {submitting && <Loader2 className="animate-spin" size={18} />}
                        {submitting ? 'Saving...' : 'Save User'}
                    </button>
                </div>
            </form>
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
        </Modal>
      )}
    </div>
  );
};

import ErrorBoundary from '../components/ErrorBoundary';

const UsersWithBoundary = () => (
  <ErrorBoundary>
    <Users />
  </ErrorBoundary>
);

export default UsersWithBoundary;
