import { setupLogin } from "../../JAVASCRIPT/login.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import {
  faGooglePlusG,
  faFacebookF,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

function Login({ handleLogin }) {
  const BASE_URL = "http://localhost:3000";
  useEffect(() => {
    setupLogin();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });
      console.log(response);
      console.log("hbdmd");

      if (response.status < 400) {
        alert("Login successful:" + response.data.message);
      } else {
        alert(
          "Login failed. Please check your credentials." + response.data.message
        );
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <>
      <div id="container" className="container">
        <div className="form-container sign-up">
          <form method="post">
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
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input
              type="password"
              placeholder="Password"
              required
              minLength={8}
            />
            <button>Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in" onSubmit={handleSubmit}>
          <form method="get">
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
              onChange={handleChange}
              type="password"
              placeholder="Password"
              name="password"
              required
              minLength={8}
            />
            <a href="#" className="forgot-password">
              <FontAwesomeIcon icon={faKey} style={{ marginRight: "6px" }} />
              Forgot Your Password?
            </a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="login-button hidden" id="login">
                <FontAwesomeIcon icon={faRightToBracket} />
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button id="register" className="login-button hidden">
                <FontAwesomeIcon icon={faRightToBracket} />
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
