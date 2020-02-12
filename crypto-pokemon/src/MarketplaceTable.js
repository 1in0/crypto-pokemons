import {Table, Button} from 'react-bootstrap';
import React, { Component } from "react";

class MarketplaceTable extends Component {

	constructor(props) {
		super(props);
		this.handleBuy = this.handleBuy.bind(this);
	}


	handleBuy(event) {
		const {name, value} = event.target
		this.props.buyPokemon(value);
	};

	createTableBody = () => {
		let table = []
		for (let i = 0; i < this.props.marketplaceItems.length; i++) {
			let currentItem = this.props.marketplaceItems[i];
			let children = [
			      <td style={{ padding: .2}}><img src={"pokemon_images/medium/" + String(currentItem.pokemonNumber).padStart(3,'0') + '.png'} alt="test"/></td>,
			      <td>{currentItem.nickname}</td>,
			      <td>{currentItem.type1}</td>,
			      <td>{currentItem.hp}</td>,
			      <td>{currentItem.attack}</td>,
			      <td>{currentItem.defense}</td>,
			      <td>{currentItem.specialAttack}</td>,
			      <td>{currentItem.specialDefense}</td>,
			      <td>{currentItem.level}</td>,
			      <td>{currentItem.gender ? "male" : "female"}</td>,
			      <td>{currentItem.price + " Ether"}</td>,
			      <td>
			      {this.props.account !== currentItem.seller && 
			      	<Button variant="primary" size="sm" block name="buyPokemon" value={i} onClick={this.handleBuy}>Buy</Button>
			      }
			      </td>]

			console.log("Children " + children.length);
			table.push(<tr>{children}</tr>);
		}
		return table;
	}


	render() {
		return (
			<Table responsive>
			  <thead>
			    <tr>
			      <th></th>
			      <th>Name</th>
			      <th>Type</th>
			      <th>HP</th>
			      <th>ATK</th>
			      <th>DEF</th>
			      <th>SP-ATK</th>
			      <th>SP-DEF</th>
			      <th>LV</th>
			      <th>Gender</th>
			      <th>Price</th>
			      <th>Action</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{this.createTableBody()}
			  </tbody>
			</Table>
		)
	}

}

export default MarketplaceTable;