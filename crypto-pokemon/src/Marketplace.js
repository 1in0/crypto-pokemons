import {Container} from 'react-bootstrap';
import React, { Component } from "react";
import MarketplaceTable from './MarketplaceTable';
import PokemonNavbar from "./components/PokemonNavbar";

class Marketplace extends Component {

  // state = { storageValue: 0, web3: null, accounts: null, contract: null };


  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();
  //     // Get the contract instance.
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = PokemonCardFactory.networks[networkId];
  //     var address;
  //     if (deployedNetwork && deployedNetwork.address) {
  //       address = deployedNetwork.address;
  //     } else {
  //       address = "0x7de19b161b1c1eb8f92d9d642606db92324e6f0f";
  //     }
  //     const instance = new web3.eth.Contract(
  //         PokemonCardFactory.abi,
  //         address,
  //     );
  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts, contract: instance }, this.getAllMarketPokemon);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     console.error(error);
  //   }
  // };

  // getAllMarketPokemon = async () => {
  //   const { accounts, contract } = this.state;
    
  // };


	render() {
		return (
        <div className="Marketplace">
          <PokemonNavbar/>
          <Container>
          	<br/>
          	<h2> Marketplace </h2>
            <MarketplaceTable />
          </Container>
        </div>
		)
	}

}

export default Marketplace;