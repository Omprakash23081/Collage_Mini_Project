import style from "./PROFILE04.module.css";
import Reactions from "./Reactions.jsx";
import "bootstrap/dist/css/bootstrap.css";

function PROFILE04({ Setfunction, currentvalue }) {
  function Set(value) {
    Setfunction(value);
  }
  return (
    <div className="container " id={style.primum04_id}>
      <div className={style.heade}>
        <div className={style.headr1}>
          <div
            id={style.actions}
            onClick={(event) => Set("Recent AC")}
            className={currentvalue === "Recent AC" && style.color}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="34px"
              viewBox="0 -960 960 960"
              width="34px"
              fill="#0000F5"
            >
              <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
            </svg>
            <p>Recent AC</p>
          </div>
          <div
            id={style.actions}
            className={currentvalue === "Notes" && style.color}
            onClick={(event) => Set("Notes")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="34px"
              viewBox="0 -960 960 960"
              width="34px"
              fill="#0000F5"
            >
              <path d="M280-160v-441q0-33 24-56t57-23h439q33 0 56.5 23.5T880-600v320L680-80H360q-33 0-56.5-23.5T280-160ZM81-710q-6-33 13-59.5t52-32.5l434-77q33-6 59.5 13t32.5 52l10 54h-82l-7-40-433 77 40 226v279q-16-9-27.5-24T158-276L81-710Zm279 110v440h280v-160h160v-280H360Zm220 220Z" />
            </svg>
            <p>Notes</p>
          </div>
          <div
            className={currentvalue === "Solutions" && style.color}
            id={style.actions}
            onClick={(event) => Set("Solutions")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="34px"
              viewBox="0 -960 960 960"
              width="34px"
              fill="#0000F5"
            >
              <path d="M480-80q-26 0-47-12.5T400-126q-33 0-56.5-23.5T320-206v-142q-59-39-94.5-103T190-590q0-121 84.5-205.5T480-880q121 0 205.5 84.5T770-590q0 77-35.5 140T640-348v142q0 33-23.5 56.5T560-126q-12 21-33 33.5T480-80Zm-80-126h160v-36H400v36Zm0-76h160v-38H400v38Zm-8-118h58v-108l-88-88 42-42 76 76 76-76 42 42-88 88v108h58q54-26 88-76.5T690-590q0-88-61-149t-149-61q-88 0-149 61t-61 149q0 63 34 113.5t88 76.5Zm88-162Zm0-38Z" />
            </svg>
            <p>Solutions</p>
          </div>
        </div>
        <div className={style.hader2}>
          <p>
            View All Submitions{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#0000F5"
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
          </p>
        </div>
      </div>
      <hr />
      {currentvalue === "Recent AC" && <Reactions />}
    </div>
  );
}
export default PROFILE04;
