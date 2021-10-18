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

  return (
    <div className="App">
      <button onClick={deployContract}>Deploy</button>
    </div>
  );
}

export default App;
