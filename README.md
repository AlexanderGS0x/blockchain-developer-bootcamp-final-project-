# BootstrapNFT - A Full-stack NFT factory [React, Express, Solidity]

### Quick Links:

1. [Getting Started](https://github.com/gambinish/blockchain-developer-bootcamp-final-project/blob/main/DOCS.md)
2. [Design Pattern Decisions](https://github.com/gambinish/blockchain-developer-bootcamp-final-project/blob/main/design_pattern_decisions.md)
3. [Avoiding Common Attacks](https://github.com/gambinish/blockchain-developer-bootcamp-final-project/blob/main/avoiding_common_attacks.md)
4. [Demo Walkthrough]()
5. [Running Tests](https://github.com/gambinish/blockchain-developer-bootcamp-final-project/blob/main/DOCS.md#running-tests)

This project scaffolds a full stack Web2/Web3 integration.

Hosted on Heroku: https://gentle-citadel-30423.herokuapp.com/

I wanted to illustrate to my team how we can extend our existing stack (Node.js/React) into the Web3 space. I am still trying to improve and iterate on this.

This spins up a distributed "marketplace", that essentially works as a CRUD app on the [Ropsten](https://ropsten.etherscan.io/) ethereum testnet. It allows `wallets` to buy (read) and sell (write) digital items with Ropsten ETH in a similar way to how an NFT marketplace works. To me, in many ways this feels like a traditional API, only that it's monetized, doesn't have a database, and instead writes directly to the blockchain. Solidity instead of SQL. In order for this to work in the "real world" these NFTs would need to represent something valuable in order for the dApp to function properly. You'll notice some naming conventions that are car-related, but they could easily be collectibles, or information that should be exclusive (fashion, gaming pre-releases, concert tickets). Each token will be a minted NFT, while the associated metadata will be deployed to [IPFS](https://ipfs.io/), a distributed file hosting service. They can then be bought and sold via the marketplace, which is a smart contract that handles the transfer of funds between wallets.

For the purposes of testing this dApp, there are not restrictions to what kind of asset you upload and create an NFT out of. However, I would eventually like to create some guardrails that prevent things like NSFW assets from being uploaded, or even calling an oracle to verify that the asset being uploaded is in fact a car (or another asset class for a prospective client).

_File Structure_

Users will interact with a Web2 client (React), that will display the metadata for all available NFTs for sale. These metadata are associated to an NFT on the blockchain. The client server is located in the `client` directory.

Web client will interact with a Web2 API (Express) that will protect secrets, and will handle smart contract deployments, tests, and smart contract compilation. Ideally this can be further secured, but it might be useful in the future for handling things that blockchain may not be ideally suited for (push notifications, chat, etc). The API server is located in the `api` directory.

Smart contracts will handle business logic associated with escrow funds and transfering ownership of NFTs. There is no database! 🎉

See `design_pattern_decisions.md` for more details on why certain architecutre and design pattern decisions were made.

_Architecture Reasoning_

While the web2 api server may seem unecessary (everything can simply live in the client), I feel like there is still some value in having a separation of concerns between the client and server, and would be beneficial long-term from a security and scalability perspective. I have always been a fan of distributed microservice architecture, and wanted to emulate that as much as possible in this project. I feel like a microservice system design pairs nicely with the tennets of distributed blockchain architecture. Should this scale, it's very possible that we may need to begin tacking on services that blockchains may not yet be ideally suited for, and I feel having this separation of concerns would help to make that process a bit more manageable.

Both the `client` and `api` directories have their own `.env` files. These are secured on the server, but can be replicated locally if spinning up a local chain for development. I would love to make this process a bit more automated, as it's currently a bit of a manual process (see `Getting Started` for local development setup).

## Logic

Wallets (ie "users") should be able to upload items they want to sell. Each item will be an NFT. NFTs are minted via smart-contract `NFT.sol`, and published the to the blockchain. These NFTs will have a starting `price`, a boolean representing the item being `sold`, a `wallet_public_key` and `token`, and made available for other wallets to purchase on the network via a marketplace smart contract `NFTMarket.sol`. NFTs can be purchased from the marketplace. Purchased NFTs can have their price modified, and relisted back into the marketplace. This flow can generate profits (or losses) as funds from purchases are transfered between wallets via the marketplace smart contract.

- User uploads an asset on the `Dashboard`, and can `Generate NFT`, minting a unique NFT in the process.
- NFT metadata will be queried from the blockchain to render out the sales listing on the marketplace
- On a successful purchase, funds will be held in escrow until the smart contract is cleared and approved before being transferred between wallets.

## Smart Contracts

This dApp will be backed by 2 smart contracts

1. `NFTMarket.sol` - NFT representing the ownership of an item on the blockchain, linking to metadata on ipfs, via Pinata sdk
2. `NFT.sol` = Smart contract where users can enter buy/sell an NFT. Smart contract will hold title and funds in escrow until transaction is approved via MetaMask.

## Tech Stack:

- Web Client: [React](https://reactjs.org/)
- Web API: [Express](https://expressjs.com/)
- Blockchain SDK: [Hardhat](https://hardhat.org/)
- NFT Contract Library: [Open Zeppelin](https://openzeppelin.com/)
- NFT metadata distro: [IPFS](https://ipfs.io/)

Wallet Support:

- MetaMask

Chain Support:

- Ropsten

_Next Steps that have not been implemented for this final project [TODO]_

- Refactor to use the Graph
- Schedule an air-drop of `registration_notice` to each of the wallets that purchased and owns an NFT. Imagine if this were a shopify marketplace code, or tickets to a festival.
- Oracle to validate that assets are of a certain type. Potentially calling a computer vision api.
- DAO members vote on whether or not an asset should be uploaded via multi-sig smart contract.
- Chainlink Oracle + Chromata api to enable randomized generative art for the NFTs.
