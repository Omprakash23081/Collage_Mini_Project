import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const RefreshHandler = () => {
  const { refreshToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        setLoading(true);
        await refreshToken();
        toast.success("Welcome back!");
        //if login sucess then redirect to /primum
        navigate("/primum");
      } catch (error) {
        console.log("comming for login");

        toast.error(
          error.response?.data?.message || "Login failed. Please try again."
        );
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return null; // does not render anything
};

export default RefreshHandler;
