# blockchain-developer-bootcamp-final-project

## A Blockchain based Vaccination Passport

A distributed ledger to validate vaccination records in the form of a `passport`, and allow users to vote on related changes to vaccination policies as a DAO. Meant to help with developing international and de-politicized vaccination policies related to battling Covid-19 that is both effective and ethical in a distributed way. Can also help to promote a rewards system to promote the agreed upon policy.

> This is a work-in-progress document, and changes and suggestions are more than welcome!

## Problem

Vaccination status in the United States has become quite the political football, and local and national governments are having difficulty coming to any form of unified policy for evaluating and validating an individual's vaccination status. Vaccine policies are being rolled out in a hap-hazard way, as the federal government issues continually stricter (and more divisive) vaccine mandates for government workers. At the same time policies at the state level range from everything from strict vaccine verification to a complete removal of all mandates or proofs of vaccination.

As the world works toward reopening, many institutions are questioning whether they should require citizens to obtain vaccine passports. Fradulent "passports" are a real concern, as there is no unified policy, or proof of vaccination records. The best we have is an easily forged paper card. Some institutions have quickly developed QR code based web 2.0 health evidence systems as a source of truth for these records.

My key concerns with these approaches are:

1. Privacy: Health records being stored in a centralized application can be seen as a breach of personal information, and therefore raises concerns, especially from a HIPAA perspective. A Dapp can encrypt sensitive personal information like social security numbers or other identifying factors in a distributed ledger.
2. Security: Similar to above, health information can be hacked, and leaked in a centralized system, and can be more safely stored in a distributed blockchain.
3. Vaccine policies are being issued in a top-down manner (federal, state, corporate governance), without consensus of the people actually involved and most directly impacted by their decision to get/forgo getting the vaccine.
4. Vaccine passports can be easily forged, making any sort of policy ineffective. 

## Purpose

Establish a DAO that enables users to determine ethical and inclusive vaccination policies. Users can execute smart contracts on the blockchain once getting vaccinated or receiving a positive/negative test at an approved center that can be verified _worldwide_.

Users will be able to vote on establishing a unified set of rules/rewards system in a bottom-up fashion, rather than mandates being issued top-down.

Vaccination status will be hashed as a transaction in a `passport` on the blockchain. The vaccination `passport` could also contain a record of past infections, negative test results, and could also provide a digital vaccination certificate that has been validated on the blockchain.

Digital vaccination passport is issued upon request from approved facilities worldwide (should this be voted on?). It is recorded on the public blockchain, then the entity mints an nonfungible token (NFT) `passport` and links it to a user's phone/personal device via QR code, or maybe some kind of biomtetrc scan.

## User Flow / MVP

- User gets vaccination/tested at an approved facility
- Approved facility records a transaction on the blockchain, with the user's vaccination/test results
- Institution mints an NFT that is linked to a user's wallet, and accesible via QR code or biometric scan

- Vaccination policies can be voted on in DAO distributed consensus. A reward system can also be voted on to promote agreed upon policy.


## Issues

My understanding of certain aspects of this project are still rudimentary, and I am a bit unsure how to implement certain parts of this.

1. How are "approved facilities" vetted for legitimacy? Can they go through a traditional onboarding process, or should they be voted on?
2. If a user gets a vaccine, get an NFT minted and connected to their wallet, can they then update that NFT once they get a second vaccination?
3. Should a rewards system be put in place? Will a token be necesary for this?
4. Would the passport effecitvely just be a wallet?

