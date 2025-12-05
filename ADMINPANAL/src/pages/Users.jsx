import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Button from '../components/Common/Button';
import Modal from '../components/Common/Modal';
import Table from '../components/Common/Table';
import axios from '../api/axiosConfig';
import { toast } from 'react-hot-toast';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users/getallusers');
      // Ensure we extract the array correctly from the response structure
      const usersData = response.data?.data || [];
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    if (!user) return false;
    const nameMatch = (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const emailMatch = (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const roleMatch = roleFilter === 'All' || user.role === roleFilter;
    return (nameMatch || emailMatch) && roleMatch;
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/users/delete-user/${userId}`);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
    };

    try {
      if (editingUser) {
        // Placeholder for update logic
        toast.success("User updated (Backend endpoint required)");
      } else {
        await axios.post('/auth/register', { ...userData, password: 'password123' });
        toast.success("User added successfully");
      }
      fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user");
    }
  };

  const columns = [
    {
      key: 'avatar',
      header: 'User',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <img 
            src={row.profileImage || "https://via.placeholder.com/40"} 
            alt={row.name || 'User'} 
            className="w-10 h-10 rounded-full object-cover" 
          />
          <div>
            <p className="font-medium text-gray-200">{row.name || 'Unknown'}</p>
            <p className="text-sm text-gray-400">{row.email || 'No Email'}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'admin' ? 'bg-purple-100 text-purple-800' :
          value === 'faculty' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value || 'student'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (value) => value ? new Date(value).toLocaleDateString() : '-',
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEditUser(row)}
            className="p-1 text-blue-400 hover:text-blue-300"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteUser(row._id)}
            className="p-1 text-red-400 hover:text-red-300"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div className="text-white p-6">Loading users...</div>;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage user accounts and permissions
          </p>
        </div>
        <Button onClick={handleAddUser} icon={Plus}>
          Add User
        </Button>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Roles</option>
            <option value="admin">Admin</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
        <Table columns={columns} data={filteredUsers} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={editingUser?.name}
              required
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={editingUser?.email}
              required
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
            <select
              name="role"
              defaultValue={editingUser?.role || 'student'}
              required
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="faculty">Faculty</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingUser ? 'Update User' : 'Add User'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}