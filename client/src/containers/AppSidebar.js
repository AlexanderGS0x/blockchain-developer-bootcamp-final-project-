import "../index.css";
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { AppMain } from "./AppMain";

export const AppSidebar = () => {
  return (
    <Router>
      <div className="app-sidebar">
        <div className="logo">
          <img src="logo.png" width="100%" alt="TitleX Logo" />
        </div>
        <ul className="sidebar-links">
          <li>
            <Link to="/marketplace">Marketplace</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
      <AppMain />
    </Router>
  );
};
