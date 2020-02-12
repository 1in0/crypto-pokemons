import {Container} from 'react-bootstrap';
import React, { Component } from "react";
import MarketplaceTable from './MarketplaceTable';
import PokemonNavbar from "./components/PokemonNavbar";

import PokemonCardMarketplace from "./contracts/PokemonCardMarketplace.json";
import getWeb3 from "./getWeb3";
import POKEMON_MARKETPLACE_ADDRESS from "./Config";

class Marketplace extends Component {

  state = { storageValue: 0, web3: null, accounts: null, contract: null, marketplaceItems: [], marketplaceItemsInfo: [] };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PokemonCardMarketplace.networks[networkId];
      var address;
      if (deployedNetwork && deployedNetwork.address) {
        address = deployedNetwork.address;
      } else {
        address = POKEMON_MARKETPLACE_ADDRESS;
      }
      const instance = new web3.eth.Contract(
          PokemonCardMarketplace.abi,
          address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.returnArrayOfMarketPokemonInfo);
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
    }
  };

  getAllMarketPokemon = async () => {
    const { accounts, contract } = this.state;

    const response = await contract.methods.getAllMarketplaceItems().call(
      {from: accounts[0]});
    this.setState({ marketplaceItems: response });
  };

  returnArrayOfMarketPokemonInfo = async() => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.getAllMarketplaceItems().call(
      {from: accounts[0]});
    if (!!response) {
      this.setState({ marketplaceItems: response });

      var i;

      for (i = 0; i < response.length; i++) {
        let itemId = response[i];
        const currentPokemon = await this.getItemAndPokemonInfo(itemId);
        const { marketplaceItemsInfo } = this.state;
        if (!!currentPokemon) {
          marketplaceItemsInfo.push(currentPokemon);
          this.setState({ marketplaceItemsInfo: marketplaceItemsInfo });
        }
      }
    }
    return response;
  }

  getItemAndPokemonInfo = async(itemId) => {
    const { accounts, contract, ownedPokemonsInfo } = this.state;

    const response = await contract.methods.getItemAndPokemonInfo(itemId).call();
    const seller = response["0"];
    const pokemonId = response["1"];
    const price = response["2"];
    const pokemonNumber = response["3"];
    const nickname = response["4"];
    const type1 = response["5"];
    const hp = response["6"];
    const attack = response["7"]
    const defense = response["8"];
    const specialAttack = response["9"];
    const specialDefense = response["10"];
    const level = response["11"];
    const gender = response["12"];
    console.log(response);
    const priceInEther = this.state.web3.utils.fromWei(price, "ether");

    return {
      seller: seller,
      pokemonId: pokemonId,
      price: priceInEther,
      pokemonNumber: pokemonNumber,
      nickname: nickname,
      type1: type1,
      hp: hp,
      attack: attack,
      defense: defense,
      specialAttack: specialAttack,
      specialDefense: specialDefense,
      level: level,
      gender: gender
    }
  }

  buyPokemon = async(index) => {
    const itemId = this.state.marketplaceItems[index];
    const item = this.state.marketplaceItemsInfo[index];
    const { accounts, contract } = this.state;
    const amountToSend = this.state.web3.utils.toWei(item.price, "ether");
    const response = await contract.methods.buyItem(itemId).send(
      {from: accounts[0], value:amountToSend}
      ).then(function(res){
        console.log("buyPokemon " + res);
      });
    console.log("buyPokemon " + response);
  }

	render() {
		return (
        <div className="Marketplace">
          <PokemonNavbar/>
          <Container>
          	<br/>
          	<h2> Marketplace </h2>
            {
              !!this.state.web3 && this.state.marketplaceItems.length !== 0 &&
            <MarketplaceTable marketplaceItems={this.state.marketplaceItemsInfo} 
                              account={this.state.accounts[0]} 
                              buyPokemon={this.buyPokemon}/>
            }

          </Container>
        </div>
		)
	}

}

export default Marketplace;