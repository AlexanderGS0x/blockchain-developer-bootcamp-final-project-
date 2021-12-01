const createMarketItem = async (marketContract, nftAddress, mintedNft) => {
  // // Post item to marketplace
  let transaction = await marketContract.createMarketItem(
    nftAddress,
    mintedNft.tokenId,
    mintedNft.price
  );
  await transaction.wait();
};

export { createMarketItem };
