import style from "./App.module.css";
import Login from "../MODULES/Login/Login.jsx";
import Header from "../MODULES/Home/Header.jsx";
import Navbar from "../MODULES/Home/Navbars.jsx";
import Footer from "../MODULES/Footer/Footer.jsx";
import Hackthon from "../MODULES/Home/Hackthon.jsx";
import Feedback from "../MODULES/Feedback/feedback.jsx";
import ScrolBar from "../MODULES/Home/ScrolBar.jsx";
import YearBooks from "../MODULES/Home/YearBooks.jsx";
import Lost_Found from "../MODULES/Home/Lost_Found.jsx";
import Facelity_Directery from "../MODULES/Home/Facelity_Directery.jsx";

import rocket from "../MODULES/PHOTO/rocket.gif";

function Home() {
  return (
    <div className={style.App_contaniar}>
      <div className={style.background_animation}>
        <img src={rocket} alt="" className={style.rocket_bg} />
        <div className={style.stars}></div>
        <div className={style.stars2}></div>
      </div>
      <div className={style.content_wrapper}>
        <Navbar />
        <Header />
        <ScrolBar />
        <YearBooks />
        <Hackthon />
        <Lost_Found />
        <Facelity_Directery />
        <Feedback />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
