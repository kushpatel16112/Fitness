import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "../styles/Program.css";

function Programm() {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setPrograms(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  // Open modal with selected program details
  const openModal = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedProgram(null);
    setIsModalOpen(false);
  };

  // Handle program enrollment
  const enrollProgram = async (programId) => {
    const user = JSON.parse(localStorage.getItem('user')); 
    // Confirm enrollment
    const isConfirmed = window.confirm(
      "Are you sure you want to enroll in this program?"
    );
    if (!isConfirmed) return;

    try {
      const response = await fetch("http://localhost:8000/program/enroll/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ program_id: programId, user_id: user.id}),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message); // Success message
      } else {
        alert(result.error); // Error message
      }
    } catch (error) {
      console.error("Error enrolling in program:", error);
      alert("An error occurred while enrolling in the program.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="program-container">
        <h1>Our Fitness Programs</h1>
        <div className="program-list">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className={`program-card ${
                index % 2 === 0 ? "left-image" : "right-image"
              }`}
            >
              <img
                src={`http://127.0.0.1:8000/media/${program.programm_img}`}
                alt={program.programm_name}
                className="program-image"
              />
              <div className="program-info">
                <h2 className="program-title">{program.programm_name}</h2>
                <p className="program-de">{program.description}</p>
                <button
                  className="enroll-btn"
                  onClick={() => enrollProgram(program.id)}
                >
                  Enroll
                </button>
              </div>
              <button className="arrow-btn" onClick={() => openModal(program)}>
                {index % 2 === 0 ? ">" : "<"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for program details */}
      {isModalOpen && selectedProgram && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <img
              src={`http://127.0.0.1:8000/media/${selectedProgram.programm_img}`}
              alt={selectedProgram.programm_name}
              className="modal-image"
            />
            <div className="modal-info">
              <h2>{selectedProgram.programm_name}</h2>
              <p>{selectedProgram.description}</p>
              <p>
                <strong>Key Features:</strong> {selectedProgram.key_features}
              </p>
              <p>
                <strong>Work Includes:</strong> {selectedProgram.work_include}
              </p>
              <p>
                <strong>Examples:</strong> {selectedProgram.example}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Programm;
