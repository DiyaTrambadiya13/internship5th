import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { NavLink } from "react-router-dom";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Dashboard } from "./components/dashboard";
import { Nav } from "./components/nav";
import { ButtonGrid } from "./components/NewWords";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./components/nav.css";
import "./components/dashboard.css"
import 'regenerator-runtime/runtime'
import { VtoT } from './components/VtoT';
import { RandomSentence } from './components/RandomSentence';

function App() {
    
    return (
        <div className="app-container">
            <Router>
                <Nav />
                <div className="pages">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/dashboard/newWords" element={<ButtonGrid />} />
                        <Route path="/dashboard/speak" element={<VtoT />} />
                        <Route path="/dashboard/write" element={<RandomSentence />} />
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
