pragma solidity >=0.5.0 <0.6.0;

import "./PokemonCardFactory.sol";

contract PokemonCardBreeding is PokemonCardFactory {

	modifier ownerOfBothPokemons(uint _pokemon1Id, uint _pokemon2Id) {
		require(msg.sender == pokemonToOwner[_pokemon1Id]);
		require(msg.sender == pokemonToOwner[_pokemon2Id]);
		_;
	}

	function _isBothBreedingReady(Pokemon storage _pokemon1, Pokemon storage _pokemon2) internal view returns (bool) {
		return (_pokemon1.breedingReadyTime <= now) && (_pokemon2.breedingReadyTime <= now);
	}

	function _triggerBothBreedingCooldown(Pokemon storage _pokemon1, Pokemon storage _pokemon2) internal {
		_pokemon1.breedingReadyTime = uint32(now + breedingCooldownTime);
		_pokemon2.breedingReadyTime = uint32(now + breedingCooldownTime);
	}

	function breedAndMultiply(uint _pokemon1Id, uint _pokemon2Id) internal ownerOfBothPokemons(_pokemon1Id, _pokemon2Id) {
		// 1. Check whether the user owns the pokemon
		// 2. Make sure they are not breeding already
		Pokemon storage pokemon1 = pokemons[_pokemon1Id];
		Pokemon storage pokemon2 = pokemons[_pokemon2Id];
		require(_isBothBreedingReady(pokemon1, pokemon2));
		uint newDna = (pokemon1.dna + pokemon2.dna) / 2;
		_createPokemon("NoName", newDna);
		_triggerBothBreedingCooldown(pokemon1, pokemon2);
	}
}