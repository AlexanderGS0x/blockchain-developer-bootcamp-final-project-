import "../index.css";
import { Icon, Card } from "@blueprintjs/core";

import { FileInputCard } from "../components/FileInputCard";

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
        <FileInputCard />
        <Card
          className="dashboard-grid__row-middle--grid-item"
          interactive
          minimal
        >
          <Icon
            icon="edit"
            size="large"
            color="#d3d3d3"
            className="dashboard-grid__row-middle--grid-item--icon"
          />
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
