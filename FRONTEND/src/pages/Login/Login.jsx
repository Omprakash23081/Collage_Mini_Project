import style from "./Login.module.css";
import { setupLogin } from "../../utils/login.js";
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
  const { user, login, register } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("student"); // Default role
  const [isRoleLocked, setIsRoleLocked] = useState(false); // Track if role came from URL

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
    // Extract role from URL
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");
    if (roleParam) {
      setRole(roleParam);
      setIsRoleLocked(true);
    }
  }, []);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (user) {
      redirectByRole(user);
    }
  }, [user]);

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

  // Helper for role-based redirection
  const redirectByRole = (userData) => {
    if (!userData) return;

    // Check last saved location
    if (userData.lastVisitedUrl && userData.lastVisitedUrl !== "" && userData.lastVisitedUrl !== "/" && userData.lastVisitedUrl !== "/login" && userData.lastVisitedUrl !== "/home") {
      navigate(userData.lastVisitedUrl);
      return;
    }

    const normalized = userData.role?.toLowerCase();
    
    if (normalized === "admin") navigate("/home");
    else if (normalized === "student" || normalized === "teacher") {
      if (normalized === "student" && !userData.year) navigate("/home");
      else navigate("/primum");
    }
    else if (normalized === "canteen_vendor") navigate("/canteen");
    else if (normalized === "stationery_vendor") navigate("/stationery");
    else navigate("/");
  };

  // ------------------ LOGIN FUNCTION ------------------
  const LoginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(loginData.email, loginData.password);
      toast.success(`Welcome back ${response.data.name}!`);
      redirectByRole(response.data);
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
      fd.append("role", role); // Use the selected role

      const response = await register(fd);
      toast.success("Registration successful!");
      redirectByRole(response.data);
    } catch (error) {
      console.error("DEBUG: Registration Error Object:", error);
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="container" className={style["login-container"]}>
      {/* GLOBAL LOADER */}
      {loading && (
        <div className={style["loading-overlay"]}>
          <div className={style.loader}></div>
        </div>
      )}

      {/* SIGN UP FORM */}
      <div className={`${style["form-container"]} ${style["sign-up"]}`}>
        <form onSubmit={registerUser} method="post">
          <h1>Create Account</h1>

          <div className={style["social-icons"]}>
            <a href="#" className={style.icon}>
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className={style.icon}>
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className={style.icon}>
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className={style.icon}>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>

          <span>use your email for registration</span>

          {!isRoleLocked && (
            <select
              name="role"
              className={style.roleSelect}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="canteen_vendor">Canteen Vendor</option>
              <option value="stationery_vendor">Stationery Vendor</option>
            </select>
          )}

          <input
            name="name"
            type="text"
            placeholder="Enter your Name"
            required
            onChange={handleSignupChange}
          />

          <div className={style.fileUploadContainer}>
            <label htmlFor="file-upload" className={style.customFileUpload}>
              <i className="bi bi-camera-fill"></i> {signupData.image ? signupData.image.name : "Upload Profile Image"}
            </label>
            <input
              id="file-upload"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleSignupChange}
              style={{ display: "none" }}
            />
          </div>

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

          <div className={style["mobile-toggle"]}>
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
      <div className={`${style["form-container"]} ${style["sign-in"]}`}>
        <form onSubmit={LoginUser} method="post">
          <h1>Sign In</h1>

          <div className={style["social-icons"]}>
            <a href="#" className={style.icon}>
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className={style.icon}>
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className={style.icon}>
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className={style.icon}>
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

          <a href="#" className={style["forgot-password"]}>
            <FontAwesomeIcon icon={faKey} /> Forgot Your Password?
          </a>

          <button type="submit">Sign In</button>

          <div className={style["mobile-toggle"]}>
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
      <div className={style["toggle-container"]}>
        <div className={style.toggle}>
          <div className={`${style["toggle-panel"]} ${style["toggle-left"]}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all features</p>
            <button className={`${style["login-button"]} ${style.hidden}`} id="login">
              <FontAwesomeIcon icon={faRightToBracket} /> Sign In
            </button>
          </div>

          <div className={`${style["toggle-panel"]} ${style["toggle-right"]}`}>
            <h1>Hello, Friend!</h1>
            <p>Register with your details to use all features</p>
            <button className={`${style["login-button"]} ${style.hidden}`} id="register">
              <FontAwesomeIcon icon={faRightToBracket} /> Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
