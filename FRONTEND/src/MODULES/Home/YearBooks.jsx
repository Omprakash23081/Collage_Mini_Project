import image from "../PHOTO/rocket.gif";
import { Link, useNavigate } from "react-router-dom";
import style from "./YearBooks.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function YearBooks() {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const years = [
    { title: "FIRST YEAR", desc: "....................." },
    { title: "SECOND YEAR", desc: "..................." },
    { title: "THIRD YEAR", desc: "............................" },
    { title: "FOURTH YEAR", desc: "..........................." },
  ];

  const handleYearClick = async (index) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    const yearString = `year${index + 1}`;

    try {
      await updateUser({ year: yearString });
      navigate("/Primum");
    } catch (error) {
      console.error("Failed to update year:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={style.yearSection}>
      {/* GLOBAL LOADER */}
      {loading && (
        <div className="loading-overlay">
          <div className="loader">Loading...</div>
        </div>
      )}
      <div className={style.yearContainer}>
        <h1 className={style.header} id="yearBook">
          EXPLORE AS PER YEAR
        </h1>

        <div className={style.cardWrapper}>
          {years.map((year, index) => (
            <div
              className={style.card}
              key={index}
            >
              <img src={image} alt={year.title} className={style.profileImage} />
              <h2>{year.title}</h2>
              <p>{year.desc}</p>
              <button 
                className={style.loginButton}
                onClick={() => handleYearClick(index)}
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default YearBooks;
