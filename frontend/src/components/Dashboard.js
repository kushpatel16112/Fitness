import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";

function Dashboard() {
  const [activeOption, setActiveOption] = useState("profile"); // Default to profile section
  const [user, setUser] = useState({
    id: "",
    user_name: "",
    weight: "",
    height: "",
    profile_pic: "",
  });
  const [enrolledPrograms, setEnrolledPrograms] = useState([]); // State to hold enrolled programs

  // Fetch user from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set user data from localStorage
    }
  }, []);

  // Fetch enrolled programs only when "Programs" is clicked
  const fetchEnrolledPrograms = async () => {
    const user = JSON.parse(localStorage.getItem('user')); 
    try {
      const response = await fetch(
        "http://localhost:8000/program/api/enrolled-programs/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({user_id: user.id}),
        }
      );

      const data = await response.json();
      setEnrolledPrograms(data); // Set enrolled programs data
    } catch (error) {
      console.error("Error fetching enrolled programs:", error);
    }
  };

  // Handle sidebar option click
  const handleOptionClick = (option) => {
    if (option === "programs") {
      fetchEnrolledPrograms(); // Fetch programs only when clicking on "Programs"
    }
    setActiveOption(option);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleFileChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, profile_pic: e.target.files[0] }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("user_name", user.user_name);
    formData.append("weight", user.weight);
    formData.append("height", user.height);
    if (user.profile_pic) {
      formData.append("profile_pic", user.profile_pic);
    }

    try {
      const response = await fetch(
        `http://localhost:8000/account/api/update-profile/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          <li onClick={() => handleOptionClick("profile")}>Your Profile</li>
          <li onClick={() => handleOptionClick("programs")}>Programs</li>
        </ul>
      </div>

      <div className="main-content">
        {activeOption === "profile" && (
          <div className="profile-section">
            <h2>Edit Your Profile</h2>
            <label>Name:</label>
            <input
              type="text"
              name="user_name"
              value={user.user_name}
              onChange={handleInputChange}
            />
            <label>Weight:</label>
            <input
              type="number"
              name="weight"
              value={user.weight}
              onChange={handleInputChange}
            />
            <label>Height:</label>
            <input
              type="number"
              name="height"
              value={user.height}
              onChange={handleInputChange}
            />
            <label>Profile Picture:</label>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSave}>Save Changes</button>
          </div>
        )}

        {activeOption === "programs" && (
          <div className="programs-section">
            <h2>Your Enrolled Programs</h2>
            {enrolledPrograms.length === 0 ? (
              <p>No programs enrolled yet.</p>
            ) : (
              enrolledPrograms.map((program) => (
                <div key={program.id} className="enrolled-program-card">
                  <img
                    src={`http://localhost:8000/${program.programm_img}`}
                    alt={program.programm_name}
                  />
                  <h3>{program.programm_name}</h3>
                  <p>{program.description}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
