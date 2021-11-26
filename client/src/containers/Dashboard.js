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
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const nftContract = new ethers.Contract(
      nftMintAddress,
      nftMintContract.abi,
      signer
    );
    const marketContract = new ethers.Contract(
      nftMarketAddress,
      nftMarketContract.abi,
      signer
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

  return (
    <div className="dashboard-grid__row-bottom">
      {myNFTs.map((item) => {
        return (
          <div className="grid-item" id={item.tokenId}>
            <div className="header">
              <img src={item.url} alt={item.title} />
            </div>
            <div className="footer">
              <div className="info">
                <h3>{item.title}</h3>
                <p>{item.price}</p>
              </div>
              <div className="price">
                <button onClick={() => console.log("relist")}>reslist</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
