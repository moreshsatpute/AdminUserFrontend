import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role is user
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(`Input Change - ${id}:`, value); // Log changes to inputs
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleRoleChange = (e) => {
    console.log("Role Change:", e.target.value); // Log role change
    setFormData((prevData) => ({ ...prevData, role: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted with Data:", formData); // Log full form data

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      console.log("API Response:", response.data); // Log API response
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/"); // Redirect to login page after a delay
      }, 2000); // 2-second delay for user to see the success message
    } catch (error) {
      console.error("API Error:", error); // Log error details
      setMessage(
        error.response?.data?.message || "An error occurred during registration."
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role:</label>
            <select
              className="form-select"
              value={formData.role}
              onChange={handleRoleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/" className="text-decoration-none">
              Login here
            </Link>
          </p>
          {message && <p className="text-center text-danger mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
