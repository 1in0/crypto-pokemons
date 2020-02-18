import {CardDeck, Card, Row, Col, Button, Badge, ProgressBar} from 'react-bootstrap';
import React, { Component } from "react";
import SellPokemonButton from "./SellPokemonButton";
import BreedPokemon from "./BreedPokemon";
import SharePokemonButton from "./SharePokemonButton";

class MyPokemonCard extends Component {

	state = {isSelling: false, breedReady: false, isSharing: false};

	constructor(props) {
		super(props);
		this.handleTakeOffMarket = this.handleTakeOffMarket.bind(this);
		this.handleIsSelling = this.handleIsSelling.bind(this);
		this.handleIsSharing = this.handleIsSharing.bind(this);
		this.handleUnshare = this.handleUnshare.bind(this);
	}

	componentDidMount() {
		this.setState({isSelling: this.props.isSelling});
		this.setState({isSharing: this.props.isSharing});
	}

	handleTakeOffMarket(event) {
		const {value} = event.target
		this.props.handleTakeOffMarket(value);
		this.setState({isSelling: false});
	}

	handleIsSelling() {
		this.setState({isSelling: true});
	}

	handleIsSharing() {
		this.setState({isSharing: true});
	}

	handleUnshare(event) {
		const {value} = event.target
		this.props.handleUnshare(value);
		this.setState({isSharing: false});
	}

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
		const isSelling = this.state.isSelling;
		const isSharing = this.state.isSharing;
		const gender = this.props.gender ? '♂️': '♀️';
		// this.setState({isSelling: this.props.isSelling});
		const myCard = this.props.myCard;
		const isPregnant = this.props.isPregnant;
		const validPartners = this.props.validPartners;
		const battleReadyTime = this.props.battleReadyTime;
		const battleCoolOffTime = 60; // in seconds
		const breedReadyTime = this.props.battleReadyTime;
		const breedCoolOffTime = 60;

		const pokemonImageUrl = "pokemon_images/large/" + pokemonNumber + ".png";
		const now = new Date();
		const secondsSinceEpoch = Math.round(now.getTime() / 1000);
		const battleWaitingProgress = Math.round((secondsSinceEpoch - battleReadyTime) / battleCoolOffTime * 100) % 100;
		const breedWaitingProgress = (5-this.props.breedingTimeRemaining)/5*100;

		return (
			<Card>
				<Card.Img variant="top" src={pokemonImageUrl} />
				<Card.Body>
					<Card.Title>{pokemonNickname + ' ' + gender}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">{pokemonName + ' Level: ' + level }</Card.Subtitle>

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
					
					{myCard && 
					<Row>
						<Col sm={3}>🥚:</Col>
						{breedReady ?
							(<Col><BreedPokemon nickname={pokemonNickname} pokemonId={pokemonId} validPartners={validPartners} breedWith={this.props.breedWith}/></Col>)
							: (isPregnant) ? <Col sm={9} style={{paddingLeft: 0}}>Currently Pregnant </Col>
								: ( <Col sm={9} style={{paddingLeft: 0, marginTop: 5}}> 
									<ProgressBar now={breedWaitingProgress} label={breedWaitingProgress}
									/></Col>)
						}
					</Row>
					}
					<Row>
						<Col sm={3}>🗡️:</Col>
						{battleReady ?
							(<Col> <Badge variant="success" >Ready to Battle</Badge> </Col>)
							: (<Col sm={9} style={{paddingLeft: 0, marginTop: 5}}> <ProgressBar now={battleWaitingProgress} label={battleWaitingProgress}/></Col>)
						}
					</Row>

			</Card.Body>
			{myCard && 
			<Card.Footer>
				<Row>
					{isSelling ? (
						<Col > <Button variant="danger" size="sm" style={{fontSize: ".750rem"}} block name="stopSell" value={pokemonId} onClick={this.handleTakeOffMarket}>Stop Sell</Button> </Col>
						) : (
						<Col > <SellPokemonButton handleSubmit={this.props.handlePokemonSell} nickname={pokemonNickname} pokemonId={pokemonId} handleIsSelling={this.handleIsSelling}/></Col>
						)
					}
					{isSharing ? ( 
						<Col > <Button variant="danger" size="sm" style={{fontSize: ".750rem"}} block name="stopShare" value={pokemonId} onClick={this.handleUnshare}>Stop Share</Button> </Col>
						) : (
						<Col > <SharePokemonButton nickname={pokemonNickname} pokemonId={pokemonId} handleIsSharing={this.handleIsSharing} handlePokemonShareCard={this.props.handlePokemonShareCard}/> </Col>
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