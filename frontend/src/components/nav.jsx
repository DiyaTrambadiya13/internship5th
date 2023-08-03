import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { NavLink } from "react-router-dom";


export const Nav = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <NavLink exact="true" to="/" className="nav-logo">
                    IELTS App
                </NavLink>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" className ="active" exact="true">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className ="active">
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className ="active">
                            Register
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

