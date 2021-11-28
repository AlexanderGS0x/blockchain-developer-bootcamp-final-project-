const createMarketItem = async (marketContract, nftAddress, mintedNft) => {
  // // Post item to marketplace
  // let listingPrice = await marketContract.getListingPrice();
  // listingPrice = listingPrice.toString();

  let transaction = await marketContract.createMarketItem(
    nftAddress,
    mintedNft.tokenId,
    mintedNft.price
    // { value: listingPrice }
  );
  await transaction.wait();
};

export { createMarketItem };
