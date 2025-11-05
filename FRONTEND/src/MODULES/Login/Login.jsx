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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, register, logout, updateUser, refreshToken } =
    useContext(AuthContext);

  useEffect(() => {
    setupLogin();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(formData.email, formData.password, "user");
      toast.success("Welcome back!");
      navigate("/primum");
    } catch (error) {
      toast.error(error?.response?.data?.message + " Login failed");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
      formDataObj.append("profileImage", formData.image);
      formDataObj.append("role", "user");
      const response = await register(formDataObj);

      toast.success("Registration successful!");
      navigate("/primum");
    } catch (error) {
      toast.error(
        "Error during registration: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  {
    loading && <div className="loading-overlay">Loading...</div>;
  }

  return (
    <div id="container" className="container">
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
            onChange={handleChange}
          />
          <input name="image" type="file" required onChange={handleChange} />
          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            required
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your Password"
            required
            minLength={8}
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
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
          <span>or use your email password</span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            minLength={8}
            onChange={handleChange}
          />
          <a href="#" className="forgot-password">
            <FontAwesomeIcon icon={faKey} style={{ marginRight: "6px" }} />
            Forgot Your Password?
          </a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* TOGGLE CONTAINER */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="login-button hidden" id="login">
              <FontAwesomeIcon icon={faRightToBracket} /> Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button id="register" className="login-button hidden">
              <FontAwesomeIcon icon={faRightToBracket} /> Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
