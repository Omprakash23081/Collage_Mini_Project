import style from "./App.module.css";
import Login from "../MODULES/Login/Login.jsx";
import Header from "../MODULES/Home/Header.jsx";
import Navbar from "../MODULES/Home/Navbars.jsx";
import Footer from "../MODULES/Footer/Footer.jsx";
import Hackthon from "../MODULES/Home/Hackthon.jsx";
import ScrolBar from "../MODULES/Home/ScrolBar.jsx";
import YearBooks from "../MODULES/Home/YearBooks.jsx";
import Lost_Found from "../MODULES/Home/Lost_Found.jsx";
import Facelity_Directery from "../MODULES/Home/Facelity_Directery.jsx";

function Home({ SetPrimums, logins }) {
  return (
    <div className={style.App_contaniar}>
      <>
        <Navbar />
        <Header />
        <ScrolBar />
        <YearBooks SetPrimums={SetPrimums} />
        <Hackthon />
        <Lost_Found />
        <Facelity_Directery />
      </>
      <Footer />
    </div>
  );
}

export default Home;
