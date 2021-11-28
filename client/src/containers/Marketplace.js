import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../index.css";

import { getMarketContracts } from "../utils/getMarketContracts";
import { NFTCard } from "../components/NFTCard";
import { getSignedContracts } from "../utils/getSignedContracts";

export const Marketplace = () => {
  const [marketplaceNFTs, setMarketplaceNFTs] = useState([]);
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const { nftContract, marketContract } = await getMarketContracts();
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await nftContract.tokenURI(i.tokenId);
        const meta = await fetch(tokenUri);
        const jsonMeta = await meta.json();
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

  const buyNFT = async (nft) => {
    const { marketContract, nftAddress } = await getSignedContracts();

    const price = ethers.utils.parseUnits(nft.price, "ether");
    const transaction = await marketContract.createMarketSale(
      nftAddress,
      nft.tokenId,
      {
        value: price,
      }
    );

    return await transaction.wait();
  };

  return (
    <div className="grid">
      {marketplaceNFTs.map((item) => {
        return (
          <NFTCard item={item}>
            <div className="price">
              <button onClick={() => buyNFT(item)}>buy</button>
            </div>
          </NFTCard>
        );
      })}
    </div>
  );
};
