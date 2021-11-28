const { expect } = require("chai");
const { ethers } = require("hardhat");

/* test/sample-test.js */
describe("NFTMarket", function () {
  it("CreateMarketItem should transfer ownership of NFT to marketplace address", async function () {
    /* deploy the marketplace */
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    /* deploy the NFT contract */
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;

    const auctionPrice = ethers.utils.parseUnits("1", "ether");

    /* create an nft */
    await nft.createToken("https://www.mytestnft.com");

    /* put nft up for sale */
    await market.createMarketItem(nftContractAddress, 1, auctionPrice);

    expect(await nft.ownerOf(1)).to.equal(marketAddress);
  });
});

/* test/sample-test.js */
describe("NFTMarket", function () {
  it("CreateMarketSale should transfer ownership of NFT to buyer address", async function () {
    /* deploy the marketplace contract */
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    /* deploy the NFT contract */
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;

    const auctionPrice = ethers.utils.parseUnits("1", "ether");

    /* create an nft */
    await nft.createToken("https://www.mytestnft.com");

    /* put nft up for sale */
    await market.createMarketItem(nftContractAddress, 1, auctionPrice);

    /* get buyer wallet, destructure buyer object */
    const [_, buyer] = await ethers.getSigners();

    /* execute sale of token to another user */
    await market
      .connect(buyer)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

    expect(await nft.ownerOf(1)).to.equal(buyer.address);
  });
});

/* test/sample-test.js */
// describe("NFTMarket", function () {
//   it("Relist should transfer ownership of NFT to market address", async function () {
//     /* deploy the marketplace contract */
//     const Market = await ethers.getContractFactory("NFTMarket");
//     const market = await Market.deploy();
//     await market.deployed();
//     const marketAddress = market.address;

//     /* deploy the NFT contract */
//     const NFT = await ethers.getContractFactory("NFT");
//     const nft = await NFT.deploy(marketAddress);
//     await nft.deployed();
//     const nftContractAddress = nft.address;

//     const auctionPrice = ethers.utils.parseUnits("1", "ether");

//     /* create an nft */
//     await nft.createToken("https://www.mytestnft.com");

//     /* put nft up for sale */
//     await market.createMarketItem(nftContractAddress, 1, auctionPrice);

//     /* get buyer wallet, destructure buyer object */
//     const [_, buyer] = await ethers.getSigners();

//     /* execute sale of token to another user */
//     await market
//       .connect(buyer)
//       .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

//     /* reslist token make on the marketplace */
//     await market.connect(buyer).relistItem(1);

//     expect(await nft.ownerOf(1)).to.equal(marketAddress);
//   });
// });
