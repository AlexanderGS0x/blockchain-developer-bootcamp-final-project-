import logo from "./logo.svg";
import "./App.css";

import { ethers } from "ethers";

function App() {
  // refactor to call api endpoint
  const deployContract = async () => {
    try {
      const VehicleTItleNftFactory = await ethers.getContractFactory(
        "VehicleTitleNft"
      );
      // Start deployment, returning a promise that resolves to a contract object
      const VehicleTItleNft = await VehicleTItleNftFactory.deploy();
      console.log("Contract deployed to address:", VehicleTItleNft.address);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // call the smart contract, read the current greeting value
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
    <div className="App">
      <button onClick={deployContract}>Deploy</button>
      <button onClick={requestAccount}>Connect Metamask Wallet</button>
      <button onClick={logProviderAccount}>Log Provider</button>
    </div>
  );
}

export default App;
