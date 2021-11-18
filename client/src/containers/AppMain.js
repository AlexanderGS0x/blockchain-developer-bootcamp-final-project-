import "../index.css";
import { Switch, Route } from "react-router-dom";

import { Marketplace } from "./Marketplace";
import { Dashboard } from "./Dashboard";
import { AppHeader } from "./AppHeader";
import { Welcome } from "./Welcome";

import { useTheme } from "../hooks/useTheme";

export const AppMain = () => {
  const { theme } = useTheme();
  return (
    <Switch>
      <Route exact path="/">
        <Welcome />
      </Route>
      <Route path="/marketplace">
        {/* <AppHeader title="Marketplace" />
        <div className="app-main">
          <Marketplace />
        </div> */}
      </Route>
      <Route path="/dashboard">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: theme.background,
            minHeight: "100vh",
          }}
        >
          <AppHeader title="Dashboard" />
          <Dashboard />
        </div>
      </Route>
    </Switch>
  );
};
