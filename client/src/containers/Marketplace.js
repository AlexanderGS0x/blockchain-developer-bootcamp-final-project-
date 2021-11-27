import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../index.css";

import Web3Modal from "web3modal";

export const Marketplace = () => {
  const [marketplaceNFTs, setMarketplaceNFTs] = useState([]);
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

    const data = await marketContract.fetchMarketItems();

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

    setMarketplaceNFTs(items);
  }

  return (
    <div className="grid">
      {marketplaceNFTs.map((item) => {
        return (
          <NFTCard
            key={item.tokenId}
            nft={item}
            src={item.url}
            title={item.title}
            price={item.price}
            tokenId={item.tokenId}
            description={item.description}
          />
        );
      })}
    </div>
  );
};

export const NFTCard = ({ nft, src, title, price, tokenId, description }) => {
  const buyNFT = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log(signer.provider);

    const response = await fetch("http://localhost:8080/get-market-contract");
    const jsonMarketContractResponse = await response.json();

    const { nftMarketAddress, nftMarketContract, nftMintAddress } =
      jsonMarketContractResponse;

    const contract = new ethers.Contract(
      nftMarketAddress,
      nftMarketContract.abi,
      signer
    );

    const price = ethers.utils.parseUnits(nft.price, "ether");
    const transaction = await contract.createMarketSale(
      nftMintAddress,
      nft.tokenId,
      {
        value: price,
      }
    );

    return await transaction.wait();
  };

  return (
    <div className="grid-item" id={tokenId}>
      <div className="header">
        <img src={src} alt={title} />
      </div>
      <div className="footer">
        <div className="info">
          <h3>{title}</h3>
          <p>{price}</p>
        </div>
        <div className="price">
          <button onClick={buyNFT}>buy</button>
        </div>
      </div>
    </div>
  );
};
