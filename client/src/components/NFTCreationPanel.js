import "../index.css";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useForm } from "react-form";
import { Button } from "@blueprintjs/core";
import { FileInputCard } from "./FileInputCard";
import { FileMetaCard } from "./FileMetaCard";

export const NFTCreationPanel = () => {
  const NFTCreationForm = useForm({
    onSubmit: async (values) => {
      console.log("Values: ", values);

      // first upload asset to ipfs:
      let data = new FormData();
      data.append("nft.asset", values.nft_asset);
      data.append("nft.description", values.nft_description);
      data.append("nft.price", values.nft_price);
      data.append("nft.title", values.nft_title);

      const ipfsResponse = await fetch("http://localhost:8080/create-nft", {
        method: "POST",
        body: data,
      });
      const ipfsJsonResponse = await ipfsResponse.json();

      console.log("IPFS JSON RESPONSE: ", ipfsJsonResponse);

      const ipfsMeta = await fetch(
        `https://ipfs.infura.io/ipfs/${ipfsJsonResponse.path}`
      );

      const nftPayload = await ipfsMeta.json();

      const { asset_url, metadata } = nftPayload;
      console.log({ asset_url, metadata });
      // // sign transaction in metamask:
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const response = await fetch("http://localhost:8080/get-market-contract");
      const jsonMarketContractResponse = await response.json();

      const {
        nftMarketAddress,
        nftMarketContract,
        nftMintAddress,
        nftMintContract,
      } = jsonMarketContractResponse;

      const marketContract = new ethers.Contract(
        nftMarketAddress,
        nftMarketContract.abi,
        signer
      );

      const nftContract = new ethers.Contract(
        nftMintAddress,
        nftMintContract.abi,
        signer
      );

      // // this bit of code opens up metamask and asks for confirmation of tx
      // // user can change amount of gas in order to prioritize/deprioritize tx
      let transaction = await nftContract.createToken(
        `https://ipfs.infura.io/ipfs/${ipfsJsonResponse.path}`
      );
      let tx = await transaction.wait();
      let event = tx.events[0];
      let value = event.args[2];
      let tokenId = value.toNumber(); // a new NFT has been created!
      const price = ethers.utils.parseUnits("1.5", "ether");

      // // Post item to marketplace
      let listingPrice = await marketContract.getListingPrice();
      listingPrice = listingPrice.toString();

      transaction = await marketContract.createMarketItem(
        nftMintAddress,
        tokenId,
        price,
        { value: listingPrice }
      );
      await transaction.wait();
    },
    // debugForm: true,
  });

  return (
    <NFTCreationForm.Form className="dashboard-grid__row-middle">
      <h2>Create your NFT</h2>
      <div className="dashboard-grid__row-middle-content-area">
        <FileInputCard />
        <FileMetaCard />
      </div>
      <Button intent="primary" type="submit" text="Generate NFT" />
    </NFTCreationForm.Form>
  );
};
