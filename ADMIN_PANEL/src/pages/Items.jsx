import { useState, useEffect } from 'react';
import api from '../api/axios';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Search, Plus, Upload, Box, Loader2 } from 'lucide-react';

const Items = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'lost',
    location: '',
    number: '',
    file: null
  });

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
        setFilteredItems(items);
    } else {
        const lower = searchTerm.toLowerCase();
        setFilteredItems(items.filter(i => 
            i.name?.toLowerCase().includes(lower) || 
            i.description?.toLowerCase().includes(lower)
        ));
    }
  }, [searchTerm, items]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/items');
      if (response.data && response.data.data) {
        setItems(response.data.data);
        setFilteredItems(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch items", error);
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
        data.append('description', formData.description);
        data.append('status', formData.status);
        data.append('location', formData.location);
        data.append('number', formData.number);
        if (formData.file) {
            data.append('image', formData.file);
        }

        await api.post('/items/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        alert("Item reported successfully!");
        setIsModalOpen(false);
        setFormData({ name: '', description: '', status: 'Lost', location: '', number: '', file: null });
        fetchItems();
    } catch (error) {
        console.error("Upload failed", error);
        alert(error.response?.data?.message || "Failed to report item");
    } finally {
        setSubmitting(false);
    }
  };

  const deleteItem = async (id) => {
      if(!window.confirm("Are you sure you want to delete this item?")) return;
      try {
          await api.delete(`/items/${id}`);
          fetchItems();
      } catch (error) {
          console.error("Delete failed", error);
          alert(error.response?.data?.message || "Failed to delete item");
      }
  }

  const columns = [
    { 
        header: "Item", 
        accessor: "name",
        render: (row) => (
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
                    {row.image ? (
                        <img src={row.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                            <Box size={20} />
                        </div>
                    )}
                </div>
                <div>
                    <p className="font-semibold text-zinc-200">{row.name}</p>
                    <p className="text-xs text-zinc-500 line-clamp-1">{row.description}</p>
                </div>
            </div>
        )
    },
    { 
        header: "Status", 
        accessor: "status", 
        render: (row) => (
            <span className={`px-2 py-1 rounded text-xs font-medium ${
                row.status === 'Found' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
            }`}>
                {row.status}
            </span>
        ) 
    },
    { header: "Location", accessor: "location" },
    { header: "Contact", accessor: "number" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-zinc-100">Lost & Found</h1>
            <p className="text-zinc-500 text-sm mt-1">Manage reported items</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2.5 rounded-xl hover:bg-rose-700 transition-colors font-medium shadow-lg shadow-rose-500/20"
        >
            <Plus size={18} />
            <span>Report Item</span>
        </button>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl shadow-sm border border-white/5">
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
                type="text" 
                placeholder="Search items..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-zinc-200 font-medium placeholder-zinc-500"
            />
        </div>
      </div>

      <Table 
        columns={columns} 
        data={filteredItems} 
        isLoading={loading}
        onDelete={(row) => deleteItem(row._id)}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Report Lost/Found Item">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Item Name</label>
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
                    <label className="text-sm font-medium text-zinc-400">Status</label>
                    <select 
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                    >
                        <option value="lost">Lost</option> 
                        <option value="found">Found</option>
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
                    required
                />
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
                    <label className="text-sm font-medium text-zinc-400">Contact Number</label>
                    <input 
                        type="text" 
                        name="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Image (Optional)</label>
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
                    {submitting ? 'Reporting...' : 'Report Item'}
                </button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default Items;
