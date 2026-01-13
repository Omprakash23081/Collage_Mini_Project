import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Lost_Found.module.css";

function Lost_Found() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
        <h1>Lost & Found</h1>
        <p>
          Report lost items or search for found valuables in seconds. We help reunite you with your belongings.
        </p>
      </div>

      <div className={styles.search_bar1}>
        <input
          type="text"
          placeholder="Search for lost items..."
          className={styles.input_name}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.search_button} onClick={handleSearch}>
          <b>→</b>
        </button>
      </div>
    </div>
  );
}

export default Lost_Found;
