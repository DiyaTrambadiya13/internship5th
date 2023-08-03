import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
// import "./register.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    Axios.post("http://localhost:8081/register", { email, password })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      <div className="head">
        <h1>IELTS Speaking WEB</h1>
      </div>
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
      <span>
        <a href="/">Already a customer? Login here!</a>
      </span>
    </div>
  );
};
