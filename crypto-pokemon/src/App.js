import React, { Component } from "react";
import PokemonCardFactory from "./contracts/PokemonCardFactory.json";
import getWeb3 from "./getWeb3";
import {Button, Form, Container} from 'react-bootstrap';
import PokemonNavbar from "./components/PokemonNavbar";
import StarterPokemonForm from "./StarterPokemonForm";
import MyTeam from "./MyTeam";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, newTrainer: false };

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
      const deployedNetwork = PokemonCardFactory.networks[networkId];
      var address;
      if (deployedNetwork && deployedNetwork.address) {
        address = deployedNetwork.address;
      } else {
        address = "0x62fa1f2Eda9e1C1E3386Ccb40d49184ca6915F4f";
      }
      const instance = new web3.eth.Contract(
          PokemonCardFactory.abi,
          address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getPokemonName(1).call();

    const response2 = await contract.methods.isNewTrainer().call();
    // // Update state with the result.
    this.setState({ storageValue: response, newTrainer: response2 });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    } else if (!!!this.state.newTrainer){
      return (
        <div className="App">
          <PokemonNavbar/>
          <Container> 
            <MyTeam/>
          </Container>
        </div>
      );
    }

    return (
      <div className="App">
        <PokemonNavbar/>
        <Container> 
          <StarterPokemonForm handleChange={this.handleTrainerChange}/>
        </Container>
      </div>
    );
  }
}

export default App;