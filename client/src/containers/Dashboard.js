import "../index.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../index.css";

import Web3Modal from "web3modal";

import { NFTCreationPanel } from "../components/NFTCreationPanel";

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
      <NFTCreationPanel />
      <MyNftGrid />
    </div>
  );
};

export const MyNftGrid = () => {
  const [myNFTs, setMyNFTs] = useState([]);
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const response = await fetch("http://localhost:8080/get-market-contract");
    const jsonMarketContractResponse = await response.json();

    const {
      nftMarketAddress,
      nftMarketContract,
      nftMintAddress,
      nftMintContract,
    } = jsonMarketContractResponse;

    // /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider();

    const nftContract = new ethers.Contract(
      nftMintAddress,
      nftMintContract.abi,
      provider
    );
    const marketContract = new ethers.Contract(
      nftMarketAddress,
      nftMarketContract.abi,
      provider
    );

    const data = await marketContract.fetchMyNFTs();

    console.log("DATA: ", data);

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await nftContract.tokenURI(i.tokenId);
        const meta = await fetch(tokenUri);
        const jsonMeta = await meta.json();
        // let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          url: jsonMeta.asset_url,
          tokenId: i.tokenId.toNumber(),
          title: jsonMeta.metadata.title,
          price: jsonMeta.metadata.price,
          description: jsonMeta.metadata.description,
        };
        return item;
      })
    );

    setMyNFTs(items);
  }
  console.log(myNFTs);
  return (
    <div className="dashboard-grid__row-bottom">
      {myNFTs.map((item) => {
        return <div className="grid-item">1</div>;
      })}
    </div>
  );
};
