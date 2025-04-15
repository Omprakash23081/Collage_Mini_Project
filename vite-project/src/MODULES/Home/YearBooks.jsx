import image from "../PHOTO/rocket.gif";
import { Link } from "react-router-dom";

function YearBooks({ SetPrimums }) {
  return (
    <section>
      <div className="yearcontainer">
        <h1 className="header" id="hellow">
          Login{" "}
        </h1>
        <div className="card-wrapper">
          <div className="card">
            <img src={image} alt="Village Leader" className="profile-image" />
            <h2>FIRST YESR</h2>
            <p>.....................</p>
            <button
              className="login-button" /*onClick={() => { SetPrimums() }}*/
            >
              <Link to="/login">Login</Link>
            </button>
          </div>

          <div className="card">
            <img src={image} alt="Village Leader" className="profile-image" />
            <h2>SECOND YEAR </h2>
            <p>...................</p>
            <button
              className="login-button" /*onClick={() => { SetPrimums() }}*/
            >
              <Link to="/Primum">Explore</Link>
            </button>
          </div>

          <div className="card">
            <img src={image} alt="Parent" className="profile-image" />
            <h2>THIRD YEAR</h2>
            <p>............................</p>
            <button
              className="login-button"
              /*onClick={() => { SetPrimums() }}*/
            >
              <Link to="/Primum">Explore</Link>
            </button>
          </div>

          <div className="card">
            <img src={image} alt="Teacher" className="profile-image" />
            <h2>FOURTH YEAR</h2>
            <p>...........................</p>
            <button
              className="login-button"
              /*onClick={() => { SetPrimums() }}*/
            >
              <Link to="/Primum">Explore</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default YearBooks;
