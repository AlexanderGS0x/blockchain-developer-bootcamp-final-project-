import "./index.css";
import "./App.css";

import { AppSidebar } from "./containers/AppSidebar";
import { AppMain } from "./containers/AppMain";

function App() {
  return (
    <div className="app-wrapper">
      <AppSidebar />
      <AppMain />
    </div>
  );
}

export default App;
