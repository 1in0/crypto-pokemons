import {CardDeck, Card, Row, Col, Tabs, Tab} from 'react-bootstrap';
import React, { Component } from "react";
import MyPokemonCard from "./MyPokemonCard";
import MyAccount from "./MyAccount";
import BuyStarterPack from "./BuyStarterPack";
import PregnantPokemons from "./PregnantPokemons";

class MyTeam extends Component {

  createCardDeck = (pokemonOwned) => {
    let cardDeck = []
    let outerLoopCount = Math.ceil(pokemonOwned.length / 4);
    let c = 0;
    // Outer loop to create parent
    for (let i = 0; i < outerLoopCount; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 4; j++) {
      	let currentPokemon = pokemonOwned[c];
      	console.log(currentPokemon);
      	if (c < pokemonOwned.length) {
      		children.push(
		  		<Col style={{textAlign: "left"}}> 
		  			<MyPokemonCard 
						pokemonId = {currentPokemon.pokemonId}
						pokemonNumber = {currentPokemon.pokemonNumber}
						pokemonName = {currentPokemon.pokemonName}
						pokemonNickname = {currentPokemon.nickname}
						level = {currentPokemon.level}
						hp = {currentPokemon.hp}
						gender = {currentPokemon.gender}
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
						isSharing = {currentPokemon.isSharing}
						myCard = {currentPokemon.myCard}
						validPartners = {currentPokemon.gender ? this.props.femalePokemonOwned : this.props.malePokemonOwned}
						handlePokemonSell = {this.props.handlePokemonSell}
						handleTakeOffMarket = {this.props.handleTakeOffMarket}
						breedWith = {this.props.breedWith}
						breedingTimeRemaining = {currentPokemon.breedingTimeRemaining}
						handleUnshare = {this.props.handleUnshare}
						handlePokemonShareCard = {this.props.handlePokemonShareCard}
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
							{this.createCardDeck(this.props.pokemonOwned)}
						</CardDeck>
					</Tab>


					<Tab eventKey="sharedCards" title="Shared Cards">
						<br/>
						<h2 style={{textAlign: "left"}}> Shared Cards </h2>
						<CardDeck>
							{this.createCardDeck(this.props.sharedPokemonInfo)}
						</CardDeck>
					</Tab>
					<Tab eventKey="pregnantpokemons" title="Pregnant Pokemons">
						<br/>
						<h2 style={{textAlign: "left"}}> Pregnant Pokemons </h2>
						<PregnantPokemons pregnantPokemonOwned={this.props.pregnantPokemonOwned} giveBirth={this.props.giveBirth}/>
					</Tab>
					<Tab eventKey="shop" title="Shop">
						<br/>
						<h2 style={{textAlign: "left"}}> Shop </h2>
						<BuyStarterPack handleBuyStarterPack={this.props.handleBuyStarterPack} handleBuyRarePack={this.props.handleBuyRarePack}/>
					</Tab>

					<Tab eventKey="account" title="Account">
						<br/>
						<MyAccount account={this.props.account} 
								   pendingWithdrawal={this.props.pendingWithdrawal} 
								   tokenCount={this.props.pokemonOwned.length}
								   handleWithdrawal={this.props.handleWithdrawal}
						/>
					</Tab>
				</Tabs>

				

			</div>
		)

	}

}

export default MyTeam;