// thus is all right
import Scrolbar1 from "../PHOTO/Scrolbar1.jpeg";
import Scrolbar2 from "../PHOTO/Scrolbar2.jpeg";
import image from "../PHOTO/rocket.gif";
import SubjectArea from "./Subject_areas.jsx";
import styles from "./PrimiumHome.module.css";

function PrimiumHome() {
  const cards = Array(4).fill({
    title: "AKTU",
    description: "Go and explore new things",
    image,
  });
  return (
    <>
      <div className="home">
        <div className="header_Primuam1">
          <center>
            <h1>Hay,Omprakash Kumar</h1>
          </center>
        </div>
        <div className="header_Primuam2">
          <div className="header_Primuam1_Contener">
            <div
              id="carouselExampleInterval"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <img src={Scrolbar1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <img src={Scrolbar2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={Scrolbar1} className="d-block w-100" alt="..." />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className={styles.cardContainer}>
              {cards.map((card, index) => (
                <div className={styles.card} key={index}>
                  <img
                    src={card.image}
                    alt="Village Leader"
                    className={styles.profileImage}
                  />
                  <h2 className={styles.cardTitle}>{card.title}</h2>
                  <p className={styles.cardDescription}>{card.description}</p>
                  <button className={styles.loginButton}>Explore</button>
                </div>
              ))}
            </div>

            <SubjectArea />
          </div>
        </div>
      </div>
    </>
  );
}
export default PrimiumHome;
