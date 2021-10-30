import "../index.css";

import { Marketplace } from "./Marketplace";
import { Dashboard } from "./Dashboard";
import { AppHeader } from "./AppHeader";

export const AppMain = () => {
  return (
    <div>
      <AppHeader />
      <div className="app-main">
        {/* <Marketplace /> */}
        <Dashboard />
      </div>
    </div>
  );
};
