# blockchain-developer-bootcamp-final-project

## A Blockchain based car marketplace

A distributed, ad-free marketplace that allows people to buy and sell cars in a similar way to how an nft marketplace works. The car's title will be a minted nft, while the associated metadata will be deployed to ipfs.

> This is a work-in-progress document, and changes and suggestions are more than welcome!

## Problem

Car titles are easily fraudulent, and leads to risky purchases and exchanges. A marketplcae to buy and sell items is an ideal application of blockchain technologies. Deploying car titles to a public ledger would allow these transactions to be validated via ethereum's PoW consenus mechanism. 

## Purpose

Proof of concept that illustrates how an nft can represent the ownership of a vehicle, and enable it to be bought and sold on a distributed marketplace.

## User Flow / MVP

Users should be able to upload items they want to sell. Each item will effectively be an nft, created by a smart-contract that publishes the sales listing to the public blockchain. The posting will have a starting value, and a set expiration time whereby it can accept "bids" for the item being sold.

- User uploads a sales listing, minting an nft in the process. Only allow new nft's to be minted if an nft doesn't already exist for a vehicles vin (consult oracle?)
- NFT meta-data will be queried from the blockchain via graph protocol to render out the sales listing on the front end (react)
- On a successful bid, funds will be held in escrow until the product has been confirmed by both parties to have shifted hands.

## Tech Stack:

- Web Client: [React](https://reactjs.org/)
- Web API: [Express](https://expressjs.com/)
- Blockchain API: [The Graph](https://thegraph.com/en/)
- Blockchain Toolkit: [Hardhat](https://hardhat.org/)
- Blockchain Observability: [Alchemy](https://docs.alchemy.com/alchemy/)
- NFT Contract Library: [Open Zeppelin](https://openzeppelin.com/)

