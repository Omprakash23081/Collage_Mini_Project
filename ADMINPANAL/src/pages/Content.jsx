import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  Award,
  Briefcase,
  Upload,
  X,
  Image as ImageIcon,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";
import Button from "../components/Common/Button";
import Modal from "../components/Common/Modal";
import Table from "../components/Common/Table";
import axios from "../api/axiosConfig";
import { toast } from "react-hot-toast";
import Loader from "../components/Common/Loader";

// --- Image/File Upload Component ---
function ImageUpload({ onImageSelect, currentImage, onImageRemove, label = "Image/File" }) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>

      {currentImage ? (
        <div className="relative inline-block">
          {/* Simple preview logic: if it looks like an image URL or data URI, show img tag. 
              If it's a PDF or other file, show a generic icon or name. 
              For simplicity, we'll try to show img, if it fails or is PDF, we show icon. */}
          {typeof currentImage === 'string' && (currentImage.match(/\.(jpeg|jpg|gif|png)$/i) || currentImage.startsWith('data:image')) ? (
             <img
              src={currentImage}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border border-gray-600"
            />
          ) : (
            <div className="w-32 h-32 flex flex-col items-center justify-center bg-gray-800 rounded-lg border border-gray-600 p-2">
                <FileText className="w-10 h-10 text-blue-400 mb-2"/>
                <span className="text-xs text-center text-gray-400 break-all">File Selected</span>
            </div>
          )}
         
          {onImageRemove && (
            <button
              type="button"
              onClick={onImageRemove}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
          <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">Click to upload {label}</p>
          <p className="text-xs text-gray-500">Supported formats: JPG, PNG, PDF</p>
        </div>
      )}

      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg cursor-pointer transition-colors"
      >
        <Upload className="w-4 h-4 mr-2" />
        {currentImage ? "Change File" : "Upload File"}
      </label>
    </div>
  );
}

