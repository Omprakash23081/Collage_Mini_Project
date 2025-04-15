import Profile01 from "./PROFILE01"
import Profile02 from "./PROFILE02"
import Profile03 from "./PROFILE03"
import Profile04 from "./PROFILE04"
import { useState } from "react";
import style from "./PROFILE.module.css"
function PROFILE() {
  let [currentvalue, Setvalue] = useState("Recent AC");

  function Setfunction(value) {
    Setvalue(value);
  }

  return (
    <div className={style.profile_contener}>
      <div className={style.profile}>
        <Profile01 />
        <Profile02 />
        <Profile03 />
      </div>
      <div className={style.profile04}>
        <Profile04 Setfunction={Setfunction} currentvalue={currentvalue} />
      </div>


    </div>
  )
}
export default PROFILE;