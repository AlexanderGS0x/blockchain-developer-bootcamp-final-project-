import "../index.css";
import { useForm } from "react-form";
import { Button } from "@blueprintjs/core";
import { FileInputCard } from "./FileInputCard";
import { FileMetaCard } from "./FileMetaCard";

export const NFTCreationPanel = () => {
  const NFTCreationForm = useForm({
    onSubmit: async (values) => {
      console.log("Values: ", values);
      // //   setSaving(true);
      // let data = new FormData();
      // data.append("nft.asset", values.nft_asset);
      // // handle api here
      // const response = await fetch("http://localhost:8080/create-nft", {
      //   method: "POST",
      //   body: data,
      // });
      // const jsonResponse = await response.json();
      // console.log("RESPONSE: ", jsonResponse);
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
