import PrimiumHome from "../Primum_Page2(Home)/PrimiumHome.jsx";
import PrimumStyle from "./Primum.module.css";
import Profile from "../Profile/PROFILE.jsx";
import { useState } from "react";
import WebPrimum from "../WebPrimum/WebPrimum.jsx";
import Pyq from "../Primum_Page3(PYQ)/PYQ.jsx";

function primuam({ currentmanu }) {
  const [currentprise, setcurrentprise] = useState("");
  const [currentduedate, setcurrentduedate] = useState("Yearly");

  function setcurrentprises(value) {
    setcurrentprise(value);
  }

  function setcurrentduedates(value) {
    setcurrentduedate(value);
  }

  return (
    <>
      {currentmanu === "Profile" && <Profile />}
      {currentmanu === "Home" && <PrimiumHome />}
      {currentmanu === "PYQ" && <Pyq />}
      {currentmanu === "Premium" && (
        <WebPrimum
          currentprise={currentprise}
          setcurrentprises={setcurrentprises}
          currentduedate={currentduedate}
          setcurrentduedates={setcurrentduedates}
        />
      )}
    </>
  );
}

export default primuam;
