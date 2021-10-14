# blockchain-developer-bootcamp-final-project

## A Blockchain based Offer-up/Craigslist/ebay clone

A distributed, ad-free marketplace that allows people to buy and sell second-hand items in a similar way to how an nft marketplace works.

> This is a work-in-progress document, and changes and suggestions are more than welcome!

## Problem

Centralized marketplaces are typically loaded with ads, and user data is collected and bartered off for ad-revenue. A marketplcae to buy and sell items is an ideal application of blockchain technologies.

## Purpose

Users should be able to upload items they want to sell. Each item will effectively be an nft, created by a smart-contract that publishes the sales listing to the public blockchain. The posting will have a starting value, and a set expiration time whereby it can accept "bids" for the item being sold.

## User Flow / MVP

- User uploads a sales listing, minting an nft in the process.
- NFT meta-data will be queried from the blockchain via graph protocol to render out the sales listing on the front end (react/next.js)
- On a successful bid, funds will be held in escrow until the product has been confirmed by both parties to have shifted hands.

