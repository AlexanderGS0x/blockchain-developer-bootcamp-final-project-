# A Blockchain based car marketplace

A distributed, ad-free marketplace that allows people to buy and sell cars in a similar way to how an nft marketplace works. The car's title will be a minted nft, while the associated metadata will be deployed to ipfs.

Users will interact with a traditional web client (react) that will display the metadata for all available cars for sale. These metadata are associated to a car title nft on the public blockchain.

Web client will interact with a traditional web api (express) that will handle all the api secrets, and will interact with the blockchain directly via smart contract abi (hardhat).

Smart contracts will handle business logic associated with escrow funds and transfering ownership of nfts.

### The Problem

Car titles are easily fraudulent, and leads to risky purchases and exchanges. A marketplcae to buy and sell items is an ideal application of blockchain technologies. Deploying car titles to a public ledger would allow these transactions to be validated via ethereum's PoW consenus mechanism.

Users should be able to upload items they want to sell. Each item will effectively be an nft, created by a smart-contract that publishes the sales listing to the public blockchain. The posting will have a starting value, and a set expiration time whereby it can accept "bids" for the item being sold.

- User uploads a sales listing, minting an nft in the process. Only allow new nft's to be minted if an nft doesn't already exist for a vehicle's vin (consult oracle?)
- NFT meta-data will be queried from the blockchain via graph protocol to render out the sales listing on the front end client via web api
- On a successful bid, funds will be held in escrow until the product has been confirmed by both parties to have shifted hands.

## Smart Contracts

This dApp will be backed by 2-3 smart contracts

1. VehicleTitleNft - nft representing the ownership of an item on the blockshain, linking to metadata on ipfs, via Pinata sdk
2. VehicleMarketPlace = smart contract where users can enter into bids for a vehicle (or, more accurately its nft title). Smart contract will hold title and funds in escrow until both seller and buyer approve transaction
3. VehicleMintOracle - stretch goal. NFT titles should only be minted if one doesn't already exist for an existing VIN number. For used cars, the owner of the contract must be the existing owner of the vehicle.

## Tech Stack:

- Web Client: [React](https://reactjs.org/)
- Web API: [Express](https://expressjs.com/)
- Blockchain API: [The Graph](https://thegraph.com/en/)
- Blockchain Toolkit: [Hardhat](https://hardhat.org/)
- Blockchain Observability: [Alchemy](https://docs.alchemy.com/alchemy/)
- NFT Contract Library: [Open Zeppelin](https://openzeppelin.com/)
- NFT metadata distro: [Pinata](https://www.pinata.cloud/)
