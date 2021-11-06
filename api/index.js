require("dotenv").config();
const { create } = require("ipfs-http-client");
const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());
app.use(formidableMiddleware());

const nftMarketABI = require("./artifacts/contracts/Market.sol/NFTMarket.json");
const nftMintABI = require("./artifacts/contracts/NFT.sol/NFT.json");

const port = process.env.EXPRESS_PORT;
const ipfs = create("https://ipfs.infura.io:5001/api/v0");

app.get("/", (req, res) => {
  res.send("Welcome to TitleX api!");
});

app.get("/get-market-contract", (req, res) => {
  return res.status(200).json({
    nftMarketAddress: process.env.NFT_MARKET_ADDRESS,
    nftMarketContract: nftMarketABI,
    nftMintAddress: process.env.NFT_MINT_ADDRESS,
    nftMintContract: nftMintABI,
  });
});

app.post("/mint", (req, res) => {
  const { tokenURI } = req.body;
  mintNFT(tokenURI);
});

app.post("/deploy", (req, res) => {
  deploy();
});

app.post("/log-provider-account", (req, res) => {
  const { accounts } = req.body;
  res.json({
    message: `Successfully connected ethereum address ${accounts[0]}`,
  });
});

app.get("/load-nfts", async (req, res) => {
  /*
   * create a generic provider and query for unsold market items
   * refactor?
   */
  const provider = new ethers.providers.JsonRpcProvider();
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(
    nftmarketaddress,
    Market.abi,
    provider
  );

  const data = await marketContract.fetchMarketItems();

  /*
   *  map over items returned from smart contract and format
   *  them as well as fetch their token metadata
   */
  const items = await Promise.all(
    data.map(async (i) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await fetch(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), "ether");
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      };
      return item;
    })
  );
  return items;
});

app.post("/buy-nft", async (req, res) => {
  const nft = req.body.nft;
  const signer = req.body.signer;

  /* 79-82 needs the user to sign the transaction, so will use Web3Provider and sign it */
  /* this will need to be done on the client */
  // const web3Modal = new Web3Modal();
  // const connection = await web3Modal.connect();
  // const provider = new ethers.providers.Web3Provider(connection);
  // const signer = provider.getSigner();

  // pass signed from api
  const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

  /* user will be prompted to pay the asking proces to complete the transaction */
  const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
  const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
    value: price,
  });

  return await transaction.wait();
  // after request, we will need to reload nfts on client...refactor to maybe use react query?
  // might be able to use a subgraph query here
});

// upload file to ipfs, then create nft on blockchain
app.post("/create-nft", async (req, res) => {
  const file = req.files["nft.asset"];
  let testFile = fs.readFileSync(file.path);
  let testBuffer = new Buffer.from(testFile);

  let ipfsUpload = await ipfs.add(testBuffer);

  if (!ipfsUpload) {
    return res
      .status(500)
      .json({ error: "There was a problem uploading the asset to ipfs" });
  }

  const payload = {
    asset_url: `${process.env.IPFS_HOST}${ipfsUpload.path}`,
    metadata: {
      title: req.fields["nft.title"],
      price: req.fields["nft.price"],
      description: req.fields["nft.description"],
    },
  };
  console.log(payload);
  let ipfsMetaUpload = await ipfs.add(JSON.stringify(payload));
  // console.log("UPLOAD: ", ipfsMetaUpload);
  // // const meta_url = `https://ipfs.infura.io/ipfs/${ipfsMetaUpload.path}`;
  // // console.log("IPFS METAUPLOAD: ", ipfsMetaUpload);
  // // pass upload data back to client to store in polygon blockchain
  return res.status(201).json(ipfsMetaUpload);
  // return res.status(201);
});

const createSale = async (url, signer) => {
  /* 140-144 needs the user to sign the transaction, so will use Web3Provider and sign it */
  /* this will need to be done on the client */
  // const web3Modal = new Web3Modal()
  // const connection = await web3Modal.connect()
  // const provider = new ethers.providers.Web3Provider(connection)
  // const signer = provider.getSigner()

  /* next, create the item */
  let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
  let transaction = await contract.createToken(url);
  let tx = await transaction.wait();
  let event = tx.events[0];
  let value = event.args[2];
  let tokenId = value.toNumber();
  const price = ethers.utils.parseUnits(formInput.price, "ether");

  /* then list the item for sale on the marketplace */
  contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
  let listingPrice = await contract.getListingPrice();
  listingPrice = listingPrice.toString();

  transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
    value: listingPrice,
  });
  await transaction.wait();
  // return nft success message
  // reroute to nft marketplace route on client
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
