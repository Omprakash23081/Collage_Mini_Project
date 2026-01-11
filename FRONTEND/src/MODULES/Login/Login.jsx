import { setupLogin } from "../../JAVASCRIPT/login.js";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import {
  faGooglePlusG,
  faFacebookF,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { AuthContext } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  // Separate state for login & signup
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setupLogin();
  }, []);

  const handleSignupChange = (e) => {
    const { name, value, files } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------------------ LOGIN FUNCTION ------------------
  const LoginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginData.email, loginData.password, "student");
      toast.success("Welcome back!");
      navigate("/primum");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------ REGISTER FUNCTION ------------------
  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      const fd = new FormData();
      fd.append("name", signupData.name);
      fd.append("email", signupData.email);
      fd.append("password", signupData.password);
      fd.append("profileImage", signupData.image);
      fd.append("role", "student");

      await register(fd);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("DEBUG: Registration Error Object:", error);
      if (error.response) {
          console.error("DEBUG: Server Response:", error.response.status, error.response.data);
      } else if (error.request) {
          console.error("DEBUG: No Response (Network Error?):", error.request);
      } else {
          console.error("DEBUG: Error checking:", error.message);
      }
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="container" className="login-container">
      {/* GLOBAL LOADER */}
      {loading && (
        <div className="loading-overlay">
          <div className="loader">Loading...</div>
        </div>
      )}

      {/* SIGN UP FORM */}
      <div className="form-container sign-up">
        <form onSubmit={registerUser} method="post">
          <h1>Create Account</h1>

          <div className="social-icons">
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>

          <span>use your email for registration</span>

          <input
            name="name"
            type="text"
            placeholder="Enter your Name"
            required
            onChange={handleSignupChange}
          />

          <input
            name="image"
            type="file"
            accept="image/*"
            required
            onChange={handleSignupChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            required
            onChange={handleSignupChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your Password"
            required
            minLength={8}
            onChange={handleSignupChange}
          />

          <button type="submit">Sign Up</button>

          <div className="mobile-toggle">
            <p>
              Already have an account?{" "}
              <span
                onClick={() =>
                  document
                    .getElementById("container")
                    .classList.remove("active")
                }
              >
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div>

      {/* SIGN IN FORM */}
      <div className="form-container sign-in">
        <form onSubmit={LoginUser} method="post">
          <h1>Sign In</h1>

          <div className="social-icons">
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>

          <span>or use your email & password</span>

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleLoginChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={8}
            onChange={handleLoginChange}
          />

          <a href="#" className="forgot-password">
            <FontAwesomeIcon icon={faKey} /> Forgot Your Password?
          </a>

          <button type="submit">Sign In</button>

          <div className="mobile-toggle">
            <p>
              Don't have an account?{" "}
              <span
                onClick={() =>
                  document.getElementById("container").classList.add("active")
                }
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>

      {/* TOGGLE CONTAINER */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all features</p>
            <button className="login-button hidden" id="login">
              <FontAwesomeIcon icon={faRightToBracket} /> Sign In
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your details to use all features</p>
            <button className="login-button hidden" id="register">
              <FontAwesomeIcon icon={faRightToBracket} /> Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
