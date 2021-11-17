# Getting Started

This requires a working knowledge of [MetaMask](https://docs.metamask.io/guide/) and [HardHat](https://hardhat.org/getting-started/).

## Development Environment

#### Terminal One:
```
cd client && npm install
npm start
```

#### Terminal Two:

```
cd api && npm run dev-chain
```

> Do not close this window. This spins up a development chain with several provisioned accounts. You should import these accounts into your MetaMask development account (Primary wallet strongly not advised). Use these accounts to interact with the dApp

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
