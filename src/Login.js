import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState("");
  const [loginError, setLoginError] = useState("");

  // Function to validate email format
  const validateEmail = (email) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      const token = response.data.token;
      // Store token in localStorage or sessionStorage
      localStorage.setItem("token", token);

      setLoginError("");

      onLogin(username);
    } catch (error) {
      console.error("Login error:", error.response.data.message);
      setLoginError("Invalid username or password. Please try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      setRegistrationError("Please fill in all fields.");
      // Reset fields
      setUsername("");
      setPassword("");
      setEmail("");
      return;
    }

    if (!validateEmail(email)) {
      setRegistrationError("Please enter a valid email address.");
      // Reset fields
      setUsername("");
      setPassword("");
      setEmail("");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        password,
        email,
      });

      console.log("Registration successful!");

      setRegistrationError("");
      setRegistrationSuccess("Registration successful! You can now login.");

      // Reset fields
      setUsername("");
      setPassword("");
      setEmail("");

    } catch (error) {
      console.error("Registration error:", error.response.data.message);
      setRegistrationError("Registration failed. Please try again.");
      
      // Reset fields
      setUsername("");
      setPassword("");
      setEmail("");
    }
  };

  const toggleRegisterForm = () => {
    // Clear error and success messages
    setRegistrationError("");
    setRegistrationSuccess("");
    setShowRegisterForm(!showRegisterForm);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <i className="bi bi-spotify large-icon"> </i>
      <h2 style={{ marginBottom: "20px", color: "white" }}>Login Page</h2>

      <form
        onSubmit={handleLogin}
        style={{
          display: "inline-block",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <label style={{ display: "block", marginBottom: "10px", color: "white" }}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid #ccc",
            }}
            required
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px", color: "white" }}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginLeft: "15px",
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid #ccc",
            }}
            required
          />
        </label>
        {loginError && (
          <p style={{ color: "red" }}>{loginError}</p>
        )}
        {/* Conditional rendering of Register form based on showRegisterForm state */}
        {showRegisterForm && (
          <label style={{ display: "block", marginBottom: "10px", color: "white" }}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                marginLeft: "37px",
                padding: "5px",
                borderRadius: "3px",
                border: "1px solid #ccc",
              }}
              required
            />
          </label>
        )}
        {registrationError && (
          <p style={{ color: "red" }}>{registrationError}</p>
        )}
        {registrationSuccess && (
          <p style={{ color: "green" }}>{registrationSuccess}</p>
        )}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "3px",
            backgroundColor: "#1DB954",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Login
        </button>
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission
            toggleRegisterForm();
            if (showRegisterForm) {
              handleRegister(e);
            }
          }}
          style={{
            padding: "10px 20px",
            borderRadius: "3px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showRegisterForm ? "Submit Registration" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Login;
