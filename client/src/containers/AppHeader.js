import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { Button, Tag } from "@blueprintjs/core";
import { injected } from "../App";
import { ethers } from "ethers";
import Jazzicon from "@metamask/jazzicon";

import { SUPPORTED_CHAINS } from "../App";
import { Identicon } from "../components/Identicon";

export const AppHeader = () => {
  const web3React = useWeb3React();
  const { chainId, active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [isWalletConnected, setIsWalletConnected] = useState(account);
  const [balanceInEth, setBalanceInEth] = useState(null);

  useEffect(() => {
    setIsWalletConnected(account);
  }, [account]);

  useEffect(() => {
    // call the smart contract, send an update
    async function getBalance() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        setBalanceInEth(`${ethers.utils.formatEther(balance)} ETH`);
      } catch (err) {
        console.log(err);
      }
    }
    getBalance();
  }, [account]);

  // you can't "log out" of metamask through a client side app
  // user must log out through their wallet for security concerns. common practice in Defi platforms (see uniswap)
  // this is an ongoing issue with metamask.

  // request access to the user's MetaMask account
  async function connect() {
    try {
      const account = await activate(injected);
      console.log(account);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function openWalletModal() {
    console.log("open wallet modal");
    // TODO: implement wallet info modal
  }

  const slugifyAccount = (account) => {
    if (account) {
      let accountString = account;
      let pre = accountString.slice(0, 6);
      let post = accountString.slice(account.length - 4);
      return `${pre}...${post}`;
    }
  };

  return (
    <div className="app-header">
      <div>Marketplace</div>
      {/* <button onClick={deployContract}>Deploy</button>
        <button onClick={logProviderAccount}>Log Provider</button>
        <button onClick={requestAccount}>Connect Metamask Wallet</button> */}
      {!isWalletConnected && (
        <div className="app-header__connect-wallet-wrapper">
          <Button intent="success" onClick={connect} text="Connect Wallet" />
        </div>
      )}
      {isWalletConnected && (
        <div className="app-header__connect-wallet-wrapper">
          <Tag className="wallet-tag">{SUPPORTED_CHAINS[chainId]}</Tag>
          <Tag className="wallet-tag">{balanceInEth}</Tag>
          <Button
            className="wallet-tag"
            intent="danger"
            onClick={openWalletModal}
            text={slugifyAccount(account)}
            rightIcon={<Identicon />}
          />
          <Tag className="wallet-tag">...</Tag>
        </div>
      )}
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
