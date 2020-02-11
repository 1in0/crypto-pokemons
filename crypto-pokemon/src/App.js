import React, { Component } from "react";
import PokemonCardMarketplace from "./contracts/PokemonCardMarketplace.json";
import getWeb3 from "./getWeb3";
import {Container} from 'react-bootstrap';
import PokemonNavbar from "./components/PokemonNavbar";
import StarterPokemonForm from "./StarterPokemonForm";
import MyTeam from "./MyTeam";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null, newTrainer: false, ownedPokemons: [], ownedPokemonsInfo: [] };

  constructor(props) {
    super(props);
    this.handleTrainerChange = this.handleTrainerChange.bind(this);
  }

  handleTrainerChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    });
  }

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
        address = "0xA8955bf400e5c45FE2dd88fE72bFC5eb5E9A2d9e";
      }
      const instance = new web3.eth.Contract(
          PokemonCardMarketplace.abi,
          address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.checkNewTrainer);
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
    }
  };

  checkNewTrainer = async () => {
    const { accounts, contract } = this.state;

    const response = await contract.methods.isNewTrainer().call(
      {from: accounts[0]});
    this.returnArrayOfPokemonOwned();
    this.setState({ newTrainer: response });
  };

  createStarterPokemon = async(nickname, pokemonNumber) => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.createStarterPokemon(nickname, pokemonNumber).send(
      {from: accounts[0]},
      ).then(function(res){
        console.log("createStarterPokemon " + res);
      });
    console.log("createStarterPokemon " + response);
  }

  returnNumberOfPokemons = async() => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.returnNumberOfPokemons().call();
    console.log("returnNumberOfPokemons " + response);
  }

  returnArrayOfPokemonOwned = async() => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.getPokemonCardsByOwner().call(
      {from: accounts[0]},
      );
    if (!!response) {
      this.setState({ ownedPokemons: response });

      var i;

      for (i = 0; i < response.length; i++) {
        let currentPokemonId = response[i];
        console.log("currentPokemonId " + currentPokemonId);
        const currentPokemon = await this.getPokemonInfo(currentPokemonId);
        const { ownedPokemonsInfo } = this.state;
        if (!!currentPokemon) {
          ownedPokemonsInfo.push(currentPokemon);
          this.setState({ ownedPokemonsInfo: ownedPokemonsInfo });
        }
      }
    }
    return response;
  }

  sellPokemon = async(pokemonId, price) => {
    const { accounts, contract } = this.state;
    const priceInEther = this.state.web3.utils.toWei(price, "ether");
    const amountToSend = this.state.web3.utils.toWei("1.5", "ether");
    const response = await contract.methods.createItem(pokemonId, priceInEther).send(
      {from: accounts[0], value:amountToSend}
      ).then(function(res){
        console.log("sellPokemon " + res);
      });
    console.log("sellPokemon " + response);
  }

  getPokemonInfo = async(pokemonId) => {
    const { accounts, contract, ownedPokemonsInfo } = this.state;

    const response = await contract.methods.getPokemonInfo(pokemonId).call();
    const breedingInfo = await contract.methods.getPokemonBreedingDetails(pokemonId).call();
    const battleInfo = await contract.methods.getPokemonBattleDetails(pokemonId).call();
    const stats = await contract.methods.getPokemonStats(pokemonId).call();
    const isSelling = await contract.methods.isSelling(pokemonId).call();
    const isPregnant = await contract.methods.isPregnant(pokemonId).call();
    const breedReady = await contract.methods.isReadyToBreed(pokemonId).call();

    const nickname = response["0"];
    const pokemonName = response["1"];
    const type1 = response["2"];
    const type2 = response["3"];
    const level = response["4"];
    const pokemonNumber = response["5"];
    const legendary = response["6"]

    const breedingReadyTime = breedingInfo["0"];
    const gender = breedingInfo["1"];
    const fatherId = breedingInfo["2"];
    const motherId = breedingInfo["3"];
    const breedingWithId = breedingInfo["4"];

    const battleReadyTime = battleInfo["0"];

    const hp = stats["0"];
    const attack = stats["1"];
    const defense = stats["2"];
    const specialAttack = stats["3"];
    const specialDefense = stats["4"];
    const speed = stats["5"]

    return {
      pokemonId: pokemonId,
      nickname: nickname,
      pokemonName: pokemonName,
      type1: type1,
      type2: type2,
      level: level,
      pokemonNumber: pokemonNumber,
      legendary: legendary,
      breedingReadyTime: breedingReadyTime,
      gender: gender,
      fatherId: fatherId,
      motherId: motherId,
      breedingWithId: breedingWithId,
      battleReadyTime: battleReadyTime,
      hp: hp,
      attack: attack,
      defense: defense,
      specialAttack: specialAttack,
      specialDefense: specialDefense,
      speeed: speed,
      isSelling: isSelling,
      isPregnant: isPregnant,
      breedReady: breedReady
    }

  }

  takeOffMarket = async(pokemonId) => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.takeOffMarketWithPokemonId(pokemonId).send(
      {from: accounts[0]}
      ).then(function(res){
        console.log("takeOffMarket " + res);
      });
    console.log("takeOffMarket " + response);
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    } else if (!!!this.state.newTrainer && this.state.ownedPokemons.length!==0 && this.state.ownedPokemonsInfo.length!==0){
      return (
        <div className="App">
          <PokemonNavbar/>
          <Container> 
            <MyTeam pokemonOwned={this.state.ownedPokemonsInfo} handlePokemonSell={this.sellPokemon} handleTakeOffMarket={this.takeOffMarket} account={this.state.accounts[0]}/>
          </Container>
        </div>
      );
    } else if (!!this.state.newTrainer) {
      return (
        <div className="App">
          <PokemonNavbar/>
          <Container> 
            <StarterPokemonForm handleChange={this.handleTrainerChange} handleSubmit={this.createStarterPokemon}/>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="App">
          <PokemonNavbar/>
        </div>
      );
    }


  }
}

export default App;