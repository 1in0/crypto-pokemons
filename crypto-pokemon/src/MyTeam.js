import {CardDeck, Card, Row, Col, Tabs, Tab} from 'react-bootstrap';
import React, { Component } from "react";
import MyPokemonCard from "./MyPokemonCard"
class MyTeam extends Component {

	render() {
		return (
			<div className="MyTeam">
				<br/>
				<Tabs defaultActiveKey="myCards" id="pokemonCardTab">
					<Tab eventKey="myCards" title="My Cards">
						<br/>
						<h2 style={{textAlign: "left"}}> My Cards </h2>
						<CardDeck>
							<Row>
						  		<Col style={{textAlign: "left"}}> 
						  			<MyPokemonCard 
										pokemonId = {1234}
										pokemonNumber = {1}
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
										myCard = {true}

						  			/>
						  		</Col>
						  		<Col style={{textAlign: "left"}}> 
						  			<MyPokemonCard 
										pokemonId = {1234}
										pokemonNumber = {21}
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
										myCard = {true}

						  			/>
						  		</Col>
						  		<Col style={{textAlign: "left"}}> 
						  			<MyPokemonCard 
										pokemonId = {1234}
										pokemonNumber = {133}
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
										myCard = {true}

						  			/>
						  		</Col>
						  		<Col style={{textAlign: "left"}}> 
						  			<MyPokemonCard 
										pokemonId = {1234}
										pokemonNumber = {3}
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
										myCard = {true}
						  			/>
						  		</Col>
						  </Row>

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