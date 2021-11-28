import "../index.css";
import { Button } from "@blueprintjs/core";
import { Link } from "react-router-dom";

import { useContractsContext } from "../hooks/useContracts";

export const Welcome = () => {
  const { initializeApplicationContracts } = useContractsContext();
  return (
    <div className="welcome-page">
      <h1>Welcome to TitleX</h1>
      <h3>A NFT vehicle marketplace</h3>

      <Link to="/marketplace">
        <Button text="Launch App" />
      </Link>
      <Button
        text="Initialize Contracts"
        onClick={() => initializeApplicationContracts()}
      />
    </div>
  );
};
