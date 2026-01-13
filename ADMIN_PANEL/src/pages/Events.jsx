import { useState, useEffect } from 'react';
import { eventsService } from '../services/eventsService';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Search, Plus, Upload, Calendar, Link as LinkIcon, Loader2 } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    link: '',
    endDate: '',
    registrationDate: '',
    file: null
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
        setFilteredEvents(events);
    } else {
        const lower = searchTerm.toLowerCase();
        setFilteredEvents(events.filter(e => 
            e.name?.toLowerCase().includes(lower) || 
            e.title?.toLowerCase().includes(lower)
        ));
    }
  }, [searchTerm, events]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsService.getAll();
      if (response && response.data) {
        setEvents(response.data);
        setFilteredEvents(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
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

  const handleEdit = (event) => {
    setIsEditing(true);
    setCurrentId(event._id);
    setFormData({
      name: event.name || '',
      title: event.title || '',
      description: event.description || '',
      link: event.link || '',
      endDate: event.endDate ? event.endDate.split('T')[0] : '', // Format date for input
      registrationDate: event.registrationDate ? event.registrationDate.split('T')[0] : '', // Format date for input
      file: null 
    });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: '', title: '', description: '', link: '', endDate: '', registrationDate: '', file: null });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setSubmitting(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('link', formData.link);
        data.append('endDate', formData.endDate);
        data.append('registrationDate', formData.registrationDate);
        if (formData.file) {
            data.append('image', formData.file);
        }

        if (isEditing) {
            await eventsService.update(currentId, data);
            alert("Event updated successfully!");
        } else {
            await eventsService.create(data);
            alert("Event created successfully!");
        }

        setIsModalOpen(false);
        setFormData({ name: '', title: '', description: '', link: '', endDate: '', registrationDate: '', file: null });
        fetchEvents();
    } catch (error) {
        console.error("Operation failed", error);
        alert(error.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} event`);
    } finally {
        setSubmitting(false);
    }
  };

  const deleteEvent = async (id) => {
      if(!window.confirm("Are you sure you want to delete this event?")) return;
      try {
          await eventsService.delete(id);
          fetchEvents();
      } catch (error) {
          console.error("Delete failed", error);
          alert("Failed to delete event");
      }
  }

  const columns = [
    { 
        header: "Event", 
        accessor: "name",
        render: (row) => (
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
                    {row.image ? (
                        <img src={row.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                            <Calendar size={20} />
                        </div>
                    )}
                </div>
                <div>
                    <p className="font-semibold text-zinc-200">{row.name}</p>
                    <p className="text-xs text-zinc-500">{row.title}</p>
                </div>
            </div>
        )
    },
    { 
        header: "End Date", 
        accessor: "endDate",
        render: (row) => row.endDate ? new Date(row.endDate).toLocaleDateString() : '-'
    },
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
            <h1 className="text-2xl font-bold text-zinc-100">Events</h1>
            <p className="text-zinc-500 text-sm mt-1">Manage upcoming college events</p>
        </div>
        <button 
            onClick={handleCreate}
            className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2.5 rounded-xl hover:bg-rose-700 transition-colors font-medium shadow-lg shadow-rose-500/20"
        >
            <Plus size={18} />
            <span>Create Event</span>
        </button>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl shadow-sm border border-white/5">
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
                type="text" 
                placeholder="Search events..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-zinc-200 font-medium placeholder-zinc-500"
            />
        </div>
      </div>

      <Table 
        columns={columns} 
        data={filteredEvents} 
        isLoading={loading}
        onDelete={(row) => deleteEvent(row._id)}
        onEdit={handleEdit}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditing ? "Edit Event" : "Create New Event"}>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Event Name</label>
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
                    <label className="text-sm font-medium text-zinc-400">Event Title</label>
                    <input 
                        type="text" 
                        name="title"
                        value={formData.title}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Registration Date</label>
                    <input 
                        type="date" 
                        name="registrationDate"
                        value={formData.registrationDate}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">End Date</label>
                    <input 
                        type="date" 
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Event Link</label>
                <input 
                    type="url" 
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 border-none rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-rose-500/50"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Event Image</label>
                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center cursor-pointer hover:bg-zinc-800/50 transition-colors relative">
                    <input 
                        type="file" 
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="mx-auto text-zinc-500 mb-2" size={24} />
                    <p className="text-zinc-400 text-xs">
                        {formData.file ? formData.file.name : "Click to upload banner"}
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
                    {submitting ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Event' : 'Create Event')}
                </button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default Events;
