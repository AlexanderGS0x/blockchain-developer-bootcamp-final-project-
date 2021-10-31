import "../index.css";
import { Icon, Card } from "@blueprintjs/core";

export const Dashboard = () => {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-grid__row-top">
        <div className="dashboard-grid__row-top--grid-item">
          Titles in Distribution
        </div>
        <div className="dashboard-grid__row-top--grid-item">
          Total Value in circulation
        </div>
        <div className="dashboard-grid__row-top--grid-item">
          Transaction Amount
        </div>
        <div className="dashboard-grid__row-top--grid-item">Support</div>
      </div>
      <div className="dashboard-grid__row-middle">
        <Card className="dashboard-grid__row-middle--grid-item" interactive>
          <Icon icon="media" size="large" color="#d3d3d3" />
        </Card>
        <Card
          className="dashboard-grid__row-middle--grid-item"
          interactive
          minimal
        >
          <Icon icon="edit" size="large" color="#d3d3d3" />
        </Card>
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
