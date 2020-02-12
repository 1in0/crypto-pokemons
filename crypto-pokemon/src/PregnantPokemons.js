import {Col, Row, Card, Button, Badge, ProgressBar} from 'react-bootstrap';
import React, { Component } from "react";

class PregnantPokemons extends Component {

	constructor(props) {
		super(props);
		this.handleGiveBirth = this.handleGiveBirth.bind(this);
	}

	async handleGiveBirth(event) {
		const {value} = event.target
		const response = await this.props.giveBirth(value);
		console.log("handleGiveBirth  " + response);
	}

	createPregnantPokemonDeck = () => {
		let cardDeck = []
		let outerLoopCount = Math.ceil(this.props.pregnantPokemonOwned.length / 4);
		let c = 0;
		// Outer loop to create parent
		for (let i = 0; i < outerLoopCount; i++) {
			let children = []
			//Inner loop to create children
			for (let j = 0; j < 4; j++) {
				let currentPokemon = this.props.pregnantPokemonOwned[c];
				if (c < this.props.pregnantPokemonOwned.length) {
					children.push(
						<Card style={{ width: '10rem' }}>
							<br/>
							<Card.Img variant="top" style={{ width: '30%', marginLeft: "auto", marginRight: "auto" }} src={"pokemon_images/3d/"+ currentPokemon.pokemonName.toLowerCase() +".gif"} />
							<Card.Body>
							<Card.Title>{currentPokemon.nickname}</Card.Title>
							{
								currentPokemon.breedingTimeRemaining == 0 ?
								<Button variant="primary" onClick={this.handleGiveBirth} value={currentPokemon.pokemonId}>Give Birth</Button> :
								<ProgressBar variant="success" now={(5-currentPokemon.breedingTimeRemaining)/5*100} />
							}
							</Card.Body>
						</Card>
						);
				} else {
					children.push(<Col> </Col>);
				}
				c++;
			}
		cardDeck.push(<div><Row>{children}</Row><br/></div>);
		}
		return cardDeck;
	}


	render() {
		return (
			<div>
			{this.createPregnantPokemonDeck()}
			</div>
		)

	}
}

export default PregnantPokemons;