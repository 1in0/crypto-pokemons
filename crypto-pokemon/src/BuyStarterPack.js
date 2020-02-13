import {Card, Button, Badge, Col, Row} from 'react-bootstrap';
import React, { Component } from "react";

class BuyStarterPack extends Component {

	render() {
		return (
			<Row>
				<Col>
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
			</Col>
			<Col>
			<Card style={{ width: '18rem' }}>
				<Card.Img variant="top" src="pokemon_images/rare_bag.png" style={{width: "70%", marginLeft: "auto", marginRight: "auto"}}/>
				<Card.Body>
				<Card.Title>Starter Pack</Card.Title>
				  <Badge pill variant="primary">15 Ether</Badge>
				<Card.Text>
				This amazing pack contains 1 Rare Random Pokemons.
				</Card.Text>
				<Button variant="primary" onClick={this.props.handleBuyRarePack}>Buy</Button>
				</Card.Body>
			</Card>
			</Col>
			</Row>
		)

	}
}

export default BuyStarterPack;