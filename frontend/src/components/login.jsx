import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic here
    Axios.post("http://localhost:8081/login", { email, password })
      .then((response) => {
        if (response.data === "Success") {
          // Set session or token here (example: using localStorage)
          localStorage.setItem("authenticated", "true");
          navigate("/dashboard");
        } else {
          alert("Username or password is not correct");
        }
      })
      .catch((error) => {
        // Handle login error
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      <div className="head">
        <h1>IELTS Speaking WEB</h1>
      </div>
      <h2>Login</h2>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <span>
        <a href="/register">New one? Register here!</a>
      </span>
    </div>
  );
};
