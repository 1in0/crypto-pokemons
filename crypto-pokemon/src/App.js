import React, { Component } from "react";
import PokemonCardMarketplace from "./contracts/PokemonCardMarketplace.json";
import getWeb3 from "./getWeb3";
import {Container} from 'react-bootstrap';
import PokemonNavbar from "./components/PokemonNavbar";
import StarterPokemonForm from "./StarterPokemonForm";
import MyTeam from "./MyTeam";
import POKEMON_MARKETPLACE_ADDRESS from "./Config";

import "./App.css";

class App extends Component {
  state = { web3: null,
            accounts: null, 
            contract: null, 
            newTrainer: false, 
            ownedPokemons: [], 
            ownedPokemonsInfo: [],
            pendingWithdrawal: 0,
            malePokemonOwned: [],
            femalePokemonOwned: [],
            pregnantPokemonOwned: []
         };

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
        address = POKEMON_MARKETPLACE_ADDRESS;
      }
      const instance = new web3.eth.Contract(
          PokemonCardMarketplace.abi,
          address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.getTrainerInfo);
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
    }
  };

  getTrainerInfo = async () => {
    const { accounts, contract } = this.state;

    const response = await contract.methods.isNewTrainer().call(
      {from: accounts[0]});
    const pendingWithdrawal = await contract.methods.getPendingWithdrawals().call(
      {from: accounts[0]});
    const pendingWithdrawalInEther = this.state.web3.utils.fromWei(pendingWithdrawal, "ether");
    this.returnArrayOfPokemonOwned();
    this.setState({ newTrainer: response, pendingWithdrawal: pendingWithdrawalInEther});
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
        const currentPokemon = await this.getPokemonInfo(currentPokemonId);
        const { ownedPokemonsInfo } = this.state;
        if (!!currentPokemon) {
          ownedPokemonsInfo.push(currentPokemon);
          this.setState({ ownedPokemonsInfo: ownedPokemonsInfo });
          if (!!currentPokemon.gender) {
            const {malePokemonOwned} = this.state;
            malePokemonOwned.push(currentPokemon);
            this.setState({malePokemonOwned: malePokemonOwned});
          } else {
            const {femalePokemonOwned} = this.state;
            femalePokemonOwned.push(currentPokemon);
            this.setState({femalePokemonOwned: femalePokemonOwned});
          }
          if (!!currentPokemon.isPregnant) {
            const {pregnantPokemonOwned} = this.state;
            pregnantPokemonOwned.push(currentPokemon);
            this.setState({pregnantPokemonOwned: pregnantPokemonOwned});
          }
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
    let breedingTimeRemaining = 0;
    if (!!isPregnant) {
      breedingTimeRemaining = await contract.methods.getBreedingTimeRemaining(pokemonId).call(
        {from: this.state.accounts[0]});
    }
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
      breedReady: breedReady,
      breedingTimeRemaining: breedingTimeRemaining
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

  handleWithdrawal = async() => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.withdraw().send(
      {from: accounts[0]}
      ).then(function(res){
        console.log("handleWithdrawal " + res);
      });
    console.log("handleWithdrawal " + response);
    this.setState({pendingWithdrawal: 0})
  }

  handleBuyStarterPack = async() => {
    const { accounts, contract } = this.state;
    const amountToSend = this.state.web3.utils.toWei("1.5", "ether");
    const response = await contract.methods.buyStarterPack().send(
      {from: accounts[0], value:amountToSend}
      ).then(function(res){
        console.log("handleBuyStarterPack " + res);
      });
    console.log("handleBuyStarterPack " + response);
  }

  breedWith = async(motherId, fatherId) => {
    const { accounts, contract } = this.state;
    const amountToSend = this.state.web3.utils.toWei("1.5", "finney");
    const response = await contract.methods.breedWith(motherId, fatherId).send(
      {from: accounts[0], value:amountToSend}
      ).then(function(res){
        console.log("breedWith " + res);
      });
    console.log("breedWith " + response);
  }

  giveBirth = async(motherId) => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.giveBirth(motherId).send(
      {from: accounts[0]}
      ).then(function(err, res){
        console.log("giveBirth " + res);
        return res;
      });
    console.log("giveBirth " + response);
    return response;
  }



  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    } else if (!!!this.state.newTrainer && this.state.ownedPokemons.length!==0 && this.state.ownedPokemonsInfo.length!==0){
      return (
        <div className="App">
          <PokemonNavbar/>
          <Container> 
            <MyTeam pokemonOwned={this.state.ownedPokemonsInfo} 
                    handlePokemonSell={this.sellPokemon} 
                    handleTakeOffMarket={this.takeOffMarket} 
                    account={this.state.accounts[0]} 
                    pendingWithdrawal={this.state.pendingWithdrawal}
                    handleWithdrawal={this.handleWithdrawal}
                    handleBuyStarterPack={this.handleBuyStarterPack}
                    malePokemonOwned={this.state.malePokemonOwned}
                    femalePokemonOwned={this.state.femalePokemonOwned}
                    breedWith={this.breedWith}
                    pregnantPokemonOwned={this.state.pregnantPokemonOwned}
                    giveBirth={this.giveBirth}
            />
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