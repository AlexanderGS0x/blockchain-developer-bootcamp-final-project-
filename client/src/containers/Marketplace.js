import { useEffect } from "react";
import { ethers } from "ethers";
import "../index.css";

export const Marketplace = () => {
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    console.log("LOAD NFTs");

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
    // console.log("DATA: ", data);

    const items = await Promise.all(
      data.map(async (i) => {
        // console.log("STUFF: ", i);
        const tokenUri = await nftContract.tokenURI(i.tokenId);
        const meta = await fetch(tokenUri);
        // console.log("META: ", meta);
        const jsonMeta = await meta.json();
        console.log("JSON META: ", jsonMeta);
        // console.log("JSON URI: ", tokenUri, meta);
        // let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          url: jsonMeta.url,
          tokenId: i.tokenId.toNumber(),
          title: jsonMeta.metadata.title,
          price: jsonMeta.metadata.price,
          description: jsonMeta.metadata.description,
        };
        return item;
      })
    );

    console.log("ITEMS: ", items);

    // /*
    // *  map over items returned from smart contract and format
    // *  them as well as fetch their token metadata
    // */
    // const items = await Promise.all(data.map(async i => {
    //   const tokenUri = await tokenContract.tokenURI(i.tokenId)
    //   const meta = await axios.get(tokenUri)
    //   let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
    //   let item = {
    //     price,
    //     tokenId: i.tokenId.toNumber(),
    //     seller: i.seller,
    //     owner: i.owner,
    //     image: meta.data.image,
    //     name: meta.data.name,
    //     description: meta.data.description,
    //   }
    //   return item
    // }))
    // setNfts(items)
    // setLoadingState('loaded')
  }

  return (
    <div className="grid">
      <div className="grid-item">1</div>
      <div className="grid-item">2</div>
      <div className="grid-item">3</div>
      <div className="grid-item">4</div>
      <div className="grid-item">5</div>
      <div className="grid-item">6</div>
      <div className="grid-item">7</div>
      <div className="grid-item">8</div>
      <div className="grid-item">9</div>
      <div className="grid-item">10</div>
      <div className="grid-item">11</div>
      <div className="grid-item">12</div>
      <div className="grid-item">13</div>
      <div className="grid-item">14</div>
      <div className="grid-item">15</div>
      <div className="grid-item">16</div>
    </div>
  );
};
