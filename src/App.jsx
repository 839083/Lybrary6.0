import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Auth from "./Auth";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Page */}
        <Route
          path="/"
          element={
            <div className="app">
              <Auth />
            </div>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <div className="app">
              <AdminDashboard />
            </div>
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={
            <div className="app">
              <StudentDashboard />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
