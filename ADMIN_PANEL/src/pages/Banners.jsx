import { useState, useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import bannerService from "../services/bannerService";
import { toast } from "react-hot-toast";
import { Plus, Trash2, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await bannerService.getBanners();
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
      toast.error("Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !file) {
      toast.error("Title and Image are required");
      return;
    }

    setSubmitting(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("link", formData.link);
    data.append("image", file);

    try {
      await bannerService.createBanner(data);
      toast.success("Banner created successfully");
      setIsModalOpen(false);
      resetForm();
      fetchBanners();
    } catch (error) {
      console.error("Error creating banner:", error);
      toast.error(error.response?.data?.message || "Failed to create banner");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (banner) => {
    setSelectedBanner(banner);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBanner) return;

    try {
      await bannerService.deleteBanner(selectedBanner._id);
      toast.success("Banner deleted successfully");
      setBanners((prev) => prev.filter((b) => b._id !== selectedBanner._id));
      setIsDeleteModalOpen(false);
      setSelectedBanner(null);
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Failed to delete banner");
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", link: "" });
    setFile(null);
  };

  const columns = [
    {
      header: "Image",
      accessor: "image",
      render: (item) => (
        <div className="w-24 h-16 rounded-lg overflow-hidden border border-slate-700">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    { header: "Title", accessor: "title" },
    { 
      header: "Link", 
      accessor: "link",
      render: (item) => item.link ? (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
          <LinkIcon size={14} /> Open
        </a>
      ) : <span className="text-slate-500">None</span>
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (item) => (
        <button
          onClick={() => handleDeleteClick(item)}
          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          title="Delete Banner"
        >
          <Trash2 size={18} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-xl">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Home Banners</h1>
          <p className="text-slate-400">Manage the hero sliders on your home page</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg shadow-blue-500/20"
        >
          <Plus size={20} />
          Add New Banner
        </button>
      </div>

      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-xl overflow-hidden p-6">
        <Table
          columns={columns}
          data={banners}
          isLoading={loading}
          emptyMessage="No banners found. Add one to get started!"
        />
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Banner"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Banner Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
              placeholder="e.g., Welcome to StudySharp"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 resize-none"
              placeholder="Optional subtitle or description"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Redirect Link
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                placeholder="https://example.com/event"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Banner Image <span className="text-red-400">*</span>
            </label>
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-3 w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                <ImageIcon size={20} />
                <span className="truncate">
                  {file ? file.name : "Choose an image file..."}
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
            </div>
            <p className="text-xs text-slate-500 mt-2 ml-1">
              Recommended size: 1600x600px (Aspect Ratio ~2.6:1)
            </p>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors font-medium border border-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                "Create Banner"
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Banner"
        message="Are you sure you want to delete this banner? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        icon={Trash2}
        variant="danger"
      />
    </div>
  );
};

export default Banners;
