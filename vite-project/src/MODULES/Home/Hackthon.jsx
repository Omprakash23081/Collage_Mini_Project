import { useEffect } from "react";
import styles from "./Hackthon.module.css";
import { setHackthon } from "../../JAVASCRIPT/Hackthon"; // Optional

function Hackathon() {
  // useEffect(() => {
  //   setHackthon();
  // }, []);

  const hackathonData = [
    {
      name: "AI-Powered eCommerce Growth",
      registrationDate: "2025-05-01",
      endDate: "2025-05-10",
      description:
        "A global eCommerce platform implemented AI-powered recommendation systems to offer personalized shopping experiences. By analyzing user behavior and preferences, the AI algorithm tailored product suggestions in real-time.",
    },
    {
      name: "Revolutionizing Fashion Marketing with AI",
      registrationDate: "2025-06-05",
      endDate: "2025-06-15",
      description:
        "An AI-driven solution revolutionized the marketing strategies of a leading fashion retailer. By leveraging data from customer preferences, AI generated personalized fashion recommendations and trend insights for upcoming seasons.",
    },
    {
      name: "Revolutionizing Entity Extraction with AI",
      registrationDate: "2025-07-01",
      endDate: "2025-07-10",
      description:
        "AI technology was deployed to automate the extraction of key entities from complex legal documents and financial contracts. The solution improved the speed and accuracy of identifying crucial information like dates, amounts, and parties involved.",
    },
    {
      name: "AI for UAE Oil and Gas Company",
      registrationDate: "2025-08-12",
      endDate: "2025-08-20",
      description:
        "A UAE-based oil and gas company leveraged AI to optimize operations and improve the maintenance of critical infrastructure. AI-driven predictive models enabled real-time monitoring and failure detection.",
    },
  ];

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
            <div className={styles.tag}>{item.name}</div>
            <h3 className={styles.cardTitle}>{item.description}</h3>
            <p className={styles.registrationDate}>
              <strong>Registration:</strong> {item.registrationDate}
            </p>
            <p className={styles.endDate}>
              <strong>Ends:</strong> {item.endDate}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hackathon;
