import {Container} from 'react-bootstrap';
import React, { Component } from "react";
import MarketplaceTable from './MarketplaceTable';
import PokemonNavbar from "./components/PokemonNavbar";

class Marketplace extends Component {

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