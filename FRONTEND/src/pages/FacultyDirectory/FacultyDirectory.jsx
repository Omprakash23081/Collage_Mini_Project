import styles from "./FacultyDirectory.module.css";
import { useState, useEffect } from "react";
import { facultyService } from "../../services/facultyService";
import { toast } from "react-hot-toast";

function FacultyDirectory() {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Search filters
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  
  const fetchFaculty = async () => {
      setLoading(true);
      try {
          const res = await facultyService.getAll();
          if(res.data && res.data.data) {
              setFacultyData(res.data.data);
          } else if (Array.isArray(res.data)) {
             // Handle case where it might return array directly
             setFacultyData(res.data);
          }
      } catch (error) {
          console.error(error);
          toast.error("Failed to load faculty directory");
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchFaculty();
  }, []);

  // Filter Logic
  const filteredResults = facultyData.filter((faculty) => {
    const matchesName = faculty.name?.toLowerCase().includes(name.trim().toLowerCase());
    const matchesDepartment = department
      ? faculty.department?.toLowerCase() === department
      : true;
    const matchesDesignation = designation
      ? faculty.designation?.toLowerCase() === designation
      : true;
    return matchesName && matchesDepartment && matchesDesignation;
  });

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.headerTitle}>Faculty Directory</h1>
          <p className={styles.headerSubtitle}>
            Find faculty members by name, department, or designation.
          </p>
        </div>
      </div>

      <div className={styles.filterToolbar}>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search by name..."
            className={styles.searchInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className={styles.filterGroup}>
            <select
              className={styles.filterSelect}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="cs">Computer Science</option>
              <option value="math">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
            </select>
            <div className={styles.divider}></div>
            <select
              className={styles.filterSelect}
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value="">All Designations</option>
              <option value="professor">Professor</option>
              <option value="assistant professor">Assistant Professor</option>
              <option value="lecturer">Lecturer</option>
            </select>
        </div>
      </div>

      {loading ? (
          <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Loading directory...</p>
          </div>
      ) : (
        <div className={styles.results}>
            {filteredResults.length > 0 ? (
            filteredResults.map((faculty) => (
                <div className={styles.faculty_card} key={faculty._id}>
                <div className={styles.card_inner}>
                    <div className={styles.card_image}>
                    <img
                        src={faculty.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&background=020617&color=fff`}
                        alt={faculty.name}
                    />
                    </div>
                    <div className={styles.card_details}>
                        <h3>{faculty.name}</h3>
                        <div className={styles.tags}>
                            <span className={styles.tag}>{faculty.department?.toUpperCase()}</span>
                            <span className={styles.tag}>{faculty.designation}</span>
                        </div>
                        <p className={styles.subject}>{faculty.subject}</p>
                    </div>
                </div>
                </div>
            ))
            ) : (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📂</div>
                <h3>No faculty members found</h3>
                <p>Try adjusting your search or filters.</p>
            </div>
            )}
        </div>
      )}
    </div>
  );
}

export default FacultyDirectory;
