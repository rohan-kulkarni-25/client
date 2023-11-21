// layout/Layout.js
import React from "react";
import Login from "../components/Auth/Login";
import Dashboard from "../components/Dashboard/Dashboard";

const Layout = ({ isLoggedIn, onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {isLoggedIn ? <Dashboard /> : <Login onLogin={onLogin} />}
    </div>
  );
};

export default Layout;
