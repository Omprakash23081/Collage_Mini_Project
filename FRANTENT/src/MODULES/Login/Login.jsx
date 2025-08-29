import { setupLogin } from "../../JAVASCRIPT/login.js";
import axios from "axios";
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
import { AppContext } from "../../App/AppContext.jsx";

function Login() {
  const BASE_URL = "http://localhost:3000";
  const navigate = useNavigate();
  const { handleLogin } = useContext(AppContext);

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

  const { name, image, email, password } = formData;

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });

      if (response.status < 400) {
        alert("Login successful: " + response.data.message);
        handleLogin(response.data.user);
        navigate("/");
      } else {
        alert("Login failed: " + response.data.message);
      }
    } catch (error) {
      alert(
        "Error during login: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/users/register`, {
        name,
        image,
        email,
        password,
      });
      console.log(response.data);
      if (response.status < 400) {
        alert("Registration successful: " + response.data.message);
        handleLogin(response.data.user);
        navigate("/");
      } else {
        alert("Registration failed: " + response.data.message);
      }
    } catch (error) {
      alert(
        "Error during registration: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

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
