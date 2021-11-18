import "../index.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { AppMain } from "./AppMain";

export const AppRouter = () => {
  return (
    <Router>
      <AppMain />
    </Router>
  );
};
