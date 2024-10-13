import React, { useState, useEffect } from "react";
import "../styles/Challenges.css";
import Navbar from "./navbar";
import Footer from "./footer";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [challengeType, setChallengeType] = useState("all"); // Filter state
  const [currentIndex, setCurrentIndex] = useState(0); // For slider
  const [showModal, setShowModal] = useState(false); // Modal state
  const [selectedChallenge, setSelectedChallenge] = useState(null); // Selected challenge for modal

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/challenges/challenges/"
        );
        const data = await response.json();
        setChallenges(data.challenges);
        setFilteredChallenges(data.challenges); // Initially show all challenges
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

  // Filter challenges by type
  useEffect(() => {
    if (challengeType === "all") {
      setFilteredChallenges(challenges);
    } else {
      const filtered = challenges.filter(
        (challenge) => challenge.challenge_type === challengeType
      );
      setFilteredChallenges(filtered);
    }
    setCurrentIndex(0); // Reset slider index when filter changes
  }, [challengeType, challenges]);

  // Handle type change
  const handleTypeChange = (e) => {
    setChallengeType(e.target.value);
  };

  // Show modal with selected challenge details
  const openModal = (challenge) => {
    setSelectedChallenge(challenge);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedChallenge(null);
  };

  return (
    <>
      <Navbar />
      <div className="challenges-page">
        <div className="challenges-title">
          <h1 className="challenges-title-text">Fitness Challenges</h1>
        </div>

        {/* Dropdown to select challenge type */}
        <div className="filter-container">
          <label htmlFor="challengeType">Select Program Type:</label>
          <select
            className="choose-type"
            id="challengeType"
            value={challengeType}
            onChange={handleTypeChange}
          >
            <option value="all">All Programs</option>
            <option value="weekly">Weekly Programs</option>
            <option value="monthly">Monthly Programs</option>
          </select>
        </div>

        {/* Challenge Section */}
        {filteredChallenges.length > 0 ? (
          <div className="challenge-section">
            {filteredChallenges.map((challenge) => (
              <div className="challenge-item" key={challenge.title} onClick={() => openModal(challenge)}>
                <img src={`http://127.0.0.1:8000/${challenge.image_url}`} alt={challenge.title} className="challenge-image" />
                <h3 className="challenge-show-title">{challenge.title}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p>No challenges available.</p>
        )}

        {/* Modal for Challenge Details */}
        {showModal && selectedChallenge && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-btn" onClick={closeModal}>&times;</span>
              <h2>{selectedChallenge.title}</h2>
              <p><strong>Description:</strong> {selectedChallenge.description}</p>
              <p><strong>Goal:</strong> {selectedChallenge.goal}</p>
              <p><strong>Tracking Method:</strong> {selectedChallenge.tracking_method}</p>
              <p><strong>Reward:</strong> {selectedChallenge.reward}</p>
              <p><strong>Start Date:</strong> {selectedChallenge.start_date}</p>
              <p><strong>End Date:</strong> {selectedChallenge.end_date}</p>
              <button className="get-btn">Get</button> {/* Add the Get button here */}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Challenges;
