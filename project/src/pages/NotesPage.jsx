import { useState, useContext } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";
import { DataContext } from "../context/DataContext.jsx";

const NotesPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const { notes } = useContext(DataContext);

  console.log(notes);

  // const [notes, setNotes] = useState([
  //   {
  //     id: 1,
  //     title: "Quadratic Equations",
  //     chapterTitle: "Algebra Basics",
  //     yearTags: ["Class 11", "Class 12"],
  //     important: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Linear Equations",
  //     chapterTitle: "Algebra Basics",
  //     yearTags: ["Class 11"],
  //     important: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Functions",
  //     chapterTitle: "Algebra Basics",
  //     yearTags: ["Class 12"],
  //     important: true,
  //   },
  // ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    chapterTitle: "",
    yearTags: [],
    important: false,
    description: "",
  });
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    item: null,
  });
  const [filterYear, setFilterYear] = useState("all");

  const handleAddClick = () => {
    setFormData({
      title: "",
      chapterTitle: "",
      yearTags: [],
      important: false,
      description: "",
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (note) => {
    setFormData({ ...note });
    setEditingId(note.id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (note) => {
    setConfirmDialog({ isOpen: true, item: note });
  };

  const handleConfirmDelete = () => {
    setNotes(notes.filter((n) => n.id !== confirmDialog.item.id));
    setConfirmDialog({ isOpen: false, item: null });
    setToast({ message: "Note deleted successfully", type: "success" });
  };

  const handleSave = () => {
    if (!formData.title || !formData.chapterTitle) {
      setToast({ message: "Please fill in all fields", type: "error" });
      return;
    }

    if (editingId) {
      setNotes(
        notes.map((n) =>
          n.id === editingId ? { ...formData, id: editingId } : n
        )
      );
      setToast({ message: "Note updated successfully", type: "success" });
    } else {
      setNotes([...notes, { ...formData, id: Date.now() }]);
      setToast({ message: "Note created successfully", type: "success" });
    }
    setIsModalOpen(false);
  };

  // const filteredNotes = notes.filter((note) => {
  //   if (activeTab === "important" && !note.important) return false;
  //   if (filterYear !== "all" && !note.yearTags.includes(filterYear))
  //     return false;
  //   return true;
  // });
  const filteredNotes = notes;

  const columns = [
    { key: "title", label: "subjectName" },
    { key: "chapterTitle", label: "Chapter" },
    {
      key: "yearTags",
      label: "Years",
      render: (row) => row.yearTags.join(", "),
    },
    {
      key: "important",
      label: "Important",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.important
              ? "bg-yellow-900 text-yellow-200"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {row.important ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Notes</h1>
        <button
          onClick={handleAddClick}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Note
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "all"
                ? "bg-primary-600 text-white"
                : "bg-dark-700 text-gray-300 hover:bg-dark-600"
            }`}
          >
            All Notes
          </button>
          <button
            onClick={() => setActiveTab("important")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "important"
                ? "bg-primary-600 text-white"
                : "bg-dark-700 text-gray-300 hover:bg-dark-600"
            }`}
          >
            Important Notes
          </button>
        </div>

        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="input-field w-48"
        >
          <option value="all">All Years</option>
          <option value="Class 11">First Year</option>
          <option value="Class 12">Second Year</option>
          <option value="Class 12">Therd Year</option>
          <option value="Class 12">Fourth Year</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filteredNotes}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* this is form continear */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Note" : "Add Note"}
        actions={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary">
              {editingId ? "Update" : "Create"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          {/* subjectName */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              subjectName
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="input-field"
              placeholder="e.g., Quadratic Equations"
            />
          </div>
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes
            </label>
            <input
              type="file"
              value={formData.chapterTitle}
              onChange={(e) =>
                setFormData({ ...formData, chapterTitle: e.target.value })
              }
              className="input-field"
              placeholder="e.g., Quadratic Equations"
            />
          </div>
          {/* Subject name */}
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject Name
              </label>
              <input
                type="text"
                value={formData.chapterTitle}
                onChange={(e) =>
                  setFormData({ ...formData, chapterTitle: e.target.value })
                }
                className="input-field"
                placeholder="e.g., Quadratic Equations"
              />
            </div>
          </div>
          {/* Teacher name */}
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Teacher Name
              </label>
              <input
                type="text"
                value={formData.chapterTitle}
                onChange={(e) =>
                  setFormData({ ...formData, chapterTitle: e.target.value })
                }
                className="input-field"
                placeholder="e.g., Quadratic Equations"
              />
            </div>
          </div>
          {/* this is Year tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Year Tags
            </label>
            <div className="space-y-2">
              {["First Year", "Second Year", "Third Year", "Fourth Year"].map(
                (year) => (
                  <label
                    key={year}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.yearTags.includes(year)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            yearTags: [...formData.yearTags, year],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            yearTags: formData.yearTags.filter(
                              (y) => y !== year
                            ),
                          });
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-gray-300">{year}</span>
                  </label>
                )
              )}
            </div>
          </div>
          {/* this is contenet tag */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="input-field"
              placeholder="Enter note description..."
              rows="4"
            />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.important}
              onChange={(e) =>
                setFormData({ ...formData, important: e.target.checked })
              }
              className="rounded"
            />
            <span className="text-gray-300">Mark as important</span>
          </label>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Note"
        message="Are you sure you want to delete this note?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, item: null })}
        confirmText="Delete"
        isDangerous
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default NotesPage;
