import React, { Component } from "react";
import PokemonCardMarketplace from "./contracts/PokemonCardMarketplace.json";
import getWeb3 from "./getWeb3";
import {Container} from 'react-bootstrap';
import PokemonNavbar from "./components/PokemonNavbar";
import StarterPokemonForm from "./StarterPokemonForm";
import MyTeam from "./MyTeam";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, newTrainer: false, ownedPokemons: [], ownedPokemonsInfo: [] };

  constructor(props) {
    super(props);
    console.log(props);
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
        address = "0x7de19b161b1c1eb8f92d9d642606db92324e6f0f";
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
    const response = await contract.methods.getPokemonCardsByOwner().call();
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

  getPokemonInfo = async(pokemonId) => {
    const { accounts, contract, ownedPokemonsInfo } = this.state;

    const response = await contract.methods.getPokemonInfo(pokemonId).call();
    const breedingInfo = await contract.methods.getPokemonBreedingDetails(pokemonId).call();
    const battleInfo = await contract.methods.getPokemonBattleDetails(pokemonId).call();
    const stats = await contract.methods.getPokemonStats(pokemonId).call();

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
      speeed: speed
    }

  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    } else if (!!!this.state.newTrainer && this.state.ownedPokemons.length!==0 && this.state.ownedPokemonsInfo.length!==0){
      return (
        <div className="App">
          <PokemonNavbar/>
          <Container> 
            <MyTeam pokemonOwned={this.state.ownedPokemonsInfo} />
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