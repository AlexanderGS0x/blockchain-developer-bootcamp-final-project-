import { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { useWalletContext } from "../hooks/useWalletContext";

const ContractsContext = createContext();

const ContractsProvider = ({ children }) => {
  const { signer } = useWalletContext();
  const [marketContract, setMarketContract] = useState(null);
  const [marketAddress, setMarketAddress] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [nftAddress, setNftAddress] = useState(null);

  // useEffect(() => {
  //   const getContracts = async () => {
  //     const response = await fetch("http://localhost:8080/get-market-contract");
  //     const jsonMarketContractResponse = await response.json();

  //     const {
  //       nftMarketAddress,
  //       nftMarketContract,
  //       nftMintAddress,
  //       nftMintContract,
  //     } = jsonMarketContractResponse;

  //     setMarketAddress(nftMarketAddress);
  //     setNftAddress(nftMintAddress);

  //     const marketContractInstance = new ethers.Contract(
  //       nftMarketAddress,
  //       nftMarketContract.abi,
  //       signer
  //     );

  //     const nftContractInstance = new ethers.Contract(
  //       nftMintAddress,
  //       nftMintContract.abi,
  //       signer
  //     );

  //     setMarketContract(marketContractInstance);
  //     setNftContract(nftContractInstance);
  //   };
  //   if (!marketContract || !nftContract) {
  //     getContracts();
  //   }
  // }, [marketContract, nftContract, signer]);

  const initializeApplicationContracts = async () => {
    const response = await fetch("http://localhost:8080/get-market-contract");
    const jsonMarketContractResponse = await response.json();

    const {
      nftMarketAddress,
      nftMarketContract,
      nftMintAddress,
      nftMintContract,
    } = jsonMarketContractResponse;

    setMarketAddress(nftMarketAddress);
    setNftAddress(nftMintAddress);

    const marketContractInstance = new ethers.Contract(
      nftMarketAddress,
      nftMarketContract.abi,
      signer
    );

    const nftContractInstance = new ethers.Contract(
      nftMintAddress,
      nftMintContract.abi,
      signer
    );

    setMarketContract(marketContractInstance);
    setNftContract(nftContractInstance);
  };

  return (
    <ContractsContext.Provider
      value={{
        marketContract,
        nftContract,
        marketAddress,
        nftAddress,
        initializeApplicationContracts,
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};

export { ContractsProvider, ContractsContext };
