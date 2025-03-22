import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./index.css";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!identifier || !password) {
      setError("Please enter email/mobile and password.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/patient/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("storage"));
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
      <div className="text-center log-banner mx-auto bg-dark">
        <h1 className="text-light">Login</h1>
        <form onSubmit={handleLogin} className="h-75 p-3 w-75 rounded border mx-auto">
          <input
            className="p-2 auth-input w-100"
            onChange={(e) => setIdentifier(e.target.value)}
            type="text"
            value={identifier}
            placeholder="Enter email or mobile"
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
