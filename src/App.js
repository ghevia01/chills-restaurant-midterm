import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
