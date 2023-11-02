import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";

import LoginPage from "./pages/LoginPage/LoginPage"
import Dashboard from "./pages/Dashboard/Dashboard";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
