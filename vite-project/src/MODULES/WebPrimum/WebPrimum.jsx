import style from "./WebPrimum.module.css";
function WebPrimum({ currentprise, setcurrentprises, currentduedate, setcurrentduedates }) {

  function SetPrise(value) {
    setcurrentprises(value);
  }
  function SetDate(value) {
    setcurrentduedates(value);
  }

  return (
    <>
      <div className={currentprise === "Super" ? style.selactedone : style.selactedtwo}></div >

      <div className={style.pricing_container} id={style.body}>
        <table className={style.pricing_table}>
          <tr className={style.header}>
            <td>All content</td>
            <td>Super</td>
            <td id={style.primumtext}>Premium</td>
          </tr>

          <tr>
            <td>Chapter-wise PYQs</td>
            <td>
              <span className={style.check} >✓</span>
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
        </table>

        <div className={style.billing_toggle}>
          <div className={`${style.billing_option} ${currentduedate === "Quarterly" && style.color
            }`} onClick={(event) => SetDate("Quarterly")}>
            One Month
          </div>

          <div className={`${style.billing_option} ${currentduedate === "Monthly" && style.color
            }`} onClick={(event) => SetDate("Monthly")}>Three Month</div>

          <div className={`${style.billing_option} ${currentduedate === "Yearly" && style.color
            }`} onClick={(event) => SetDate("Yearly")}>Six Month</div>
        </div>

        <div className={style.price_cards}>
          <div
            className={`${style.price_card} ${currentprise === "Super" && style.selected
              }`}
            onClick={(event) => SetPrise("Super")}
          >
            <div id={style.super}>Super</div>
            <div className={style.price1}>
              {currentduedate === "Quarterly" && <h7>₹59.0<span>/Month</span></h7>}
              {currentduedate === "Monthly" && <h7>₹99.0<span>/Month</span></h7>}
              {currentduedate === "Yearly" && <h7>₹199.0<span>/Month</span></h7>}
            </div>
          </div>
          <div
            className={`${style.price_card} ${currentprise === "Premium" && style.selected
              }`}
            onClick={(event) => SetPrise("Premium")}
          >
            <div className={style.primumtext}>Premium</div>
            <div className={style.price2}>
              {currentduedate === "Quarterly" && <h7>₹99.0<span>/Month</span></h7>}
              {currentduedate === "Monthly" && <h7>₹199<span>/Month</span></h7>}
              {currentduedate === "Yearly" && <h7>₹249.0<span>/Month</span></h7>}
            </div>
          </div>
        </div>

        <a href="#" className={style.cta_button}>
          Continue with Premium
        </a>
      </div>
    </>
  );
}
export default WebPrimum;
