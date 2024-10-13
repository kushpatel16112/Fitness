import React, { useEffect, useState } from "react";
import "../styles/Subscribe.css";
import { useNavigate } from "react-router-dom";

function Sub() {
  const [uname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(""); // State for success feedback

  useEffect(() => {
    const wrapper = document.querySelector(".wrapper");
    const registerLink = document.querySelector(".register-link");
    const loginLink = document.querySelector(".login-link");

    if (registerLink && loginLink) {
      registerLink.onclick = () => {
        wrapper.classList.add("active");
      };

      loginLink.onclick = () => {
        wrapper.classList.remove("active");
      };
    }
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/account/api/signup/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: uname,
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Show success message
        setSuccessMessage("Sign Up Successful!");
        setName("");
        setEmail("");
        setPassword("");

        // Redirect to login after signup
        window.alert("Sign Up Successful!");
      } else {
        // Handle errors and show error message
        window.alert(data.error || "Sign up failed. Please try again.");
        setName(""); // Clear fields after alert box is closed
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      // Show fetch error
      window.alert("An error occurred. Please try again.");
      setName(""); // Clear fields after alert box is closed
      setEmail("");
      setPassword("");
    }
  };

  const [name_login, setLoginName] = useState("");
  const [pass_login, setLoginPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/account/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name_login,
          password: pass_login,
        }),
      });
      const data = await response.json();
      
      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(data));

        // Display success message and redirect
        alert("Login Successfully done");
        navigate("/");
      } else {
        alert(data.error || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <sub>
      <div className="wrapper">
        <span className="rotate-bg"></span>
        <span className="rotate-bg2"></span>

        <div className="form-box login">
          <h2 className="title animation" style={{ "--i": 0, "--j": 21 }}>
            Login
          </h2>
          <form action="#" onSubmit={handleLogin} method="POST">
            <div
              className="input-box animation"
              style={{ "--i": 1, "--j": 22 }}
            >
              <input
                type="text"
                name="username"
                value={name_login}
                onChange={(e) => setLoginName(e.target.value)}
                required
              />
              <label>Username</label>
              <i className="fas fa-sharp fa-regular fa-user"></i>
            </div>

            <div
              className="input-box animation"
              style={{ "--i": 2, "--j": 23 }}
            >
              <input
                type="password"
                name="password"
                value={pass_login}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <label>Password</label>
              <i className="fas fa-regular fa-lock"></i>
            </div>
            <button
              type="submit"
              onSubmit={handleLogin}
              className="btn animation"
              style={{ "--i": 3, "--j": 24 }}
            >
              Login
            </button>
            <div className="linkTxt animation" style={{ "--i": 5, "--j": 25 }}>
              <p>
                Don't have an account?{" "}
                <a href="#" className="register-link">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className="info-text login">
          <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>
            Welcome Back!
          </h2>
        </div>

        <div className="form-box register">
          <h2 className="title animation" style={{ "--i": 17, "--j": 0 }}>
            Sign Up
          </h2>

          <form action="#" onSubmit={handleSignUp}>
            <div
              className="input-box animation"
              style={{ "--i": 18, "--j": 1 }}
            >
              <input
                type="text"
                value={uname}
                name="username"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Username</label>
              <i className="fas fa-sharp fa-regular fa-user"></i>
            </div>

            <div
              className="input-box animation"
              style={{ "--i": 19, "--j": 2 }}
            >
              <input
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
              <i className="fas fa-sharp fa-regular fa-envelope"></i>
            </div>

            <div
              className="input-box animation"
              style={{ "--i": 20, "--j": 3 }}
            >
              <input
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
              <i className="fas fa-regular fa-lock"></i>
            </div>

            <button
              type="submit"
              className="btn animation"
              style={{ "--i": 21, "--j": 4 }}
            >
              Sign Up
            </button>

            <div className="linkTxt animation" style={{ "--i": 22, "--j": 5 }}>
              <p>
                Already have an account?{" "}
                <a href="#" className="login-link">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className="info-text register">
          <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
            Welcome To Our Community!
          </h2>
        </div>
      </div>
    </sub>
  );
}

export default Sub;
