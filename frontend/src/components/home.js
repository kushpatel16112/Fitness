import React, { useEffect, useState, useRef } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "../styles/Home.css";
import Team from "../images/Team.jpg";

function Home() {
  const [programs, setPrograms] = useState([]);
  const sliderRef = useRef(null);

  // Fetch data from Django backend
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/program/programs/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setPrograms(data);
        } else {
          console.error("Error fetching programs:", data.error);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.clientWidth, // Scroll left by the width of the slider
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.clientWidth, // Scroll right by the width of the slider
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="unique-home-container">
        <div className="unique-welcome-section">
          <h1 className="unique-welcome-text">LEVEL UP</h1>
          <h1 className="unique-welcome-text cor-1">YOUR FITNESS !</h1>
          <h1 className="unique-welcome-text cor-2">
            You're welcome to join us
          </h1>
        </div>
      </div>

      <div className="team-container">
        <div className="trainer-series">
          <h1 className="team-title">Trainer</h1>
          <p className="team-description">Our Trainer</p>
          <a className="button">View Trainer</a>
        </div>
        <div className="membership">
          <h1 className="team-title white-text">Exercise</h1>
          <p className="team-description white-text">
            Regular exercise not only boosts physical health but also enhances
            mental well-being, making it essential for a balanced life.
          </p>
          <button className="button white-button">Learn About Rewards</button>
        </div>
      </div>

      <div>
        <h1 className="home-program-ti">Not sure where to start?</h1>
        <h3 className="home-program-cor-ti">
          Programs offer day-to-day guidance on an interactive calendar to keep
          you on track.
        </h3>
      </div>
      <div className="slider-container">
        <button className="slider-arrow left-arrow" onClick={scrollLeft}>
          &#8249;
        </button>

        <div className="slider" ref={sliderRef}>
          {programs.map((program, index) => (
            <div key={index} className="slider-item">
              <img
                src={`http://127.0.0.1:8000/media/${program.programm_img}`}
                alt="Program"
                className="slider-image"
              />
              <div className="slider-description">
                <p>{program.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-arrow right-arrow" onClick={scrollRight}>
          &#8250;
        </button>
      </div>


      <div className="allprogram">
        <a href="/program" className="allprogram-button">
          All Programs
        </a>
      </div>


      
      <Footer />
    </>
  );
}

export default Home;
