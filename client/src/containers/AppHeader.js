import { ConnectWallet } from "../components/ConnectWallet";

export const AppHeader = ({ title }) => {
  return (
    <div className="app-header">
      <div>{title}</div>
      {/* <button onClick={deployContract}>Deploy</button>
        <button onClick={logProviderAccount}>Log Provider</button>
        <button onClick={requestAccount}>Connect Metamask Wallet</button> */}
      <ConnectWallet />
    </div>
  );
};

// refactor to call api endpoint
// const deployContract = async () => {
//   try {
//     const VehicleTitleNftFactory = await ethers.getContractFactory(
//       "VehicleTitleNft"
//     );
//     // Start deployment, returning a promise that resolves to a contract object
//     const VehicleTitleNft = await VehicleTitleNftFactory.deploy();
//     console.log("Contract deployed to address:", VehicleTitleNft.address);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// call metamask, send pub address to server, and log connected account in response
//   async function logProviderAccount() {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const accounts = await provider.listAccounts();

//     const response = await fetch("http://localhost:8080/log-provider-account", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ accounts }),
//     });

//     console.log("RESPONSE: ", await response.json());
//   }

//   const beginWiggling = () => {
//     window.clearTimeout(this.wiggleTimeoutId);
//     this.setState({ wiggling: true });
//     this.wiggleTimeoutId = window.setTimeout(
//       () => this.setState({ wiggling: false }),
//       300
//     );
//   };
