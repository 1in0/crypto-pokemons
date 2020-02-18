import {Container} from 'react-bootstrap';
import React, { Component } from "react";
import ExploreTable from './ExploreTable';
import PokemonNavbar from "./components/PokemonNavbar";

import PokemonCardMarketplace from "./contracts/PokemonCardMarketplace.json";
import getWeb3 from "./getWeb3";
import POKEMON_MARKETPLACE_ADDRESS from "./Config";

class Explore extends Component {

  state = { storageValue: 0, 
            web3: null, 
            accounts: null, 
            contract: null, 
            exploreItems: [], 
            exploreItemsInfo: [],
            ownedPokemons: [] };

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
      this.setState({ web3, accounts, contract: instance }, this.returnArrayOfExplorePokemonInfo);
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
    }
  };

  returnArrayOfExplorePokemonInfo = async() => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.getAllPokemonCards().call(
      {from: accounts[0]});
    if (!!response) {
      this.setState({ exploreItems: response });

      var i;
      for (i = 0; i < response.length; i++) {
        let pokemonId = response[i];
        const currentPokemon = await this.getPokemonInfo(pokemonId);
        const { exploreItemsInfo } = this.state;
        if (!!currentPokemon) {
          exploreItemsInfo.push(currentPokemon);
          this.setState({ exploreItemsInfo: exploreItemsInfo });
        }
      }
    }
    this.returnArrayOfPokemonOwned();
    return response;
  }

  getPokemonInfo = async(pokemonId) => {
    const { accounts, contract, exploreItemsInfo } = this.state;

    const response = await contract.methods.getPokemonInfo(pokemonId).call();
    const stats = await contract.methods.getPokemonStats(pokemonId).call();
    const owner = await contract.methods.ownerOf(pokemonId).call();

    const nickname = response["0"];
    const pokemonName = response["1"];
    const type1 = response["2"];
    const type2 = response["3"];
    const level = response["4"];
    const pokemonNumber = response["5"];

    const hp = stats["0"];
    const attack = stats["1"];
    const defense = stats["2"];
    const specialAttack = stats["3"];
    const specialDefense = stats["4"];
    const speed = stats["5"]

    return {
      owner: owner,
      pokemonId: pokemonId,
      nickname: nickname,
      pokemonName: pokemonName,
      type1: type1,
      type2: type2,
      level: level,
      pokemonNumber: pokemonNumber,
      hp: hp,
      attack: attack,
      defense: defense,
      specialAttack: specialAttack,
      specialDefense: specialDefense,
      speed: speed
    }
  };

  returnArrayOfPokemonOwned = async() => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.getPokemonCardsByOwner().call(
      {from: accounts[0]},
      );
    if (!!response) {
      var i;
      for (i = 0; i < response.length; i++) {
        let currentPokemonId = response[i];
        const currentPokemon = await this.getPokemonInfo(currentPokemonId);
        if (!!currentPokemon) {
          const { ownedPokemons } = this.state;
          ownedPokemons.push(currentPokemon);
          this.setState({ ownedPokemons: ownedPokemons });
        }
      }
    }
    return response;
  };

  handleBattleBetweenPokemon = async(pokemonId, enemyPokemonId) => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.attack(pokemonId, enemyPokemonId).send(
      {from: accounts[0]},
      );
    return response;
  }

	render() {
		return (
        <div className="Explore">
          <PokemonNavbar/>
          <Container>
          	<br/>
          	<h2> Explore </h2>
            {
              !!this.state.web3 && this.state.exploreItems.length !== 0 &&
            <ExploreTable exploreItems={this.state.exploreItemsInfo} 
                              account={this.state.accounts[0]} 
                              ownedPokemons={this.state.ownedPokemons}
                              handleBattleBetweenPokemon={this.handleBattleBetweenPokemon}
                              web3={this.state.web3}
                              contract={this.state.contract}
                              />
            }

          </Container>
        </div>
		)
	}

}

export default Explore;