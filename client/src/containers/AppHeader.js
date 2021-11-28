import { ConnectWallet } from "../components/ConnectWallet";

export const AppHeader = ({ title }) => {
  return (
    <div className="app-header">
      <h2>{title}</h2>
      <ConnectWallet />
    </div>
  );
};
