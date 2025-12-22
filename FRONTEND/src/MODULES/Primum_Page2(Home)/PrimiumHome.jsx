import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import Scrolbar1 from "../PHOTO/Scrolbar1.jpeg";
import Scrolbar2 from "../PHOTO/Scrolbar2.jpeg";
import image from "../PHOTO/rocket.gif";
import SubjectArea from "./Subject_areas.jsx";
import styles from "./PrimiumHome.module.css";

function PrimiumHome() {
  const { user } = useContext(AuthContext);

  const cards = Array(3).fill({
    title: "AKTU",
    description: "Go and explore new things",
    image,
  });

  return (
    <>
      <div className={styles.home}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Welcome Back,{" "}
              <span className={styles.highlightName}>{user?.name || "Student"}</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Your Gateway to{" "}
              <span className={styles.neonText}>Premium Learning</span>.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>4</span>
                <span className={styles.statLabel}>Years</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>100+</span>
                <span className={styles.statLabel}>Resources</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>∞</span>
                <span className={styles.statLabel}>Opportunities</span>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <img src={image} alt="Rocket" className={styles.heroImage} />
          </div>
        </div>

        {/* Explore Cards Grid */}
        <div className={styles.sectionHeader}>
          <h2>Explore Categories</h2>
        </div>

        <div className={styles.cardContainer}>
          {cards.map((card, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.cardInner}>
                <img
                  src={card.image}
                  alt={card.title}
                  className={styles.profileImage}
                />
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{card.title}</h2>
                  <p className={styles.cardDescription}>{card.description}</p>
                  <button className={styles.loginButton}>Explore Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <SubjectArea />
      </div>
    </>
  );
}
export default PrimiumHome;
