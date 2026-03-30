import styles from "./Lost_Found.module.css";
import { useState, useContext, useEffect } from "react";
import { useApp } from "../../context/GlobalContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useSearchParams } from "react-router-dom";
import { itemsService } from "../../services/itemsService.js";
import Footer from "../../components/Footer/Footer.jsx";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Phone, 
  PlusCircle, 
  Package, 
  CheckCircle2, 
  ClipboardList,
  AlertCircle,
  Calendar,
  Image as ImageIcon,
  Trash2,
  Info
} from "lucide-react";

function Lost_Found() {
  const { lostManue, setlostManue } = useApp();
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  
  const [items, setItems] = useState({
    name: "",
    description: "",
    status: "lost",
    location: "",
    number: "",
    image: null,
  });
  const [data, setData] = useState([]);
  const [loding, setLoding] = useState(false);

  const onChange = (e) => {
    if (e.target.type === "file") {
      setItems({ ...items, [e.target.name]: e.target.files[0] });
    } else {
      setItems({ ...items, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoding(true);
    const formData = new FormData();
    formData.append("name", items.name);
    formData.append("description", items.description);
    formData.append("status", items.status);
    formData.append("location", items.location);
    formData.append("number", items.number);
    formData.append("image", items.image);

    try {
      const res = await itemsService.uploadItem(formData);
      if (res.status < 400) {
        toast.success("Item uploaded successfully!");
        setlostManue("items");
        setItems({
            name: "",
            description: "",
            status: "lost",
            location: "",
            number: "",
            image: null
        });
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Error uploading item.";
      toast.error(msg);
    } finally {
        setLoding(false);
    }
  };

  const fetchData = async () => {
    setLoding(true);
    try {
      const res = await itemsService.getItems();
      if (res.data && res.data.data) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoding(false);
    }
  };

  useEffect(() => {
    if (lostManue === "items") fetchData();
  }, [lostManue]);

  const handleDelete = async (id) => {
      if(!window.confirm("Are you sure you want to delete this item?")) return;
      
      try {
          await itemsService.deleteItem(id);
          toast.success("Item deleted successfully");
          fetchData();
      } catch (error) {
          console.error(error);
          toast.error("Failed to delete item");
      }
  };

  const filteredData = data.filter(obj => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
        obj.name?.toLowerCase().includes(query) || 
        obj.description?.toLowerCase().includes(query) ||
        obj.location?.toLowerCase().includes(query)
    );
  });

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Lost and Found
        </motion.h1>
        
        {/* Stats Section */}
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{data.length}</span>
            <span className={styles.statLabel}>Total Items</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{data.filter(i => i.status === 'lost').length}</span>
            <span className={styles.statLabel}>Lost Reports</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{data.filter(i => i.status === 'found').length}</span>
            <span className={styles.statLabel}>Found Items</span>
          </div>
        </div>

        <nav className={styles.condation}>
          <button 
            onClick={() => setlostManue("post")}
            className={lostManue === "post" ? styles.activeBtn : ""}
          >
            <PlusCircle size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Post an Item
          </button>
          <button 
            onClick={() => setlostManue("items")}
            className={lostManue === "items" ? styles.activeBtn : ""}
          >
            <Package size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            View Items
          </button>
        </nav>
      </header>

      {/* How it works for New Users */}
      {lostManue === "items" && data.length === 0 && !searchQuery && (
        <section className={styles.howItWorks}>
          <h2>Reuniting you with your belongings</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.stepItem}>
              <div className={styles.stepIcon}><PlusCircle /></div>
              <h3>Report It</h3>
              <p>Upload details and a photo of the lost or found item.</p>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepIcon}><Search /></div>
              <h3>Search</h3>
              <p>Browse the database using keywords or locations.</p>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepIcon}><CheckCircle2 /></div>
              <h3>Recover</h3>
              <p>Connect with the finder/owner to retrieve your item.</p>
            </div>
          </div>
        </section>
      )}

      <main className={styles.content}>
        {loding && (
          <div className={styles.loading}>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ display: 'inline-block', marginBottom: '10px' }}
              >
                <ClipboardList size={40} />
              </motion.div>
              <p>Syncing items...</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {lostManue === "post" && !loding && (
            <motion.section 
              key="post-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              id="post-item"
            >
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                    <Info size={24} color="#3b82f6" />
                    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Item Details</h2>
                  </div>

                  <label htmlFor="name">Item Title:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Blue Backpack"
                    value={items.name}
                    onChange={onChange}
                  />

                  <label htmlFor="description">Detailed Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    required
                    placeholder="Provide specific details (brand, color, identifying marks...)"
                    value={items.description}
                    onChange={onChange}
                  ></textarea>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label htmlFor="status">Status:</label>
                      <select id="status" name="status" required value={items.status} onChange={onChange}>
                        <option value="lost">Lost</option>
                        <option value="found">Found</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="location">Location:</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        placeholder="e.g. Library, Café"
                        value={items.location}
                        onChange={onChange}
                      />
                    </div>
                  </div>

                  <label htmlFor="contact">Contact Number:</label>
                  <input
                    type="tel"
                    id="contact"
                    name="number"
                    required
                    placeholder="Your phone number"
                    value={items.number}
                    onChange={onChange}
                  />

                  <label htmlFor="image">Upload Item Photo:</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      required={!items.image}
                      onChange={onChange}
                      accept="image/*"
                      style={{ paddingLeft: '45px' }}
                    />
                    <ImageIcon size={20} style={{ position: 'absolute', left: '15px', top: '14px', color: '#94a3b8' }} />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    Post Item
                  </button>
                </form>
            </motion.section>
          )}

          {lostManue === "items" && !loding && (
            <motion.div 
              key="items-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
                {filteredData.length > 0 ? (
                    filteredData.map((obj, index) => (
                        <motion.div 
                          key={obj._id} 
                          className={styles.itemCard}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                            <div className={styles.itemImageWrapper}>
                                {obj.image ? (
                                    <img src={obj.image} alt={obj.name} className={styles.itemImage} />
                                ) : (
                                    <div className={styles.imagePlaceholder}>
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                                <div className={`${styles.statusBadge} ${obj.status === 'found' ? styles.statusFound : styles.statusLost}`}>
                                    {obj.status === 'found' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                    {obj.status || 'Lost'}
                                </div>
                            </div>

                            <div className={styles.itemDetails}>
                                <div className={styles.itemHeader}>
                                    <h3 className={styles.itemTitle}>{obj.name}</h3>
                                    {obj.createdAt && (
                                        <span className={styles.itemDate}>
                                            <Calendar size={14} />
                                            {new Date(obj.createdAt).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                                
                                <p className={styles.itemDescription}>
                                    {obj.description || obj.Description}
                                </p>

                                <div className={styles.itemGrid}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Location</span>
                                        <span className={styles.infoValue}>
                                            <MapPin size={16} className={styles.infoIcon} />
                                            {obj.location || obj.Location}
                                        </span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Contact</span>
                                        <span className={styles.infoValue}>
                                            <Phone size={16} className={styles.infoIcon} />
                                            {obj.number}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {user?.role === "admin" && (
                                <button 
                                    className={styles.deleteBtn}
                                    onClick={() => handleDelete(obj._id)}
                                    title="Delete Item"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </motion.div>
                    ))
                ) : (
                    <motion.div 
                      className={styles.emptyStateContainer}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                        <Search className={styles.emptyIcon} size={64} />
                        {data.length === 0 ? (
                            <>
                                <h2>No Items Yet</h2>
                                <p>Help others by posting any lost or found items you come across.</p>
                            </>
                        ) : (
                            <>
                                <h2>No matches found</h2>
                                <p>We couldn't find any items matching "{searchQuery}". Try a broader search.</p>
                            </>
                        )}
                    </motion.div>
                )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default Lost_Found;
