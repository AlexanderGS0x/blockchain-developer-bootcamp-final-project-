import { ethers } from "ethers";

// intantiates function with JsonRPCProvider
// these contracts will not need to be signed
const getMarketContracts = async () => {
  const response = await fetch("http://localhost:8080/get-market-contract");
  const jsonMarketContractResponse = await response.json();

  const {
    nftMarketAddress,
    nftMarketContract,
    nftMintAddress,
    nftMintContract,
  } = jsonMarketContractResponse;

  // create a generic provider and query for unsold market items
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

  return {
    nftContract,
    marketContract,
    marketAddress: nftMarketAddress,
    nftAddress: nftMintAddress,
  };
};

export { getMarketContracts };