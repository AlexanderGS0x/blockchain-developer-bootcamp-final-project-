async function main() {
  const VehicleTItleNftFactory = await ethers.getContractFactory(
    "VehicleTitleNft"
  );
  // Start deployment, returning a promise that resolves to a contract object
  const VehicleTItleNft = await VehicleTItleNftFactory.deploy();
  console.log("Contract deployed to address:", VehicleTItleNft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
