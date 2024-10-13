import React, { useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "../styles/About.css";
import Support from "../images/Support.png";
import Secure from "../images/Secure.png";
import Trust from "../images/Trust.png";
import Guide from "../images/Guide.jpg";
import Challenges from "../images/Challenges.png";
import Programm from "../images/Programm.webp";
import Proicon from "../images/Pro-icon.jpg";

function About() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What are the benefits of joining this fitness program?",
      answer:
        "Our program offers personalized training, flexible scheduling, and access to a variety of workouts including yoga, cardio, and strength training.",
    },
    {
      question: "How often should I work out?",
      answer:
        "It depends on your fitness goals, but generally, 3-5 days a week is recommended for most people.",
    },
    {
      question: "Do you offer nutrition plans?",
      answer:
        "Yes, we offer personalized nutrition plans to complement your fitness journey and help you achieve your goals faster.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "We offer a 30-day money-back guarantee if you are not satisfied with our services for any reason.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <>
      <Navbar />

      <div className="about-co-img">
        <div className="about-cor">
          <h1 className="about-co-content">SO, WHY CHOOSE US?</h1>
          <h1 className="about-cor-content">A few good reasons.</h1>
        </div>
      </div>

      <div className="container">
        <div className="card-grid">
          {/* First Column */}
          <div className="card">
            <div className="image-container">
              <img
                src={Trust}
                alt="Icon of hands holding a star"
                className="card-image-1"
              />
            </div>
            <h2 className="card-title">REAL CUSTOMERS, REAL TRUST</h2>
            <p className="card-text">
              You've voted us as one of the best in fitness equipment! Our top
              ranking on
              <a href="#" className="link">
                {" "}
                Judge.Me{" "}
              </a>
              ,
              <a href="#" className="link">
                {" "}
                Product Review{" "}
              </a>
              just goes to show that we're here to give you the honest, reliable
              service you deserve.
            </p>
            <button className="card-button">READ REVIEWS</button>
          </div>

          {/* Second Column */}
          <div className="card">
            <div className="image-container">
              <img
                src={Secure}
                alt="Icon of credit cards with a lock"
                className="card-image-1"
              />
            </div>
            <h2 className="card-title">FLEXIBLE AND SECURE PAYMENTS</h2>
            <p className="card-text">
              When it comes to payments, we understand the importance of
              convenience and accessibility. We provide fast, easy, and
              hassle-free payment options and flexible buy now, pay later
              payment plans!
            </p>
            <button className="card-button">FINANCING OPTIONS</button>
          </div>

          {/* Third Column */}
          <div className="card">
            <div className="image-container">
              <img
                src={Support}
                alt="Icon of a person with information symbol"
                className="card-image"
              />
            </div>
            <h2 className="card-title">RESPONSIVE CUSTOMER SUPPORT</h2>
            <p className="card-text">
              Whether it's a question about your order, a product or whatever
              you need to start smashing your goals! We're here for you,
              <span className="bold-text"> seven days a week </span>! Like a
              trusty spotter, we're always ready to assist you.
            </p>
            <button className="card-button">SUPPORT HOURS</button>
          </div>
        </div>
      </div>

      <div className="fitness-container">
        <div className="fitness-image-wrapper">
          <img
            src={Guide}
            alt="A fitness specialist assisting a customer with gym equipment"
            className="fitness-image"
          />
        </div>
        <div className="fitness-content">
          <div className="fitness-icon">
            <i className="fas fa-solide fa-phone-volume"></i>
          </div>
          <h2 className="fitness-title">
            EXPERT GUIDANCE FROM QUALIFIED FITNESS SPECIALISTS
          </h2>
          <p className="fitness-description">
            Feeling overwhelmed by all the options? Take a breather. Our
            qualified fitness specialists are ready to guide you to the right
            gear for your goals. Our skilled sales team holds certifications in
            the health and fitness industry, and with over 50 years of combined
            experience, we are confident in our ability to help you discover the
            ideal equipment for your fitness journey. Contact us today for a
            no-obligation consultation!
          </p>
          <button className="program-button"><a href="#">SPEAK TO AN EXPERT</a></button>
        </div>
      </div>

      <div className="fitness-container">
        <div className="fitness-content">
          <div className="fitness-icon">
            <i className="fas fa-dumbbell"></i>
          </div>
          <h2 className="fitness-title">
            EMBRACE FITNESS CHALLENGES AND PUSH YOUR LIMITS
          </h2>
          <p className="fitness-description">
            Ready to take your fitness to the next level? Our fitness challenges
            are designed to test your strength, endurance, and perseverance.
            Whether you're just starting or you're a seasoned athlete, these
            challenges will motivate and inspire you to push beyond your comfort
            zone. Join our community, and together, we’ll conquer your fitness
            goals.
          </p>
          <button className="program-button"><a href="/challenges">GO TO CHALLENGES</a></button>
        </div>
        <div className="fitness-image-wrapper">
          <img
            src={Challenges}
            alt="A fitness specialist assisting a customer with gym equipment"
            className="fitness-image"
          />
        </div>
      </div>

      <div className="fitness-container">
        <div className="fitness-image-wrapper">
          <img
            src={Programm}
            alt="A fitness specialist assisting a customer with gym equipment"
            className="fitness-image"
          />
        </div>
        <div className="fitness-content">
          <div className="fitness-icon">
            <i class="fa-regular fa-calendar-days"></i>
          </div>
          <h2 className="fitness-title">Tailored Fitness Programs</h2>
          <p className="fitness-description">
            Achieve your fitness goals with our expertly designed programs.
            Whether you're aiming for weight loss, muscle gain, or relaxation
            through yoga, we have the perfect plan for you. Each program is
            carefully crafted by certified trainers and is suitable for
            different fitness levels.
          </p>
          <button className="program-button"><a href="/program">GET PROGRAMM</a></button>
        </div>
      </div>

      <div className="faq-section">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                <span className="faq-icon">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>
              <div
                className={`faq-answer ${activeIndex === index ? "open" : ""}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
