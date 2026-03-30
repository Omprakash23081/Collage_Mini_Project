import { Link, useNavigate } from "react-router-dom";
import style from "./YearBooks.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function YearBooks() {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const years = [
    { title: "FIRST YEAR", desc: ".....................", num: "1" },
    { title: "SECOND YEAR", desc: "...................", num: "2" },
    { title: "THIRD YEAR", desc: "............................", num: "3" },
    { title: "FOURTH YEAR", desc: "...........................", num: "4" },
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
              <div className={style.iconWrapper}>
                <svg viewBox="0 0 100 100" className={style.numberSvg}>
                  <defs>
                    <linearGradient id={`grad${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#818CF8" />
                    </linearGradient>
                    <filter id={`glow${index}`}>
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <circle cx="50" cy="50" r="45" fill="none" stroke={`url(#grad${index})`} strokeWidth="4" filter={`url(#glow${index})`} opacity="0.5" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke={`url(#grad${index})`} strokeWidth="2" />
                  <text x="50" y="68" fontSize="56" fontWeight="bold" fill="#ffffff" textAnchor="middle" style={{fontFamily: 'system-ui, sans-serif'}} filter={`url(#glow${index})`}>{year.num}</text>
                </svg>
              </div>
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
