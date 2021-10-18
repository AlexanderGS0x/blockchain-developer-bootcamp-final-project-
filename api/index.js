require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.EXPRESS_PORT;

const { mintNFT } = require("./scripts/mint-nft");
const { deploy } = require("./scripts/deploy");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/mint", (req, res) => {
  const { tokenURI } = req.body;
  mintNFT(tokenURI);
});

app.post("/deploy", (req, res) => {
  deploy();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
