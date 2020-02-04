pragma solidity >=0.5.0 <0.6.0;

import "./PokemonCardFactory.sol";

contract PokemonCardBreeding is PokemonCardFactory {

	event Pregnant(address owner, uint motherId, uint fatherId);
	uint public birthFee = 1.5 finney;

	modifier positiveId(uint _pokemonId) {
		require(_pokemonId > 0);
		_;
	}

	function isReadyToBreed(uint _pokemonId) public view positiveId(_pokemonId) returns (bool) {
		Pokemon storage pokemon = pokemons[_pokemonId];
		return _canBreed(pokemon);
	}

	function isPregnant(uint _pokemonId) public view positiveId(_pokemonId) returns (bool) {
		return pokemons[_pokemonId].breedingWithId != 0;
	}

	function canBreedWith(uint _motherId, uint _fatherId) public view returns (bool) {
		require(_motherId > 0);
		require(_fatherId > 0);
		Pokemon storage mother = pokemons[_motherId];
		Pokemon storage father = pokemons[_fatherId];
		return _isValidMatingPair(mother, _motherId, father, _fatherId) && 
			_isBreedingPermitted(_motherId, _fatherId) &&
			isReadyToBreed(_motherId) &&
			isReadyToBreed(_fatherId);
	}

	function _isBreedingPermitted(uint _motherId, uint _fatherId) internal view returns (bool) {
		require(msg.sender == pokemonToOwner[_motherId]);
		require(msg.sender == pokemonToOwner[_fatherId]);
	}

	function _isValidMatingPair(Pokemon storage _mother, uint _motherId, 
		Pokemon storage _father, uint _fatherId) private view returns (bool) {
		// Can not breed with itself
		if (_motherId == _fatherId) {
			return false;
		}

		// Check gender of parents
		if (!_mother.gender || _father.gender) {
			return false;
		}

		// Can not breed with its parent
		if (_mother.fatherId == _fatherId || _father.motherId == _motherId) {
			return false;
		}

		// Skip if parent is generation 0
		if (_mother.motherId == 0 || _father.motherId == 0) {
			return true;
		}

		if (_mother.fatherId == _father.fatherId || _mother.motherId == _father.motherId) {
			return false;
		}

		return true;
	}

	function _isReadyToGiveBirth(Pokemon storage _pokemon) internal view returns (bool) {
		return (_pokemon.breedingReadyTime <= now);
	}

	function giveBirth(uint _motherId) external positiveId(_motherId) {
		// make sure pokemon is pregnant and ready to give birth
		require(isPregnant(_motherId));
		Pokemon storage mother = pokemons[_motherId];
		require(_isReadyToGiveBirth(mother));

		uint _fatherId = mother.breedingWithId;
		_breedPokemon("noName", _fatherId, _motherId);
		delete mother.breedingWithId;
    }

	function _triggerBreedingCooldown(Pokemon storage _pokemon) internal {
		_pokemon.breedingReadyTime = uint32(now + breedingCooldownTime);
	}

	function _breedWith(uint _motherId, uint _fatherId) internal {
		Pokemon storage father = pokemons[_fatherId];
		Pokemon storage mother = pokemons[_motherId];
		mother.breedingWithId = _fatherId;
		_triggerBreedingCooldown(father);
		_triggerBreedingCooldown(mother);
		emit Pregnant(msg.sender, _motherId, _fatherId);
	}

	function setBirthFee(uint fee) external onlyOwner {
		birthFee = fee;
	}

	function _canBreed(Pokemon storage _pokemon) internal view returns (bool) {
		return (_pokemon.breedingWithId == 0) && _isReadyToGiveBirth(_pokemon);
	}

	function breedWith(uint _motherId, uint _fatherId) external payable {
		// Checks for payment
		require(msg.value >= birthFee);

		require(canBreedWith(_motherId, _fatherId));

		_breedWith(_motherId, _fatherId);
	}
}