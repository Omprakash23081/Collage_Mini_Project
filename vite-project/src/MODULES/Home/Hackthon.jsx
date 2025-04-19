import { useEffect } from "react";
import { setHackthon } from "../../JAVASCRIPT/Hackthon";

function Hackathon() {
  useEffect(() => {
    setHackthon();
  }, []);

  const hackathonData = [
    {
      tag: "AI-Powered eCommerce Growth",
      description:
        "A global eCommerce platform implemented AI-powered recommendation systems to offer personalized shopping experiences. By analyzing user behavior and preferences, the AI algorithm tailored product suggestions in real-time.",
    },
    {
      tag: "Revolutionizing Fashion Marketing with AI",
      description:
        "An AI-driven solution revolutionized the marketing strategies of a leading fashion retailer. By leveraging data from customer preferences, AI generated personalized fashion recommendations and trend insights for upcoming seasons.",
    },
    {
      tag: "Revolutionizing Entity Extraction with AI",
      description:
        "AI technology was deployed to automate the extraction of key entities from complex legal documents and financial contracts. The solution improved the speed and accuracy of identifying crucial information like dates, amounts, and parties involved.",
    },
    {
      tag: "AI-Powered for a UAE Oil and Gas Company",
      description:
        "A UAE-based oil and gas company leveraged AI to optimize operations and improve the maintenance of critical infrastructure. AI-driven predictive models enabled real-time monitoring and failure detection.",
    },
  ];

  return (
    <section>
      <div className="case-study-container_head_line">
        <h1>HACKATHONS</h1>
      </div>
      <div className="case-study-container">
        {hackathonData.map((item, index) => (
          <div
            key={index}
            className={`case-study-card ${
              index % 2 === 0 ? "animate-from-left" : "animate-from-right"
            }`}
          >
            <div className="case-study-tag">{item.tag}</div>
            <h3 className="case-study-card-title">{item.description}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hackathon;
