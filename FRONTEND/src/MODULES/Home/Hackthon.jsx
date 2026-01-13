import { useEffect, useState } from "react";
import styles from "./Hackthon.module.css";
import { setHackthon } from "../../JAVASCRIPT/Hackthon"; // Optional

import { eventService } from "../../services/eventService";

function Hackathon() {
  const [hackathonData, setHackathonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventService.getEvents();
      setHackathonData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className={styles.heading}>
        <h1>HACKATHONS</h1>
      </div>
      <div className={styles.container}>
        {hackathonData.map((item, index) => (
          <div
            key={index}
            className={`${styles.card} ${
              index % 2 === 0 ? styles.fromLeft : styles.fromRight
            }`}
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <div className={styles.tag}>Upcoming Event</div>
            <h3 className={styles.cardTitle}>{item.name}</h3>
            <h4 className={styles.cardSubtitle}>{item.title}</h4>
            <p className={styles.description}>{item.description}</p>
            <div className={styles.cardFooter}>
              <div className={styles.dateBadge}>
                <span className={styles.label}>Registration</span>
                <span className={styles.value}>{item.registrationDate}</span>
              </div>
              <div className={`${styles.dateBadge} ${styles.endDate}`}>
                <span className={styles.label}>Ends</span>
                <span className={styles.value}>{item.endDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hackathon;
