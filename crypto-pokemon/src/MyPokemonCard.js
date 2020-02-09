import {CardDeck, Card, Row, Col, Button, Badge} from 'react-bootstrap';
import React, { Component } from "react";

class MyPokemonCard extends Component {

	render() {
		const pokemonId = this.props.pokemonId;
		const pokemonNumber = this.props.pokemonNumber;
		const pokemonName = this.props.pokemonName;
		const pokemonNickname = this.props.pokemonNickname;
		const level = this.props.level;
		const hp = this.props.hp;
		const attack = this.props.attack;
		const defense = this.props.defense;
		const specialAttack = this.props.specialAttack;
		const specialDefense = this.props.specialDefense;
		const battleReady = this.props.battleReady;
		const breedReady = this.props.breedReady;
		const type1 = this.props.type1;
		const type2 = this.props.type2;
		const isSelling = this.props.isSelling;
		const isSharing = this.props.isSharing;
		const myCard = this.props.myCard;

		const pokemonImageUrl = "pokemon_images/large/" + pokemonNumber + ".png";

		return (
			<Card>
				<Card.Img variant="top" src={pokemonImageUrl} />
				<Card.Body>
					<Card.Title>{pokemonNickname}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">{pokemonName + ' Level: ' + level}</Card.Subtitle>

					<Row>
						<Col > ❤️: {hp} </Col>
					</Row>
					<Row>
						<Col> ⚔️: {attack}</Col>
						<Col> 🛡: {defense} </Col>
					</Row>
					<Row>
						<Col> 📈: {specialAttack}</Col>
						<Col> 💪: {specialDefense} </Col>
					</Row>
					<Row>
						<Col> 
							{battleReady && 
								<Badge variant="success" >Ready to Battle</Badge>
							}
						</Col>
						<Col>
							{breedReady && 
								<Badge variant="success" >Ready to Breed</Badge>
							}
						</Col>
					</Row>

			</Card.Body>
			{myCard && 
			<Card.Footer>
				<Row>
					{isSelling ? ( 
						<Col > <Button variant="danger"  size="sm" style={{fontSize: ".750rem"}} block>Stop Sell</Button> </Col>
						) : (
						<Col > <Button variant="primary" size="sm" style={{fontSize: ".750rem"}} block>Sell</Button> </Col>
						)
					}
					{isSharing ? ( 
						<Col > <Button variant="danger" size="sm" style={{fontSize: ".750rem"}} block>Stop Share</Button> </Col>
						) : (
						<Col > <Button variant="primary" size="sm" style={{fontSize: ".750rem"}} block>Share</Button> </Col>
						)
					}
				</Row>
			</Card.Footer>
		}
			</Card>
		)

	}

}

export default MyPokemonCard;