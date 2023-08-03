import React, { useEffect, useState } from "react";
// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogout = () => {
    // Clear authentication status and logout
    localStorage.removeItem("authenticated");

    Axios.post("http://localhost:8081/logout")
      .then((response) => {
        if (response.data === "Logged out") {
          navigate("/login");
        } else {
          alert("Logout failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    setAuthenticated(isAuthenticated);

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  if (!authenticated) {
    // Return null if not authenticated
    return null;
  }

  return (
    <div className="rows" id="rows">
      <ul>
        <div className="rows" id="rows">
          <ul>
            <li>
              <button onClick={() => navigate("/dashboard/newWords")}>
                Improve Pronunciation 👉
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/dashboard/speak")}>
                Speaking Hard Words 👉
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/dashboard/write")}>
                Writing English Words 👉
              </button>
            </li>
          </ul>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </div>
  );
};
