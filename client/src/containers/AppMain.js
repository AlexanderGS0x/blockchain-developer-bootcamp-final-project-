import "../index.css";
import { ethers } from "ethers";

import { Marketplace } from "./Marketplace";
import { Dashboard } from "./Dashboard";

export const AppMain = () => {
  // refactor to call api endpoint
  const deployContract = async () => {
    try {
      const VehicleTitleNftFactory = await ethers.getContractFactory(
        "VehicleTitleNft"
      );
      // Start deployment, returning a promise that resolves to a contract object
      const VehicleTitleNft = await VehicleTitleNftFactory.deploy();
      console.log("Contract deployed to address:", VehicleTitleNft.address);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // call metamask, send pub address to server, and log connected account in response
  async function logProviderAccount() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();

    const response = await fetch("http://localhost:8080/log-provider-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accounts }),
    });

    console.log("RESPONSE: ", await response.json());
  }

  return (
    <div>
      <div className="app-header">
        <div>Marketplace</div>
        <div>
          <button onClick={deployContract}>Deploy</button>
          <button onClick={requestAccount}>Connect Metamask Wallet</button>
          <button onClick={logProviderAccount}>Log Provider</button>
        </div>
      </div>
      <div className="app-main">
        {/* <Marketplace /> */}
        <Dashboard />
      </div>
    </div>
  );
};
