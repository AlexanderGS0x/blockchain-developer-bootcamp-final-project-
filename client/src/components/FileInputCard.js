import "../index.css";
import { useState, forwardRef } from "react";
import { useForm, useField } from "react-form";
import { Card, Button, Icon, FileInput } from "@blueprintjs/core";

export const FileInputCard = () => {
  const ImageUploadForm = useForm({
    onSubmit: async (values) => {
      //   setSaving(true);
      let data = new FormData();
      console.log(values.nft_asset);
      data.append("nft.asset", values.nft_asset);
      // handle api here
      const response = await fetch("http://localhost:8080/create-nft", {
        method: "POST",
        body: data,
      });
      const jsonResponse = await response.json();
      console.log("RESPONSE: ", jsonResponse);
    },
    // debugForm: true,
  });

  return (
    <ImageUploadForm.Form>
      <Card className="dashboard-grid__row-middle--grid-item" interactive>
        <Icon
          icon="media"
          size="small"
          color="#d3d3d3"
          className="dashboard-grid__row-middle--grid-item--icon"
        />
        <NFTAssetUploadField />
        <Button
          type="submit"
          intent="primary"
          text="Upload Asset"
          //   loading={saving}
          //   disabled={disabled}
        />
      </Card>
    </ImageUploadForm.Form>
  );
};

const NFTAssetUploadField = forwardRef((props, ref) => {
  const [fileName, setFileName] = useState(null);

  const NFTAssetUploadFieldInstance = useField("nft_asset", {
    validate: validateInput,
    defaultIsTouched: false,
    defaultValue: "",
  });

  const { getInputProps, value, setValue } = NFTAssetUploadFieldInstance;
  const { ref: _ref } = getInputProps({ ref });

  // Build the field
  return (
    <FileInput
      text={fileName || "Upload Image"}
      buttonText="Browse"
      hasSelection={!!value}
      //   disabled={props.disabled}
      fill
      inputProps={{
        ref: _ref,
        required: true,
        onChange: (event) => {
          const target = event.target;
          const { files } = target;
          if (!files || files.length < 1) {
            setFileName(undefined);
            setValue("");
            return;
          }
          const [file] = Array.from(files);
          setFileName(file.name);
          //@ts-ignore
          setValue(file);
        },
        accept: ".png, .jpg",
      }}
    />
  );
});

const validateInput = () => {
  return false;
};
