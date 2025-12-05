import styles from "./Lost_Found.module.css";
import { useState, useContext } from "react";
import axios from "../../API/axiosConfig.js";
import { AppContext } from "../../context/AppContext.jsx";
import { useEffect } from "react";

function Lost_Found() {
  const { lostManue, setlostManue } = useContext(AppContext);
  const [items, setItems] = useState({
    name: "",
    description: "",
    status: "",
    location: "",
    number: 0,
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
      const res = await axios.post(`/items/upload`, formData);

      if (res.status < 400) {
        alert("item uploaded successfully ", res.data);
        if (res) setlostManue("items");
        setLoding(false);
      }
    } catch (error) {
      console.log(error);
      const msg =
        error.response?.data?.message || "error during uploading form";
      alert(msg);
    }
  };

  useEffect(() => {
    const fatchData = async () => {
      setLoding(true);
      try {
        const res = await axios.get(`/items`);
        if (res.status < 400) {
          setData(res.data.data);
        }
        setLoding(false);
      } catch (error) {
        alert("errer during fatching data from DB", error);
      }
      setLoding(false);
    };
    if (lostManue === "items") fatchData();
  }, [lostManue]);

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1>Lost and Found</h1>
        <nav className={styles.condation}>
          <button onClick={() => setlostManue("post")}>
            <a>Post an Item</a>
          </button>
          <button onClick={() => setlostManue("items")}>
            <a>View Items</a>
          </button>
        </nav>
      </header>

      {loding && (
        <>
          <h1>page is loding....</h1>
        </>
      )}

      {lostManue === "post" && !loding && (
        <>
          <section id="post-item">
            <form
              id="name"
              className={styles.form}
              onSubmit={(e) => handleSubmit(e)}
            >
              <label htmlFor="name">Item Title:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder={items.name}
                onChange={(e) => onChange(e)}
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                onChange={(e) => onChange(e)}
                placeholder={items.Description}
              ></textarea>

              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                required
                onChange={(e) => onChange(e)}
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
                placeholder={items.Location}
                onChange={(e) => onChange(e)}
              />

              <label htmlFor="contact">Your Contact Info:</label>
              <input
                type="text"
                id="contact"
                name="contact"
                required
                minLength={10}
                maxLength={10}
                placeholder={items.number}
                onChange={(e) => onChange(e)}
              />

              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                required
                onChange={(e) => onChange(e)}
              />

              <button type="submit">Post Item</button>
            </form>
          </section>
        </>
      )}

      {lostManue === "items" && !loding && (
        <>
          {Array.isArray(data) &&
            data.map((obj) => (
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
                    <strong>Description:</strong> {obj.Description}
                  </p>
                  <p className={styles.itemField}>
                    <strong>Status:</strong> {obj.Status}
                  </p>
                  <p className={styles.itemField}>
                    <strong>Location:</strong> {obj.Location}
                  </p>
                  <p className={styles.itemField}>
                    <strong>Contact:</strong> {obj.number}
                  </p>
                </div>
              </div>
            ))}
        </>
      )}

      <footer className={styles.footer}>
        <p>&copy; 2024 Student Sport Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Lost_Found;
