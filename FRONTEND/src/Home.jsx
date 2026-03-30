import style from "./App.module.css";
import Header from "./pages/Home/Header.jsx";
import Hackthon from "./pages/Home/Hackthon.jsx";
import Feedback from "./pages/Home/Feedback/Feedback.jsx";
import ScrollBar from "./pages/Home/ScrollBar.jsx";
import YearBooks from "./pages/Home/YearBooks.jsx";
import LostFound from "./pages/Home/LostFound.jsx";
import FacilityDirectory from "./pages/Home/FacilityDirectory.jsx";

function Home() {
  return (
    <>
      <Header />
      <ScrollBar />
      <YearBooks />
      <Hackthon />
      <LostFound />
      <FacilityDirectory />
      <Feedback />
    </>
  );
}

export default Home;
