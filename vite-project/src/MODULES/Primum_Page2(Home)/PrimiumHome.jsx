import Scrolbar1 from "../PHOTO/Scrolbar1.jpeg";
import Scrolbar2 from "../PHOTO/Scrolbar2.jpeg";
import image from "../PHOTO/rocket.gif";
import SubjectArea from "./Subject_areas.jsx";

function PrimiumHome() {
  return (
    <div className="">
      <div className="home">
        <div className="header_Primuam1">
          <center>
            <h1>Hay,Omprakash Kumar</h1>
          </center>
        </div>
        <div className="header_Primuam2">
          <div className="header_Primuam1_Contener">
            <div
              id="carouselExampleInterval"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <img src={Scrolbar1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <img src={Scrolbar2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={Scrolbar1} className="d-block w-100" alt="..." />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="MainCardContener">
              <div className="card" id="primumcard1">
                <img
                  src={image}
                  alt="Village Leader"
                  className="profile-image"
                  id="PrimumImage"
                />
                <h2>AKTU</h2>
                <p>Go And Explorw new Thing</p>
                <button className="login-button">Explore</button>
              </div>
              <div className="card" id="primumcard1">
                <img
                  src={image}
                  alt="Village Leader"
                  className="profile-image"
                  id="PrimumImage"
                />
                <h2>AKTU</h2>
                <p>Go And Explorw new Thing</p>
                <button className="login-button">Explore</button>
              </div>
              <div className="card" id="primumcard1">
                <img
                  src={image}
                  alt="Village Leader"
                  className="profile-image"
                  id="PrimumImage"
                />
                <h2>AKTU</h2>
                <p>Go And Explorw new Thing</p>
                <button className="login-button">Explore</button>
              </div>
              <div className="card" id="primumcard1">
                <img
                  src={image}
                  alt="Village Leader"
                  className="profile-image"
                  id="PrimumImage"
                />
                <h2>AKTU</h2>
                <p>Go And Explorw new Thing</p>
                <button className="login-button">Explore</button>
              </div>
            </div>
            <SubjectArea />
          </div>
        </div>
      </div>
    </div>
  );
}
export default PrimiumHome;
