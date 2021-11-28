import "../index.css";

import { NFTCreationPanel } from "../components/NFTCreationPanel";
import { useContractsContext } from "../hooks/useContracts";
import { useWalletContext } from "../hooks/useWalletContext";
import { DashboardNFTGrid } from "./DashboardNFTGrid";

export const Dashboard = () => {
  const { signer } = useWalletContext();
  const { marketContract, marketAddress, nftContract, nftAddress } =
    useContractsContext();
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
      <NFTCreationPanel />
      <DashboardNFTGrid
        marketContract={marketContract}
        marketAddress={marketAddress}
        nftContract={nftContract}
        nftAddress={nftAddress}
        signer={signer}
      />
    </div>
  );
};
