import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "./AppContext.jsx";
import User from "../../../BACKENDS/models/user.models.js";

const BASE_URL = "https://collage-mini-project-090y.onrender.com";

const RefreshHandler = () => {
  const navigate = useNavigate();
  const { setIsLogin, setAccessToken } = useContext(AppContext);

  useEffect(() => {
    const checkLogin = async () => {
      console.log("Cookie RT:", req.cookies.refreshToken);
      const user = await User.findOne({
        refreshToken: req.cookies.refreshToken,
      });
      console.log("DB RT:", user?.refreshToken);

      try {
        const res = await axios.post(
          `${BASE_URL}/api/users/refreshToken`,
          {},
          { withCredentials: true }
        );
        console.log(res);
        setIsLogin(true);
        navigate("/");
      } catch (err) {
        console.log("Refresh failed:", err.response);
        setIsLogin(false);
        navigate("/login");
      }
    };

    checkLogin();
  }, []);

  return null; // does not render anything
};

export default RefreshHandler;
