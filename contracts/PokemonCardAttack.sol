pragma solidity >=0.5.0 <0.6.0;

import "./PokemonCardHelper.sol";

contract PokemonCardAttack is PokemonCardHelper {

	function attack(uint _pokemonId, uint _enemyPokemonId) external ownerOfPokemon(_pokemonId) {
		Pokemon storage myPokemon = pokemons[_pokemonId];
		Pokemon storage enemyPokemon = pokemons[_enemyPokemonId];
		// TODO: Battle Logic
	}
}
