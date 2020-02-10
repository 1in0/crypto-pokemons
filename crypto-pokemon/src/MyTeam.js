import {CardDeck, Card, Row, Col, Tabs, Tab} from 'react-bootstrap';
import React, { Component } from "react";
import MyPokemonCard from "./MyPokemonCard"
class MyTeam extends Component {

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
						breedReady = {true}
						type1 = {currentPokemon.type1}
						type2 = {currentPokemon.type2}
						isSelling = {true}
						isSharing = {true}
						myCard = {true}
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
				</Tabs>

				

			</div>
		)

	}

}

export default MyTeam;