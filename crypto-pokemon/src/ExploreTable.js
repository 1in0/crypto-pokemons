import {Table, Button} from 'react-bootstrap';
import React, { Component } from "react";
import PokemonBattleDialogue from './PokemonBattleDialogue';

class ExploreTable extends Component {

	constructor(props) {
		super(props);
	}

	createTableBody = () => {
		let table = []
		for (let i = 0; i < this.props.exploreItems.length; i++) {
			let currentPokemon = this.props.exploreItems[i];
			let children = [
			      <td style={{ padding: .2}}><img src={"pokemon_images/medium/" + String(currentPokemon.pokemonNumber).padStart(3,'0') + '.png'} alt="test"/></td>,
			      <td>{currentPokemon.nickname}</td>,
			      <td>{currentPokemon.type1}</td>,
			      <td>{currentPokemon.hp}</td>,
			      <td>{currentPokemon.attack}</td>,
			      <td>{currentPokemon.defense}</td>,
			      <td>{currentPokemon.specialAttack}</td>,
			      <td>{currentPokemon.specialDefense}</td>,
			      <td>{currentPokemon.speed}</td>,
			      <td>{currentPokemon.level}</td>,
			      <td>
			      {this.props.account !== currentPokemon.owner && 
			      	<PokemonBattleDialogue 
			      		enemyPokemonId={currentPokemon.pokemonId} 
			      		ownedPokemons={this.props.ownedPokemons} 
			      		handleBattleBetweenPokemon={this.props.handleBattleBetweenPokemon}
			      		web3 = {this.props.web3}
			      		contract={this.props.contract}
			      		enemyPokemonName={currentPokemon.nickname}
			      		enemyPokemonHP={currentPokemon.hp}
			      		enemyPokemonNumber={currentPokemon.pokemonNumber}/>
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
				  <th>SPEED</th>
			      <th>LV</th>
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

export default ExploreTable;