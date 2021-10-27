import "../index.css";

export const Dashboard = () => {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-grid__row-top">
        <div className="dashboard-grid__row-top--grid-item">1</div>
        <div className="dashboard-grid__row-top--grid-item">2</div>
        <div className="dashboard-grid__row-top--grid-item">3</div>
        <div className="dashboard-grid__row-top--grid-item">4</div>
      </div>
      <div className="dashboard-grid__row-middle">
        <div className="dashboard-grid__row-middle--grid-item">1</div>
        <div className="dashboard-grid__row-middle--grid-item">2</div>
      </div>
      <div className="dashboard-grid__row-bottom">
        <div className="grid-item">1</div>
        <div className="grid-item">2</div>
        <div className="grid-item">3</div>
        <div className="grid-item">4</div>
      </div>
    </div>
  );
};
