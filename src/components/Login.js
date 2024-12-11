import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST", // Specify the method
        headers: {
          "Content-Type": "application/json", // Inform server of the content type
        },
        body: JSON.stringify(credentials), // Send credentials in the body
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem("token", data.token);
        // Navigate based on role
        if (data.role === "admin") {
          navigate("/admin"); // Navigate to admin page if role is admin
        } else {
          navigate("/user"); // Navigate to user page if role is user
        }
      } else {
        // Handle login error
        setMessage(data.message || "Invalid email or password");
        console.log("Login failed:", data.message);
      }
    } catch (error) {
      // Handle network or other errors
      setMessage("An error occurred during login");
      console.error("Error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
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
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <a href="/register" className="btn btn-link p-0">
                Register here
              </a>
            </p>
          </div>
          {message && <p className="text-danger text-center mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
