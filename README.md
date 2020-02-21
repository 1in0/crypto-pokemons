# Crypto-Pokemons

An application that allows to purchase and sell crypto-pokemon cards and let them fight and breed.

## Features

- Purchase & Sell virtual cards
- Specify & design a battle logic
- Trading, sharing & ownership logic.
- Different cyptomons should be campatible to breed & create new cryptomons.
- While they are breeding, they cannot fight. If they are attacked, breeding may fail.

Web3 used to exchange transactions.

## Frontend requirements:

- Manages user’s account (private key safely generated & stored).
- Account address & balance shown.
- User is able to read the contents of the Cyptomons contract
- User is able to issue signed transactions.
- Results presented to the user.
- Allow user to execute all functionality offered by smart contract.

## Contract requirements:

- Every Cryptomon card should be uniquely identified
- Its ownership is clearly specified in the contract.
- User should be able to trade cards at an agreed price.
- Basic fighting mechanism.
    - 2 Properties: HP and ATK to each card.
    - HP is reduced by ATK of the opponent in a fighting round
- Design a breeding mechanism.
    - Properties inherited to children.
- User able to verify properties and states of any Cryptomons.
- Game logic should be secure.
    - Transactions are atomic.
    
# Installation Guide
```
ganache-cli --gasLimit=0x1fffffffffffff --allowUnlimitedContractSize -e 1000000000
truffle migrate
npm start
```

Transfer the JSON contract into the /crypto-pokemon/src/contracts/

Change the ABI Address to your built one in `Config.js`


Reference: https://github.com/1in0/crypto-pokemons
