import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Corrected navigation hook
import "./index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/patient/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Response Status: ", response.status); // Log the response status
      const data = await response.json();
      console.log("Response Data: ", data); // Log the response data
  
      if (response.ok) {
        // Clear previous login data in localStorage
         
 
        localStorage.removeItem("user");
  
        // Store new login data (token and user)
        localStorage.setItem("user", JSON.stringify(data.user));
  
        // Navigate to the home page after successful login
        navigate("/home");
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred during login. Please try again.");
    }
  };
  
  
  
  return (
    <div className="container my-4">
      <div className="  text-center log-banner mx-auto bg-dark">
        <h1 className="text-light">Login</h1>
        <form onSubmit={handleLogin} className="h-75 p-3 w-75 rounded border mx-auto">
          <input
            className="p-2 auth-input w-100"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            placeholder="Enter email"
          />
          <br />
          <input
            className="p-2 auth-input w-100"
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Enter password"
          />
          <br />
          <div className="d-flex align-items-center w-100">
            <input
              className="mx-3 check-input"
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <p className="lh text-light">Show password</p>
          </div>
          <button type="submit" className="btn btn-primary mx-auto w-50 text-light">
            Login
          </button>
          {error && <p className="text-danger mt-3">{error}</p>}
          <p className="text-light">
            If you don't have an Account?{" "}
            <Link to="/Signup" className="text-danger">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
