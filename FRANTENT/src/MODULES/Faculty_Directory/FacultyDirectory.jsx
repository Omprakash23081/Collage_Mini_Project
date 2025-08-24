import styles from "./FacultyDirectory.module.css";
import { useState } from "react";

const facultyData = [
  { name: "Dr. Alice Smith", department: "cs", designation: "Professor" },
  {
    name: "Dr. Bob Johnson",
    department: "math",
    designation: "Assistant Professor",
  },
  { name: "Dr. Charlie Lee", department: "physics", designation: "Lecturer" },
  {
    name: "Dr. Diana Brown",
    department: "cs",
    designation: "Assistant Professor",
  },
];

function FacultyDirectory() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filteredData = facultyData.filter((faculty) => {
      const matchesName = faculty.name
        .toLowerCase()
        .includes(name.trim().toLowerCase());
      const matchesDepartment = department
        ? faculty.department.toLowerCase() === department
        : true;
      const matchesDesignation = designation
        ? faculty.designation.toLowerCase() === designation
        : true;
      return matchesName && matchesDepartment && matchesDesignation;
    });
    setResults(filteredData);
  };

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.headerTitle}>Faculty Directory</h1>
        <p className={styles.headerSubtitle}>
          Find faculty members by name, department, or designation.
        </p>
      </header>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Faculty Name"
          className={styles.inputField}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className={styles.inputField}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="cs">Computer Science</option>
          <option value="math">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
        </select>
        <select
          className={styles.inputField}
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        >
          <option value="">Select Designation</option>
          <option value="professor">Professor</option>
          <option value="assistant professor">Assistant Professor</option>
          <option value="lecturer">Lecturer</option>
        </select>
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className={styles.results}>
        {results.length > 0 ? (
          results.map((faculty, index) => (
            <div className={styles.faculty_card} key={index}>
              <div className={styles.card_inner}>
                <div className={styles.card_image}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      faculty.name
                    )}&background=0D8ABC&color=fff`}
                    alt={faculty.name}
                  />
                </div>
                <div className={styles.card_details}>
                  <h3>{faculty.name}</h3>
                  <p>Department: {faculty.department.toUpperCase()}</p>
                  <p>Designation: {faculty.designation}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default FacultyDirectory;
