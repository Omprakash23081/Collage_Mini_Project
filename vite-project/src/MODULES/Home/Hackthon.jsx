import { useEffect } from "react";
import { setHackthon } from "../../JAVASCRIPT/Hackthon";

function Hackthon() {
  useEffect(() => {
    setHackthon();
  }, []);

  return (
    <section>
      <div className="case-study-container_head_line">
        <h1>HACKATHONS</h1>
      </div>
      <div className="case-study-container">
        <div className="case-study-card animate-from-left">
          <div className="case-study-tag">AI-Powered eCommerce Growth</div>
          <h3 className="case-study-card-title">
            A global eCommerce platform implemented AI-powered recommendation
            systems to offer personalized shopping experiences. By analyzing
            user behavior and preferences, the AI algorithm tailored product
            suggestions in real-time.
          </h3>
        </div>

        <div className="case-study-card animate-from-right">
          <div className="case-study-tag">
            Revolutionizing Fashion Marketing with AI
          </div>
          <h3 className="case-study-card-title">
            An AI-driven solution revolutionized the marketing strategies of a
            leading fashion retailer. By leveraging data from customer
            preferences, AI generated personalized fashion recommendations and
            trend insights for upcoming seasons.
          </h3>
        </div>

        <div className="case-study-card animate-from-left">
          <div className="case-study-tag">
            Revolutionizing Entity Extraction with AI
          </div>
          <h3 className="case-study-card-title">
            AI technology was deployed to automate the extraction of key
            entities from complex legal documents and financial contracts. The
            solution improved the speed and accuracy of identifying crucial
            information like dates, amounts, and parties involved.
          </h3>
        </div>

        <div className="case-study-card animate-from-right">
          <div className="case-study-tag">
            AI-Powered for a UAE Oil and Gas Company
          </div>
          <h3 className="case-study-card-title">
            A UAE-based oil and gas company leveraged AI to optimize operations
            and improve the maintenance of critical infrastructure. AI-driven
            predictive models enabled real-time monitoring and failure
            detection.
          </h3>
        </div>
      </div>
    </section>
  );
}
export default Hackthon;
