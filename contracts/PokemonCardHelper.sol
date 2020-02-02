pragma solidity >=0.5.0 <0.6.0;

import "./PokemonCardBreeding.sol";

contract PokemonCardHelper is PokemonCardBreeding {
	uint levelUpFee = 0.001 ether;
	mapping (address => uint) pendingWithdrawals;

	modifier aboveLevel(uint _level, uint _pokemonId) {
		require(pokemons[_pokemonId].level >= _level);
	}

	function setLevelUpFee(uint _fee) external onlyOwner {
		levelUpFee = _fee;
	}

	function levelUp(uint _pokemonId) external payable {
		require(msg.value == levelUpFee);
		pendingWithdrawals[address(this)] += msg.value;
		pokemons[_pokemonId].level = zombies[_zombieId].level.add(1);
	}

	function changeName(uint _pokemonId, string calldata _newName) external aboveLevel(2, _pokemonId) {
		pokemons[_pokemonId].name = _newName;
	}

	function getPokemonCardsByOwner(address _owner) external view returns (uint[] memory) {
		uint[] memory result = new uint[](ownerPokemonCount[_owner]);
		uint counter = 0;
		for (uint i = 0; i < pokemons.length; i++) {
			if (pokemonToOwner[i] == _owner) {
				result[counter] = i;
				counter = counter.add(1);
			}
		}
		return result;
	}
}