export default function Content() {
  const [activeTab, setActiveTab] = useState("Notes");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const tabs = [
    { id: "Notes", name: "Notes", icon: FileText },
    { id: "PYQ", name: "PYQ", icon: Award },
    { id: "Items", name: "Lost & Found", icon: Briefcase },
  ];

  // --- Fetch Data ---
  const fetchData = async () => {
    setLoading(true);
    try {
      let endpoint = "";
      if (activeTab === "Notes") endpoint = "/notes/";
      else if (activeTab === "PYQ") endpoint = "/pyq/";
      else if (activeTab === "Items") endpoint = "/items/";

      if (endpoint) {
        const response = await axios.get(endpoint);
        // Backend response structure: { statusCode: 200, data: [...], message: "..." }
        setData(response.data.data || []);
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
      toast.error(`Failed to fetch ${activeTab}`);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // --- Handlers ---
  const handleRefresh = () => {
    fetchData();
    toast.success("Data refreshed");
  };

  const handleAdd = () => {
    setEditingItem(null);
    setSelectedImage(null);
    setImagePreview("");
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setSelectedImage(null);
    // Determine preview image/file URL based on item type
    let preview = "";
    if (activeTab === "Notes") preview = item.fileUrl;
    else if (activeTab === "PYQ") preview = item.image;
    else if (activeTab === "Items") preview = item.image;
    
    setImagePreview(preview || "");
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        let endpoint = "";
        if (activeTab === "Notes") endpoint = `/notes/${id}`;
        else if (activeTab === "PYQ") endpoint = `/pyq/${id}`;
        else if (activeTab === "Items") endpoint = `/items/${id}`;

        if (endpoint) {
          await axios.delete(endpoint);
          // Instant UI update: remove item from local state
          setData((prevData) => prevData.filter((item) => item._id !== id));
          toast.success("Item deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        toast.error("Failed to delete item");
      }
    }
  };

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Append the file if selected
    if (selectedImage) {
      formData.append("image", selectedImage); 
      // Note: Backend 'notes' expects 'image' field for file upload based on routes/notes.routes.js: const file = upload.single("image");
      // Backend 'items' expects 'image' field.
      // Backend 'pyq' expects 'image' field.
    }

    try {
      let endpoint = "";
      let method = "POST";

      if (activeTab === "Notes") {
        endpoint = editingItem ? `/notes/${editingItem._id}` : "/notes/upload";
        method = editingItem ? "PATCH" : "POST";
      } else if (activeTab === "PYQ") {
        endpoint = editingItem ? `/pyq/${editingItem._id}` : "/pyq/create";
        method = editingItem ? "PATCH" : "POST";
      } else if (activeTab === "Items") {
        endpoint = editingItem ? `/items/${editingItem._id}` : "/items/upload";
        method = editingItem ? "PATCH" : "POST";
      }

      // For file upload, we MUST send FormData. 
      // Axios handles Content-Type: multipart/form-data automatically when data is FormData.
      // However, for PATCH requests without file, backend might expect JSON. 
      // But if we use FormData, it should work if backend uses multer (which it does).
      
      // Special handling for Update if backend doesn't support file update on PATCH?
      // Notes controller `updateNotes` does NOT seem to handle file upload (no `req.file` usage).
      // PYQ controller `updatePYQ` does NOT seem to handle file upload.
      // Items controller `updateItem` DOES handle file upload (`if (req.file?.path) ...`).
      
      if (editingItem && (activeTab === "Notes" || activeTab === "PYQ") && selectedImage) {
         toast.error("Updating file/image is not supported for this item type. Please delete and re-create.");
         return;
      }

      setIsModalOpen(false); // Close modal immediately as requested

      if (method === "POST") {
          await axios.post(endpoint, formData);
      } else {
          // For PATCH, if we are just updating text, we can send JSON or FormData.
          // Since Items supports file update, we send FormData.
          // Notes/PYQ don't support file update, but sending FormData should still work for text fields if multer is present on the route.
          // Checking routes:
          // Notes PATCH route: `router.route("/:id").patch(verifyJWT, updateNotes);` -> NO multer middleware!
          // PYQ PATCH route: `router.route("/:id").patch(verifyJWT, updatePYQ);` -> NO multer middleware!
          // Items PATCH route: `router.route("/:id").patch(verifyJWT, file, updateItem);` -> HAS multer middleware.
          
          if (activeTab === "Items") {
              await axios.patch(endpoint, formData);
          } else {
              // For Notes and PYQ, we must send JSON for updates as the route has no multer
              const jsonPayload = Object.fromEntries(formData.entries());
              await axios.patch(endpoint, jsonPayload);
          }
      }

      toast.success(`${activeTab} saved successfully`);
      fetchData();
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error(error.response?.data?.message || "Failed to save item");
      // Optional: Re-open modal on error if needed, but user requested "cut" behavior.
    }
  };

  // --- Form Rendering ---
  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NOTES FORM */}
        {activeTab === "Notes" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Subject Name</label>
              <input type="text" name="subjectName" defaultValue={editingItem?.subjectName} required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea name="description" rows={3} defaultValue={editingItem?.description} className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Teacher Name</label>
                <input type="text" name="teacherName" defaultValue={editingItem?.teacherName} required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
                <input type="text" name="year" defaultValue={editingItem?.year} required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
                </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Type (e.g., Notes, Book)</label>
              <input type="text" name="type" defaultValue={editingItem?.type} required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            {!editingItem && (
                <ImageUpload onImageSelect={handleImageSelect} currentImage={imagePreview} onImageRemove={handleImageRemove} label="Upload PDF/File" />
            )}
          </>
        )}

        {/* PYQ FORM */}
        {activeTab === "PYQ" && (
          <>
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Question No.</label>
                <input type="number" name="questionNumber" defaultValue={editingItem?.questionNumber} required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Subject Name</label>
                <input type="text" name="subjectName" defaultValue={editingItem?.subjectName} required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
                </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Question</label>
              <textarea name="question" rows={2} defaultValue={editingItem?.question} required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Answer</label>
              <textarea name="answer" rows={3} defaultValue={editingItem?.answer} required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tag</label>
                <input type="text" name="tag" defaultValue={editingItem?.tag} required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Years (comma separated)</label>
                <input type="text" name="years" defaultValue={editingItem?.years?.join(',')} placeholder="2020,2021" required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
                </div>
            </div>
            {!editingItem && (
                 <ImageUpload onImageSelect={handleImageSelect} currentImage={imagePreview} onImageRemove={handleImageRemove} label="Question Image (Optional)" />
            )}
          </>
        )}

        {/* LOST & FOUND FORM */}
        {activeTab === "Items" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Item Name</label>
              <input type="text" name="name" defaultValue={editingItem?.name} required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea name="description" rows={2} defaultValue={editingItem?.description} className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <select name="status" defaultValue={editingItem?.status || "Lost"} className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500">
                    <option value="Lost">Lost</option>
                    <option value="Found">Found</option>
                    <option value="Recovered">Recovered</option>
                </select>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                <input type="text" name="location" defaultValue={editingItem?.location} required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
                </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Contact Number</label>
              <input type="number" name="number" defaultValue={editingItem?.number} required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <ImageUpload onImageSelect={handleImageSelect} currentImage={imagePreview} onImageRemove={handleImageRemove} label="Item Image" />
          </>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">
            {editingItem ? "Update" : "Add"} {activeTab}
          </Button>
        </div>
      </form>
    );
  };

  // --- Columns Definition ---
  const getColumns = () => {
      if (activeTab === "Notes") {
          return [
              { key: 'subjectName', header: 'Subject' },
              { key: 'description', header: 'Description' },
              { key: 'teacherName', header: 'Teacher' },
              { key: 'year', header: 'Year' },
              { key: 'type', header: 'Type' },
          ];
      } else if (activeTab === "PYQ") {
          return [
              { key: 'questionNumber', header: 'Q.No' },
              { key: 'subjectName', header: 'Subject' },
              { key: 'question', header: 'Question', render: (val) => <span className="truncate max-w-xs block" title={val}>{val}</span> },
              { key: 'years', header: 'Years', render: (val) => Array.isArray(val) ? val.join(', ') : val },
          ];
      } else if (activeTab === "Items") {
          return [
              { key: 'image', header: 'Image', render: (val) => <img src={val} alt="item" className="w-10 h-10 rounded object-cover" /> },
              { key: 'name', header: 'Item Name' },
              { key: 'status', header: 'Status', render: (val) => (
                  <span className={`px-2 py-1 rounded text-xs ${val === 'Lost' ? 'bg-red-900 text-red-200' : val === 'Found' ? 'bg-green-900 text-green-200' : 'bg-gray-700 text-gray-300'}`}>
                      {val}
                  </span>
              )},
              { key: 'location', header: 'Location' },
              { key: 'number', header: 'Contact' },
          ];
      }
      return [];
  };

  const columns = [
      ...getColumns(),
      { 
          key: 'actions', 
          header: 'Actions',
          render: (value, row) => (
            <div className="flex items-center space-x-2">
              <button onClick={() => handleEdit(row)} className="p-1 text-blue-400 hover:text-blue-300"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(row._id)} className="p-1 text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
            </div>
          )
      }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Management</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage Notes, PYQs, and Lost & Found Items
          </p>
        </div>
        <div className="flex space-x-2">
            <Button onClick={handleRefresh} variant="secondary" icon={RefreshCw}>
            Refresh
            </Button>
            <Button onClick={handleAdd} icon={Plus}>
            Add {activeTab === "Items" ? "Item" : activeTab}
            </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
        <div className="border-b border-gray-700">
          <nav className="flex flex-wrap gap-2 sm:gap-8 px-4 sm:px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-x-auto min-h-[400px]">
           {loading ? (
               <Loader fullScreen={false} text={`Fetching ${activeTab}...`} />
           ) : (
               <Table columns={columns} data={data} />
           )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${editingItem ? "Edit" : "Add"} ${activeTab === "Items" ? "Item" : activeTab}`}
        size="lg"
      >
        {renderForm()}
      </Modal>
    </div>
  );
}
