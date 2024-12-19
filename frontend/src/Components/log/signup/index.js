import React, { useState } from "react";
 
import "./index.css";
import { Link,useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (email.trim() && password.trim() && mobile.trim() && name.trim()) {
      // Validate mobile number (10 digits)
      if (!/^[0-9]{10}$/.test(mobile)) {
        setError("Please enter a valid 10-digit phone number");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:8000/patient/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, mobile, name }),
        });
  
        if (response.ok) {
          const newPatient = await response.json(); // Get the patient object from the response
  
          setSuccess("Signup Successful");
          setError("");
  // Clear old data in local storage (if any)
  localStorage.removeItem("patients");
  localStorage.removeItem("user");

  // Save new signup data in local storage (storing the patient information along with ID)
  const storedPatients = JSON.parse(localStorage.getItem("user")) || [];
  localStorage.setItem("user", JSON.stringify([...storedPatients, newPatient]));

          // Clear form fields after successful signup
          setEmail("");
          setPassword("");
          setMobile("");
          setName("");
  
          // Navigate to home page after successful signup
          navigate("/home");
        } else if (response.status === 400) {
          setError("Email already exists. Try logging in.");
        } else {
          setError("Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        setError("An error occurred during signup");
      }
    } else {
      setError("Please fill in all fields");
    }
  };
  
  

  return (
    <div className="container my-4">
      <div className=" bg-dark text-center log-banner mx-auto">
        <h1 className="bg-dark">Signup</h1>
        <form className="h-75 p-3 w-75 rounded border mx-auto" onSubmit={handleSignup}>
          <input
            className="p-2 auth-input w-100"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <br />
          <input
            className="p-2 auth-input w-100"
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter phone number"
            required
          />
          <br />
          <input
            className="p-2 auth-input w-100"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
          <br />
          <input
            className="p-2 auth-input w-100"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
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
            Signup
          </button>
          <p className="text-light">
            If you already have an account?{" "}
            <Link to="/Login" className="text-danger">
              Login
            </Link>
          </p>
          {success && <p className="text-success">{success}</p>}
          {error && <p className="text-danger">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
