# Getting Started

In order to run this project locally, these are the steps to take. This doc will walkthrough how to compile and test contracts, as well as spin up the project for local interaction and development. This will require a working knowledge of [MetaMask](https://docs.metamask.io/guide/) and [HardHat](https://hardhat.org/getting-started/).

I suggest opening up four terminal windows at minimum for ease of use, although you may find it helpful to have more.

## Development Environment

#### Terminal One:

This will be where we will spin up our api server.

```
cd api && npm install
cp .env.example .env
```

Keep this terminal open for later.

#### Terminal Two:

```
cd api && npm run local-node
```

Keep this terminal open for later.

> Do not close this window. This spins up a development chain with several provisioned accounts. You should now connect your metamask wallet to this local blockchain network, and then import at least two of these accounts into your MetaMask development/"burner" wallet (Primary wallet strongly not advised). Use these accounts to interact with the dApp. You can learn how to import these development accounts from hardhat into metmask [here](https://hardhat.org/getting-started/#connecting-a-wallet-or-dapp-to-hardhat-network)

#### Terminal Three:

`cd api && npm run dev-contracts`

> Take these public keys and use them in terminal four

#### Terminal Four:

`cd api && touch .env`

> Populate blockchain keys and other API secrets

```
npm install

npm start
```

## Architecture

[Enter Screenshot here]

Decribe application architecture [TODO]
