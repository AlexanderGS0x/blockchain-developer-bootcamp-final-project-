import { useField } from "react-form";
import { InputGroup } from "@blueprintjs/core";

export const NFTPriceInput = () => {
  const {
    meta: { error, isTouched },
    getInputProps,
  } = useField("nft_price", {
    validate: validateInput,
    defaultIsTouched: false,
    defaultValue: "",
  });
  return <InputGroup {...getInputProps()} type="text" />;
};

const validateInput = () => {
  return false;
};
