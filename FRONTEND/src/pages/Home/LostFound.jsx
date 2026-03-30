import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Lost_Found.module.css";
import { itemsService } from "../../services/itemsService.js";
import { motion } from "framer-motion";
import { Search, PlusCircle, ArrowRight, MapPin, Clock, Package } from "lucide-react";

function Lost_Found() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentItems = async () => {
      setLoading(true);
      try {
        const res = await itemsService.getItems();
        if (res.data && res.data.data) {
          // Take only the 3 most recent items
          setRecentItems(res.data.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching recent items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentItems();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/lost-found?q=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/lost-found");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.container_Lost_found}>
      <div className={styles.headers}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h1>Lost & Found</h1>
          <p>
            Report lost items or search for found valuables in seconds. <br />
            We help reunite you with your belongings safely and quickly.
          </p>
        </motion.div>
      </div>

      <div className={styles.search_bar1}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Search size={20} color="#64748b" style={{ marginRight: '15px' }} />
          <input
            type="text"
            placeholder="What did you lose? e.g. keys, wallet, phone..."
            className={styles.input_name}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button className={styles.search_button} onClick={handleSearch} aria-label="Search items">
          <ArrowRight size={24} />
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '60px' }}>
          <Link to="/lost-found" className={styles.cta_link} onClick={() => window.scrollTo(0, 0)}>
            <PlusCircle size={18} style={{ marginRight: '8px' }} />
            Post Item
          </Link>
          <Link to="/lost-found" className={styles.cta_link_outline} onClick={() => window.scrollTo(0, 0)}>
            <Package size={18} style={{ marginRight: '8px' }} />
            Browse All
          </Link>
        </div>

        {recentItems.length > 0 && (
          <div className={styles.recent_reports}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: '#fff', fontSize: '1.5rem', margin: 0 }}>Recently Reported</h2>
              <Link to="/lost-found" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                View all <ArrowRight size={14} style={{ marginLeft: '5px' }} />
              </Link>
            </div>

            <div className={styles.items_grid}>
              {recentItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  className={styles.item_card}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.image_wrapper}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                        <Package size={48} />
                      </div>
                    )}
                    <span className={`${styles.status_badge} ${item.status === 'lost' ? styles.lost : styles.found}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className={styles.item_details}>
                    <h3>{item.name}</h3>
                    <p className={styles.description}>{item.description}</p>
                    <div className={styles.meta}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <MapPin size={14} /> {item.location}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Clock size={14} /> {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Lost_Found;
