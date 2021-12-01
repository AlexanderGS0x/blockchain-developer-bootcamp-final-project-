import "../index.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useForm } from "react-form";

import { NFTCreationPanel } from "../components/NFTCreationPanel";
import { getSignedContracts } from "../utils/getSignedContracts";
import { useWalletContext } from "../hooks/useWalletContext";
import { NFTCard } from "../components/NFTCard";
import { NFTPriceInput } from "../components/NFTPriceInput";

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
  const [selectedNFT, setSelectedNFT] = useState(null);
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
          price: ethers.utils.formatEther(i.price.toString()),
          description: jsonMeta.metadata.description,
        };
        return item;
      })
    );

    setMyNFTs(items);
  }

  const relistNFT = async (nft, price) => {
    // console.log("THIS: ", nft);
    // console.log("THAT: ", price);
    const { marketContract, marketAddress, nftContract } =
      await getSignedContracts();

    const signerAddress = await signer.getAddress();
    const resellPrice = ethers.utils.parseUnits(price.toString(), "ether");

    await nftContract.transferToken(signerAddress, marketAddress, nft.tokenId);
    await marketContract.relistItem(resellPrice, nft.tokenId);
  };

  const NFTRelistForm = useForm({
    onSubmit: async (values) => {
      relistNFT(selectedNFT, values.nft_price);
    },
    // debugForm: true,
  });

  return (
    <div className="dashboard-grid__row-bottom">
      {myNFTs.map((item) => {
        return (
          <NFTCard item={item}>
            <NFTRelistForm.Form>
              <div className="price">
                <NFTPriceInput />
                {/* <button type="submit" onClick={() => relistNFT(item)}>
                  relist
                </button> */}
                {/* TODO: Pass nft item to values of form to relist via contract abi */}
                <button type="submit" onClick={() => setSelectedNFT(item)}>
                  relist
                </button>
              </div>
            </NFTRelistForm.Form>
          </NFTCard>
        );
      })}
    </div>
  );
};
