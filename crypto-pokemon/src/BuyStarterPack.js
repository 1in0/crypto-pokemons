import {Card, Button, Badge} from 'react-bootstrap';
import React, { Component } from "react";

class BuyStarterPack extends Component {

	render() {
		return (
			<Card style={{ width: '18rem' }}>
				<Card.Img variant="top" src="pokemon_images/bag.png" />
				<Card.Body>
				<Card.Title>Starter Pack</Card.Title>
				  <Badge pill variant="primary">1.5 Ether</Badge>
				<Card.Text>
				This amazing pack contains 1 random Pokemons.
				</Card.Text>
				<Button variant="primary" onClick={this.props.handleBuyStarterPack}>Buy</Button>
				</Card.Body>
			</Card>
		)

	}
}

export default BuyStarterPack;