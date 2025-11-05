import style from "./PROFILE01.module.css";
import image from "../PHOTO/rocket.gif";

function PROFILE01() {
  return (
    <div className={style.acount_profile}>
      <div className={style.content_profile_details}>
        <div className={style.profile__avatar}>
          <img src={image} alt="profile" />
        </div>
        <div className={style.profile_details}>
          <h4>Omprakash kumar</h4>
          <h6>omprakash1234</h6>
          <p>Ranck : 300</p>
        </div>
      </div>

      <div className={style.edit_profile}>
        <center>
          <button className={style.edit}>Edit Profile</button>
        </center>
      </div>

      <div className={style.location}>
        <div className={style.locan_icon}>
          <i className="bi bi-geo-alt"></i>
        </div>
        <div className={style.contery}>
          <p>india</p>
        </div>
      </div>

      <center>
        <hr />
      </center>

      <div className={style.status}>
        <div className={style.status_tital}>
          <h3>Community Stats</h3>
        </div>

        <div className={style.Views}>
          <div className={style.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Z" />
            </svg>
          </div>
          <div className={style.contenet}>
            <p>Views</p>
          </div>
          <div className={style.count}>
            <p>19</p>
          </div>
        </div>

        <div className={style.Solution}>
          <div className={style.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M480-80q-26 0-47-12.5T400-126q-33 0-56.5-23.5T320-206v-142q-59-39-94.5-103T190-590q0-121 84.5-205.5T480-880q121 0 205.5 84.5T770-590q0 77-35.5 140T640-348v142q0 33-23.5 56.5T560-126q-12 21-33 33.5T480-80Zm-80-126h160v-36H400v36Zm0-76h160v-38H400v38Z" />
            </svg>
          </div>
          <div className={style.contenet}>
            <p>Solution</p>
          </div>
          <div className={style.count}>
            <p>45</p>
          </div>
        </div>

        <div className={style.Discuss}>
          <div className={style.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M480-80q-73-9-145-39.5T206.5-207Q150-264 115-351T80-560v-40h40q51 0 105 13t101 39q12-86 54.5-176.5T480-880q57 65 99.5 155.5T634-548q47-26 101-39t105-13h40v40q0 122-35 209t-91.5 144q-56.5 57-128 87.5T480-80Zm-2-82q-11-166-98.5-251T162-518q11 171 101.5 255T478-162Z" />
            </svg>
          </div>
          <div className={style.contenet}>
            <p>Discuss</p>
          </div>
          <div className={style.count}>
            <p>12</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PROFILE01;
