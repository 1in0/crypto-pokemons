import {CardDeck, Card, Row, Col, Tabs, Tab} from 'react-bootstrap';
import React, { Component } from "react";
import MyPokemonCard from "./MyPokemonCard";
import MyAccount from "./MyAccount";

class MyTeam extends Component {

	state = {malePokemonOwned: [], femalePokemonOwned: []}

	componentDidMount() {
		let {malePokemonOwned, femalePokemonOwned} = this.state;
		for (let i = 0; i < this.props.pokemonOwned.length; i++) {
			if (!!this.props.pokemonOwned[i].gender) {
				malePokemonOwned.push(this.props.pokemonOwned[i]);
			} else {
				femalePokemonOwned.push(this.props.pokemonOwned[i]);
			}
		}
		this.setState({malePokemonOwned: malePokemonOwned, femalePokemonOwned: femalePokemonOwned});
	}

  createCardDeck = () => {
    let cardDeck = []
    let outerLoopCount = Math.ceil(this.props.pokemonOwned.length / 4);
    let c = 0;
    // Outer loop to create parent
    for (let i = 0; i < outerLoopCount; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 4; j++) {
      	let currentPokemon = this.props.pokemonOwned[c];
      	console.log(currentPokemon);
      	if (c < this.props.pokemonOwned.length) {
      		children.push(
		  		<Col style={{textAlign: "left"}}> 
		  			<MyPokemonCard 
						pokemonId = {currentPokemon.pokemonId}
						pokemonNumber = {currentPokemon.pokemonNumber}
						pokemonName = {currentPokemon.pokemonName}
						pokemonNickname = {currentPokemon.nickname}
						level = {currentPokemon.level}
						hp = {currentPokemon.hp}
						attack = {currentPokemon.attack}
						defense = {currentPokemon.defense}
						specialAttack = {currentPokemon.specialAttack}
						specialDefense = {currentPokemon.specialDefense}
						battleReady = {true}
						breedReady = {currentPokemon.breedReady}
						breedingReadyTime = {currentPokemon.breedingReadyTime}
						battleReadyTime = {currentPokemon.battleReadyTime}
						type1 = {currentPokemon.type1}
						type2 = {currentPokemon.type2}
						isSelling = {currentPokemon.isSelling}
						isSharing = {true}
						myCard = {true}
						validPartners = {currentPokemon.gender ? this.state.femalePokemonOwned : this.state.malePokemonOwned}
						handlePokemonSell = {this.props.handlePokemonSell}
						handleTakeOffMarket = {this.props.handleTakeOffMarket}
		  			/>
		  		</Col>
      			);
      	} else {
      		children.push(<Col> </Col>);
      	}
      	c++;
      }
      //Create the parent and add the children
      cardDeck.push(<div><Row>{children}</Row><br/></div>);
    }
    return cardDeck;
  }

	render() {
		return (
			<div className="MyTeam">
				
				<br/>
				<Tabs defaultActiveKey="myCards" id="pokemonCardTab">
					<Tab eventKey="myCards" title="My Cards">
						<br/>
						<h2 style={{textAlign: "left"}}> My Cards </h2>
						<CardDeck>
							{this.createCardDeck()}
						</CardDeck>
					</Tab>


					<Tab eventKey="sharedCards" title="Shared Cards">
						<br/>
						<h2 style={{textAlign: "left"}}> Shared Cards </h2>
						<CardDeck>
							<Row>
						  		<Col style={{textAlign: "left"}}> 
						  			<MyPokemonCard 
										pokemonId = {1234}
										pokemonNumber = {112}
										pokemonName = {"Bulbasour"}
										pokemonNickname = {"Broke"}
										level = {100}
										hp = {102}
										attack = {212}
										defense = {120}
										specialAttack = {22}
										specialDefense = {33}
										battleReady = {true}
										breedReady = {true}
										type1 = {"Water"}
										type2 = {"Ground"}
										isSelling = {true}
										isSharing = {true}

						  			/>
						  		</Col>
						  		<Col style={{textAlign: "left"}}> 
						  			<MyPokemonCard 
										pokemonId = {1234}
										pokemonNumber = {121}
										pokemonName = {"Bulbasour"}
										pokemonNickname = {"Broke"}
										level = {100}
										hp = {102}
										attack = {212}
										defense = {120}
										specialAttack = {22}
										specialDefense = {33}
										battleReady = {true}
										breedReady = {true}
										type1 = {"Water"}
										type2 = {"Ground"}
										isSelling = {false}
										isSharing = {false}

						  			/>
						  		</Col>
						  		<Col style={{textAlign: "left"}}> 
						  			<MyPokemonCard 
										pokemonId = {1234}
										pokemonNumber = {13}
										pokemonName = {"Bulbasour"}
										pokemonNickname = {"Broke"}
										level = {100}
										hp = {102}
										attack = {212}
										defense = {120}
										specialAttack = {22}
										specialDefense = {33}
										battleReady = {true}
										breedReady = {true}
										type1 = {"Water"}
										type2 = {"Ground"}
										isSelling = {false}
										isSharing = {true}

						  			/>
						  		</Col>
						  		<Col style={{textAlign: "left"}}> 
						  			<MyPokemonCard 
										pokemonId = {1234}
										pokemonNumber = {33}
										pokemonName = {"Bulbasour"}
										pokemonNickname = {"Broke"}
										level = {100}
										hp = {102}
										attack = {212}
										defense = {120}
										specialAttack = {22}
										specialDefense = {33}
										battleReady = {true}
										breedReady = {true}
										type1 = {"Water"}
										type2 = {"Ground"}
										isSelling = {false}
										isSharing = {true}
						  			/>
						  		</Col>
						  </Row>

						</CardDeck>
					</Tab>
					<Tab eventKey="eggs" title="Eggs">
					Hi
					</Tab>

					<Tab eventKey="account" title="Account">
						<br/>
						<MyAccount account={this.props.account} tokenCount={this.props.pokemonOwned.length}/>
					</Tab>
				</Tabs>

				

			</div>
		)

	}

}

export default MyTeam;