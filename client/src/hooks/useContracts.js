import { useContext } from "react";
import { ContractsContext } from "../context/contractsContext";

const useContractsContext = () => {
  const context = useContext(ContractsContext);
  if (context === undefined) {
    throw new Error(
      "useContractsProvider must be used within a ContractsProvider"
    );
  }
  return context;
};

export { useContractsContext };
