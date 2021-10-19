require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());

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

app.post("/log-provider-account", (req, res) => {
  const { accounts } = req.body;
  res.json({
    message: `Successfully connected ethereum address ${accounts[0]}`,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
