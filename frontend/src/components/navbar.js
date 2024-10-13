import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);

  // Check localStorage for user data on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    setUser(null); // Update user state to null
    window.location.href = "/"; // Redirect to home page or login
  };

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <section className="flex">
            <a href="/" className="logo">
              <i className="fas fa-sharp fa-regular fa-notes-medical"></i>
              Fitness
            </a>

            <div id="menu-btn" className="fas fa-bars"></div>
            <div className="menu">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/program">Program</a>
                </li>
                <li>
                  <a href="/challenges">Challenges</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>

            {/* Show user name if logged in, otherwise show Subscribe */}
            <ul className="su">
              {user ? (
                <li>
                  <a href="/dashboard">
                    <i className="fas fa-user"></i> {user.user_name}
                  </a>
                  <a onClick={logout} style={{ cursor: "pointer" }}>
                    Logout
                  </a>
                </li>
              ) : (
                <li>
                  <a href="/subscribe">Subscribe</a>
                </li>
              )}
            </ul>
          </section>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
