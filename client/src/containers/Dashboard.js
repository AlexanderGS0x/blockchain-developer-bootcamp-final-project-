import "../index.css";
import { useState, useEffect } from "react";
import "../index.css";

import { NFTCreationPanel } from "../components/NFTCreationPanel";
import { getSignedContracts } from "../utils/getSignedContracts";
import { useWalletContext } from "../hooks/useWalletContext";
import { NFTCard } from "../components/NFTCard";

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
  const { signer } = useWalletContext();
  const [myNFTs, setMyNFTs] = useState([]);
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const { nftContract, marketContract } = await getSignedContracts();
    const data = await marketContract.fetchMyNFTs();

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

    setMyNFTs(items);
  }

  const relistNFT = async (nft) => {
    const { marketContract, marketAddress, nftContract } =
      await getSignedContracts();

    const signerAddress = await signer.getAddress();

    await nftContract.transferToken(signerAddress, marketAddress, nft.tokenId);
    await marketContract.relistItem(marketAddress, nft.tokenId);
  };

  return (
    <div className="dashboard-grid__row-bottom">
      {myNFTs.map((item) => {
        return (
          <NFTCard item={item}>
            <div className="price">
              <button onClick={() => relistNFT(item)}>relist</button>
            </div>
          </NFTCard>
        );
      })}
    </div>
  );
};
