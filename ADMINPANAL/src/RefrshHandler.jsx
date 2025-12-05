import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "./AppContext.jsx";
import { BASE_URL } from "./constant.js";

const RefreshHandler = () => {
  const navigate = useNavigate();
  const { setIsLogin, setLoading, setUserName, setUserImage } = useContext(AppContext);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/api/auth/refreshToken`,
          {},
          { withCredentials: true }
        );
        console.log(res);
        setIsLogin(true);
        const userData = res.data.data;
        setUserName(userData.name);
        setUserImage(userData.profileImage);
        navigate("/");
      } catch (err) {
        console.log("Refresh failed:", err.response);
        setIsLogin(false);
        navigate("/login");
      }
      setLoading(false);
    };

    checkLogin();
  }, []);

  return null; // does not render anything
};

export default RefreshHandler;
