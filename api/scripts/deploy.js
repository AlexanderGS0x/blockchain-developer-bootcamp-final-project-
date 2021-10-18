const { ethers } = require("ethers");

async function deploy() {
  const VehicleTItleNftFactory = await ethers.getContractFactory(
    "VehicleTitleNft"
  );
  // Start deployment, returning a promise that resolves to a contract object
  const VehicleTitleNft = await VehicleTItleNftFactory.deploy();
  console.log("Contract deployed to address:", VehicleTitleNft.address);
}

// deploy()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

module.exports = {
  deploy,
};
