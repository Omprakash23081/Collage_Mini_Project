import styles from "./Lost_Found.module.css";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useSearchParams } from "react-router-dom";
import { itemsService } from "../../services/itemsService.js";
import Footer from "../Footer/Footer.jsx";
import { toast } from "react-hot-toast";

function Lost_Found() {
  const { lostManue, setlostManue } = useContext(AppContext);
  const { user } = useContext(AuthContext); // Get user for auth check
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  
  const [items, setItems] = useState({
    name: "",
    description: "",
    status: "lost", // Default to lost
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
        alert("Item uploaded successfully!");
        setlostManue("items");
        // Reset form
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
      alert(msg);
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
          fetchData(); // Refresh list
      } catch (error) {
          console.error(error);
          toast.error("Failed to delete item");
      }
  };

  // Filter Logic
  const filteredData = data.filter(obj => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
        obj.name?.toLowerCase().includes(query) || 
        obj.description?.toLowerCase().includes(query) || // Note: backend schema uses lowercase 'description'
        obj.Description?.toLowerCase().includes(query) || // Legacy support
        obj.location?.toLowerCase().includes(query) ||
        obj.Location?.toLowerCase().includes(query)
    );
  });

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1>Lost and Found</h1>
        <nav className={styles.condation}>
          <button 
            onClick={() => setlostManue("post")}
            className={lostManue === "post" ? styles.activeBtn : ""}
          >
            <a>Post an Item</a>
          </button>
          <button 
            onClick={() => setlostManue("items")}
            className={lostManue === "items" ? styles.activeBtn : ""}
          >
            <a>View Items</a>
          </button>
        </nav>
      </header>

      {loding && (
        <div className={styles.loading}>
            <p>Loading...</p>
        </div>
      )}

      {lostManue === "post" && !loding && (
        <section id="post-item">
            <form className={styles.form} onSubmit={handleSubmit}>
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

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                placeholder="Describe the item (color, brand, distinguishing marks...)"
                value={items.description}
                onChange={onChange}
              ></textarea>

              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                required
                value={items.status}
                onChange={onChange}
              >
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>

              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                required
                placeholder="Where was it lost/found?"
                value={items.location}
                onChange={onChange}
              />

              <label htmlFor="contact">Contact Number:</label>
              <input
                type="number" // changed to number input for better mobile UX
                id="contact"
                name="number" // matching state key
                required
                placeholder="Your phone number"
                value={items.number}
                onChange={onChange}
              />

              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                required={!items.image} // Only required if no image selected yet? Actually always require for new post
                onChange={onChange}
                accept="image/*"
              />

              <button type="submit">Post Item</button>
            </form>
        </section>
      )}

      {lostManue === "items" && !loding && (
        <>
            {filteredData.length > 0 ? (
                filteredData.map((obj) => (
                    <div key={obj._id} className={styles.itemCard}>
                        {obj.image && (
                        <img
                            src={obj.image}
                            alt={obj.name}
                            className={styles.itemImage}
                        />
                        )}
                        <div className={styles.itemDetails}>
                          <h3 className={styles.itemTitle}>{obj.name}</h3>
                          <p className={styles.itemField}>
                              <strong>Description:</strong> {obj.description || obj.Description}
                          </p>
                          <p className={styles.itemField}>
                              <strong>Status:</strong> {obj.status || obj.Status}
                          </p>
                          <p className={styles.itemField}>
                              <strong>Location:</strong> {obj.location || obj.Location}
                          </p>
                          <p className={styles.itemField}>
                              <strong>Contact:</strong> {obj.number}
                          </p>
                        </div>
                        
                        {user?.role === "admin" && (
                            <button 
                                className={styles.deleteBtn}
                                onClick={() => handleDelete(obj._id)}
                                title="Delete Item"
                            >
                                🗑️
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <div className={styles.noResults}>
                    {data.length === 0 ? (
                        <>
                            <h2>No Items Posted Yet</h2>
                            <p>Be the first to post a lost or found item!</p>
                        </>
                    ) : (
                        <>
                            <h2>No items found matching "{searchQuery}"</h2>
                            <p>Try checking your spelling or search for something else.</p>
                        </>
                    )}
                </div>
            )}
        </>
      )}

      <Footer />
    </div>
  );
}

export default Lost_Found;
