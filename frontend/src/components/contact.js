import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import "../styles/Contact.css";

const stateCityMapping = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  "Arunachal Pradesh": ["Itanagar", "Pasighat", "Tawang", "Ziro"],
  Assam: ["Guwahati", "Dibrugarh", "Silchar", "Tezpur"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Karnal"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubli"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Manipur: ["Imphal", "Churachandpur", "Thoubal", "Bishnupur"],
  Meghalaya: ["Shillong", "Tura", "Jowai", "Nongstoin"],
  Mizoram: ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
  Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  Punjab: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
  Sikkim: ["Gangtok", "Pelling", "Namchi", "Gyalshing"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
  Tripura: ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"],
  Uttarakhand: ["Dehradun", "Haridwar", "Rishikesh", "Nainital"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri"],
  "Andaman and Nicobar Islands": [
    "Port Blair",
    "Car Nicobar",
    "Diglipur",
    "Havelock Island",
  ],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa", "Diu"],
  Lakshadweep: ["Kavaratti", "Agatti", "Amini", "Andrott"],
  Delhi: ["New Delhi", "Dwarka", "Rohini", "Saket"],
  Puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
};

function Contact() {
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  // Handle state change
  const handleStateChange = (event) => {
    const selected = event.target.value;
    setSelectedState(selected);

    // Update cities based on selected state
    if (selected && stateCityMapping[selected]) {
      setCities(stateCityMapping[selected]);
    } else {
      setCities([]);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    message: "",
  });

  const navigate = useNavigate(); // Replaces useHistory

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/contact/contact-team/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        window.alert("Email sent successfully!");
        navigate("/contact"); // Navigate to a thank you page after submission
      } else {
        window.alert("Error sending email. Please try again.");
      }
    } catch (error) {
      console.error("Request failed", error);
    }
  };
  

  return (
    <>
      <Navbar />

      <div className="co-img">
        <div className="cor">
          <h1 className="co-content">Contact Our team</h1>
          <h1 className="cor-content">WE'D LOVE TO HEAR FROM YOU</h1>
        </div>
      </div>

      <div className="contact__header">
        <main className="contactForm__main">
          <div className="contactForm__container">
            <div className="contactForm__formContainer">
              <header className="contactForm__header">
                <h1>Please Feel free to contact us</h1>
              </header>
              <form onSubmit={handleSubmit}>
                <div className="contactForm__formGroup">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contactForm__formGroup">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contactForm__formGroup">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contactForm__formGroup">
                  <select
                    name="state"
                    value={selectedState}
                    onChange={handleStateChange}
                    required
                  >
                    <option value="">Select a State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">
                      Dadra and Nagar Haveli and Daman and Diu
                    </option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  </select>
                </div>
                <div className="contactForm__formGroup">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a City</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="contactForm__formGroup">
                  <textarea
                    style={{"height" : 100}}
                    name="message"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
            <div className="contactForm__mapContainer">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.5851716909597!2d72.57136261480188!3d23.02250568488243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f32f4d13b1%3A0x408de36dc0b2a391!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1701002958846!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <h2 className="get">Get in Touch</h2>
            </div>
          </div>
        </main>
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
      </div>

      <div className="about_why">
        <a href="/about">WHY CHOOSE US?</a>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
