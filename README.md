# BootstrapNFT - A Full-stack NFT factory [React, Express, Solidity]
### 🚧 This repo is under construction 🚧

This project scaffolds a full stack Web2/Web3 integration.

The purpose is to illustrate how we can extend our existing stack into the Web3 space. I am still trying to improve and iterate on this.

This spins up a distributed "marketplace", that essentially acts as a CRUD app with the [Polygon](https://polygon.technology/) layer 2 blockchain protocol. It allows `wallets` to buy (read) and sell (write) in a similar way to how an NFT marketplace works. In many ways it's like a traditional API, only without a database, and instead writies directly to the blockchain. Solidity instead of SQL. These NFTs would need to represent something valuable in order for the dApp to function properly. In this case we will mock car titles as the NFT for simplicity, but they could easily be collectibles, or information that should be exclusive (fashion, gaming pre-releases, concert tickets). Each token will effectivley be a minted NFT, while the associated metadata will be deployed to [IPFS](https://ipfs.io/), a distributed file hosting service.

*Stretch Goal:*

Schedule an air-drop of `registration_notice` to each of the wallets that purchased and owns an NFT. Imagine if this were a shopify marketplace code, or tickets to a festival.

Users will interact with a Web2 client (React), that will display the metadata for all available car NFTs for sale. These metadata are associated to a car NFT on the blockchain (information about the car, file with generative car title [TODO].

Web client will interact with a Web2 API (Express) that will handle all the secrets, and will interact with the blockchain directly via smart contract abi (hardhat). Must be further secured, but might be useful for handling things like email, chat, and push notifications.

Smart contracts will handle business logic associated with escrow funds and transfering ownership of NFTs.

## Logic

Users should be able to upload items they want to sell. Each item will be an NFT. Mint NFT via smart-contract, and publish the sale to the blockchain. The NFT will have a starting `value`, a boolean representing the item being `sold`, a `wallet_public_key` and `token`.

- User uploads a sales listing (idea: then send to Chainlink oracle for generative NFT), minting a unique NFT in the process.
- NFT metadata will be queried from the blockchain via Graph protocol [TODO] to render out the sales listing via Web2 api
- On a successful bid, funds will be held in escrow until the product has been confirmed by both parties to have shifted hands.

## Smart Contracts

This dApp will be backed by 2-3 smart contracts

1. VehicleTitleNft - NFT representing the ownership of an item on the blockchain, linking to metadata on ipfs, via Pinata sdk
2. VehicleMarketPlace = Smart contract where users can enter buy/sell a vehicle (or, more accurately it's NFT). Smart contract will hold title and funds in escrow until both seller and buyer approve transaction via MetaMask.
3. VehicleMintOracle - stretch goal. NFT titles should only be minted if one doesn't already exist for an existing VIN number. For used cars that don't yet have minted nft's on-chain, the owner of the contract must verified to be the existing owner of the vehicle title.

## Tech Stack:

- Web Client: [React](https://reactjs.org/)
- Web API: [Express](https://expressjs.com/)
- Blockchain API: [The Graph](https://thegraph.com/en/) [TODO]
- Blockchain SDK: [Hardhat](https://hardhat.org/)
- Blockchain Observability: [Alchemy](https://docs.alchemy.com/alchemy/) [TODO]
- NFT Contract Library: [Open Zeppelin](https://openzeppelin.com/)
- NFT metadata distro: [IPFS](https://ipfs.io/)

Wallet Support:
- MetaMask

Chain Support:
- Polygon

TODO:

* Create custom `useWalletSigner` hook to abstract, and consolidate logic.
* Finalize `relist` Solidity function
* Integrate Chainlink oracle to generate randomness. Resource: [Chromata](https://www.michaelbromley.co.uk/experiments/chromata/). This would be great to have a designer for :)
* Refactor to use The Graph
* Tests...
* Airdrop
* Terraform?
