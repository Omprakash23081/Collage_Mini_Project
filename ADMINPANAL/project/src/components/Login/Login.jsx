import { setupLogin } from "./login.js";
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
import { AppContext } from "../../AppContext.jsx";
import styles from "./Login.module.css";
import { BASE_URL } from "../../constant.js";

function Login() {
  useEffect(() => {
    setupLogin();
  }, []);

  const navigate = useNavigate();
  const { setIsLogin } = useContext(AppContext);

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

  const { email, password } = formData;

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.status < 400) {
        alert("Login successful: " + response.data.message);
        setIsLogin(true);
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
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
      formDataObj.append("image", formData.image);
      formDataObj.append("role", "Admin");

      const response = await axios.post(
        `${BASE_URL}/api/users/register`,
        formDataObj
      );

      alert("Registration successful: " + response.data.message);
      navigate("/");
    } catch (error) {
      alert(
        "Error during registration: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className={styles.container} id="container">
      {/* SIGN UP FORM */}
      <div className={`${styles.formContainer} ${styles.signUp}`}>
        <form onSubmit={registerUser}>
          <h1>Create Account</h1>
          <div className={styles.socialIcons}>
            {[faGooglePlusG, faFacebookF, faGithub, faLinkedinIn].map(
              (icon, idx) => (
                <a href="#" key={idx} className={styles.icon}>
                  <FontAwesomeIcon icon={icon} />
                </a>
              )
            )}
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
      <div className={`${styles.formContainer} ${styles.signIn}`}>
        <form onSubmit={LoginUser}>
          <h1>Sign In</h1>
          <div className={styles.socialIcons}>
            {[faGooglePlusG, faFacebookF, faGithub, faLinkedinIn].map(
              (icon, idx) => (
                <a href="#" key={idx} className={styles.icon}>
                  <FontAwesomeIcon icon={icon} />
                </a>
              )
            )}
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
          <a href="#" className={styles.forgotPassword}>
            <FontAwesomeIcon icon={faKey} style={{ marginRight: "6px" }} />
            Forgot Your Password?
          </a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* TOGGLE CONTAINER */}
      <div className={styles.toggleContainer}>
        <div className={styles.toggle}>
          <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button
              className={`${styles.loginButton} ${styles.hidden}`}
              id="login"
            >
              <FontAwesomeIcon icon={faRightToBracket} /> Sign In
            </button>
          </div>
          <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button
              id="register"
              className={`${styles.loginButton} ${styles.hidden}`}
            >
              <FontAwesomeIcon icon={faRightToBracket} /> Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
