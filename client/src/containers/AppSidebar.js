import "../index.css";

export const AppSidebar = () => {
  return (
    <div className="app-sidebar">
      <div className="logo">
        <img src="logo.png" width="100%" />
      </div>
      <ul className="sidebar-links">
        <li>Marketplace</li>
        <li>Dashboard</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};
