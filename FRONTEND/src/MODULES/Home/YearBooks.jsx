import image from "../PHOTO/rocket.gif";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function YearBooks() {
  const { user } = useContext(AuthContext);

  const years = [
    { title: "FIRST YEAR", desc: "....................." },
    { title: "SECOND YEAR", desc: "..................." },
    { title: "THIRD YEAR", desc: "............................" },
    { title: "FOURTH YEAR", desc: "..........................." },
  ];

  return (
    <section>
      <div className="yearcontainer">
        <h1 className="header" id="yearBook">
          EXPLORE AS PER YEAR
        </h1>

        <div className="card-wrapper">
          {years.map((year, index) => (
            <div className="card" key={index}>
              <img src={image} alt={year.title} className="profile-image" />
              <h2>{year.title}</h2>
              <p>{year.desc}</p>
              <button className="login-button">
                <Link to={user ? "/Primum" : "/login"}>Explore</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default YearBooks;
