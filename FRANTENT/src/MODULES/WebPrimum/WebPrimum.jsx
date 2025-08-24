import { useState } from "react";
import style from "./WebPrimum.module.css";

function WebPrimum() {
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentDueDate, setCurrentDueDate] = useState("Yearly");

  function setPrice(value) {
    setCurrentPrice(value);
  }
  function setDate(value) {
    setCurrentDueDate(value);
  }

  return (
    <>
      <div
        className={
          currentPrice === "Super" ? style.selectedone : style.selectedtwo
        }
      ></div>

      <div className={style.pricing_container} id={style.body}>
        <table className={style.pricing_table}>
          <tbody>
            <tr className={style.header}>
              <td>All content</td>
              <td className={currentPrice === "Super" && style.selected}>
                Super
              </td>
              <td
                id={style.premiumtext}
                className={currentPrice === "Premium" && style.selected}
              >
                Premium
              </td>
            </tr>
            <tr>
              <td>Chapter-wise PYQs</td>
              <td>
                <span className={style.check}>✓</span>
              </td>
              <td>
                <span className={style.check}>✓</span>
              </td>
            </tr>
            <tr>
              <td>Most Important Selected Qs Bank</td>
              <td>
                <span className={style.check}>✓</span>
              </td>
              <td>
                <span className={style.check}>✓</span>
              </td>
            </tr>
            <tr>
              <td>AKTU Video Solutions</td>
              <td>
                <span className={style.x_mark}>✕</span>
              </td>
              <td>
                <span className={style.check}>✓</span>
              </td>
            </tr>
            <tr>
              <td>Number of devices that can be logged in</td>
              <td>2</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>

        <div className={style.billing_toggle}>
          <div
            className={`${style.billing_option} ${
              currentDueDate === "Quarterly" && style.color
            }`}
            onClick={() => setDate("Quarterly")}
          >
            One Month
          </div>

          <div
            className={`${style.billing_option} ${
              currentDueDate === "Monthly" && style.color
            }`}
            onClick={() => setDate("Monthly")}
          >
            Three Months
          </div>

          <div
            className={`${style.billing_option} ${
              currentDueDate === "Yearly" && style.color
            }`}
            onClick={() => setDate("Yearly")}
          >
            Six Months
          </div>
        </div>

        <div className={style.price_cards}>
          <div
            className={`${style.price_card} ${
              currentPrice === "Super" && style.selected
            }`}
            onClick={() => setPrice("Super")}
          >
            <div id={style.super}>Super</div>
            <div className={style.price1}>
              {currentDueDate === "Quarterly" && (
                <span>
                  ₹59.0<span>/Month</span>
                </span>
              )}
              {currentDueDate === "Monthly" && (
                <span>
                  ₹99.0<span>/Month</span>
                </span>
              )}
              {currentDueDate === "Yearly" && (
                <span>
                  ₹199.0<span>/Month</span>
                </span>
              )}
            </div>
          </div>
          <div
            className={`${style.price_card} ${
              currentPrice === "Premium" && style.selected
            }`}
            onClick={() => setPrice("Premium")}
          >
            <div className={style.premiumtext}>Premium</div>
            <div className={style.price2}>
              {currentDueDate === "Quarterly" && (
                <span>
                  ₹99.0<span>/Month</span>
                </span>
              )}
              {currentDueDate === "Monthly" && (
                <span>
                  ₹199<span>/Month</span>
                </span>
              )}
              {currentDueDate === "Yearly" && (
                <span>
                  ₹249.0<span>/Month</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <a href="#" className={style.cta_button}>
          Continue with {currentPrice ? currentPrice : "Premium"}
        </a>
      </div>
    </>
  );
}
export default WebPrimum;
