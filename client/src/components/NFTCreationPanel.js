import "../index.css";
import { useForm } from "react-form";
import { Button } from "@blueprintjs/core";
import { FileInputCard } from "./FileInputCard";
import { FileMetaCard } from "./FileMetaCard";
import { useContractsContext } from "../hooks/useContracts";
import { createNft } from "../utils/createNft";
import { createMarketItem } from "../utils/createMarketItem";

export const NFTCreationPanel = () => {
  const { marketContract, nftContract, nftAddress } = useContractsContext();
  const NFTCreationForm = useForm({
    onSubmit: async (values) => {
      let data = new FormData();

      data.append("nft.asset", values.nft_asset);
      data.append("nft.description", values.nft_description);
      data.append("nft.price", values.nft_price);
      data.append("nft.title", values.nft_title);

      let mintedNft = await createNft(data, nftContract, values.nft_price);
      await createMarketItem(marketContract, nftAddress, mintedNft);
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
