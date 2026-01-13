import { useState, useEffect } from "react";
import style from "./WebPrimum.module.css";
import { planService } from "../../services/planService";

function WebPrimum() {
  const [plans, setPlans] = useState([]);
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentDueDate, setCurrentDueDate] = useState("Yearly");
  const [loading, setLoading] = useState(true);

  // Default features list to ensure order, or we can extract from backend
  const allFeatures = [
    "Chapter-wise PYQs",
    "Most Important Selected Qs Bank",
    "AKTU Video Solutions",
    "Number of devices that can be logged in"
  ];

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await planService.getPlans();
      if (response && response.data) {
        setPlans(response.data);
        if (response.data.length > 0) {
            // Default select the first plan or one named "Premium"
            const defParams = response.data.find(p => p.name === 'Premium') || response.data[0];
            setCurrentPrice(defParams.name);
        }
      }
    } catch (error) {
      console.error("Failed to fetch plans", error);
    } finally {
      setLoading(false);
    }
  };

  const getFeatureValue = (plan, featureName) => {
    const feature = plan.features.find(f => f.name.includes(featureName) || featureName.includes(f.name));
    if (!feature) return <span className={style.x_mark}>✕</span>;
    
    if (feature.textValue) return feature.textValue;
    return feature.included ? <span className={style.check}>✓</span> : <span className={style.x_mark}>✕</span>;
  };

  const getPrice = (plan) => {
    if (!plan) return 0;
    if (currentDueDate === "Monthly") return plan.prices.monthly;
    if (currentDueDate === "Quarterly") return plan.prices.quarterly;
    return plan.prices.yearly;
  };

  if (loading) return <div className={style.pricing_container}><div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>Loading Plans...</div></div>;

  return (
    <>
      <div className={style.pricing_container} id={style.body}>
        <div className={style.innerContainer}>

          <table className={style.pricing_table}>
            <tbody>
              <tr className={style.header}>
                <td>All content</td>
                {plans.map(plan => (
                     <td key={plan._id} className={currentPrice === plan.name ? style.selected : ""}>
                         {plan.name}
                     </td>
                ))}
              </tr>
              
              {allFeatures.map(featureName => (
                  <tr key={featureName}>
                      <td>{featureName}</td>
                      {plans.map(plan => (
                          <td key={plan._id}>
                              {getFeatureValue(plan, featureName)}
                          </td>
                      ))}
                  </tr>
              ))}
            </tbody>
          </table>

          <div className={style.billing_toggle}>
            <div
              className={`${style.billing_option} ${
                currentDueDate === "Quarterly" && style.color
              }`}
              onClick={() => setCurrentDueDate("Quarterly")}
            >
              Quarterly
            </div>

            <div
              className={`${style.billing_option} ${
                currentDueDate === "Monthly" && style.color
              }`}
              onClick={() => setCurrentDueDate("Monthly")}
            >
              Monthly
            </div>

            <div
              className={`${style.billing_option} ${
                currentDueDate === "Yearly" && style.color
              }`}
              onClick={() => setCurrentDueDate("Yearly")}
            >
              Yearly
            </div>
          </div>

          <div className={style.price_cards}>
            {plans.map(plan => (
                 <div
                 key={plan._id}
                 className={`${style.price_card} ${
                   currentPrice === plan.name && style.selected
                 }`}
                 onClick={() => setCurrentPrice(plan.name)}
               >
                 <div className={plan.name === 'Super' ? style.super : style.premiumtext} id={plan.name === 'Super' ? style.super : ''}>{plan.name}</div>
                 <div className={plan.name === 'Super' ? style.price1 : style.price2}>
                     <span>
                       ₹{getPrice(plan)}<span>/Month</span>
                     </span>
                 </div>
               </div>
            ))}
          </div>

          <a href="#" className={style.cta_button}>
            Continue with {currentPrice}
          </a>
        </div>
      </div>
    </>
  );
}
export default WebPrimum;
