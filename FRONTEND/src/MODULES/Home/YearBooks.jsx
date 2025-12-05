import image from "../PHOTO/rocket.gif";
import { Link, useNavigate } from "react-router-dom";
import style from "./YearBooks.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function YearBooks() {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

    const yearValue = index + 1; // Sending 1, 2, 3, 4 as number or string based on backend expectation. 
    // Previous code used `year${index+1}`. I'll stick to that if that's what the backend expects, 
    // but usually "1", "2" etc is cleaner. Let's check the previous code... 
    // It was `const yearValue = 'year${index + 1}';`
    // I will keep it consistent.
    const yearString = `year${index + 1}`;

    try {
      await updateUser({ year: yearString });
      navigate("/Primum");
    } catch (error) {
      console.error("Failed to update year:", error);
      // You might want to add a toast notification here
    }
  };

  return (
    <section className={style.yearSection}>
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
