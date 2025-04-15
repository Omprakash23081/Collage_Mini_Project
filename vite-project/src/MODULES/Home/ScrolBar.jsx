import { useEffect } from "react";
import { setupScrolBar } from "../../JAVASCRIPT/ScrolBar"; // Adjust the path if necessary
import style from "./ScrolBar.module.css";
import Scrolbar1 from "../PHOTO/Scrolbar1.jpeg";
import Scrolbar2 from "../PHOTO/Scrolbar2.jpeg";

function ScrolBar() {
  useEffect(() => {
    setupScrolBar();
  }, []);

  return (
    <div className={`${style.carousel_container}`}>
      <div
        className={`${style.carousel_slide} carousel_slide`}
        style={{ transform: "translateX(0%)" }}
      >
        <img src={Scrolbar1} alt="Image 1" />
        <img src={Scrolbar2} alt="Image 2" />
        <img src={Scrolbar1} alt="Image 3" />
      </div>
    </div>
  );
}

export default ScrolBar;
