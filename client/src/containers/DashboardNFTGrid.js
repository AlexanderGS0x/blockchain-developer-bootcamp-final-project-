import "../index.css";
import { useState, useEffect } from "react";

export const DashboardNFTGrid = ({
  marketContract,
  marketAddress,
  nftContract,
  nftAddress,
  signer,
}) => {
  const [myNFTs, setMyNFTs] = useState([]);
  useEffect(() => {
    loadNFTs();
  }, []);

  // try/catch
  async function loadNFTs() {
    if (marketContract && nftContract) {
      const data = await marketContract?.fetchMyNFTs();
      const items = await Promise.all(
        data.map(async (i) => {
          const tokenUri = await nftContract?.tokenURI(i.tokenId);
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
  }

  const relistNFT = async (tokenId) => {
    let txTransferNFT = await nftContract.transferFrom(
      signer.getAddress(),
      marketAddress,
      tokenId
    );
    await txTransferNFT.wait();

    const txRelistNFT = await marketContract.relistItem(nftAddress, tokenId);
    await txRelistNFT.wait();
  };

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
                <button onClick={() => relistNFT(item.tokenId)}>relist</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
