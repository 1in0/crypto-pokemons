pragma solidity >=0.5.0 <0.6.0;

import "./PokemonCardBreeding.sol";

contract PokemonCardHelper is PokemonCardBreeding {
	uint levelUpFee = 0.001 ether;
	mapping (address => uint) pendingWithdrawals;

	event PokemonLevelUp(uint _pokemonId, uint newLevel);
	event PokemonEvolve(uint _pokemonId);

	modifier aboveLevel(uint _level, uint _pokemonId) {
		require(pokemons[_pokemonId].level >= _level);
		_;
	}

	function setLevelUpFee(uint _fee) external onlyOwner {
		levelUpFee = _fee;
	}

	function levelUp(uint _pokemonId) external payable ownerOfPokemon(_pokemonId) {
		require(msg.value == levelUpFee);
		pendingWithdrawals[address(this)] += msg.value;
		Pokemon storage pokemon = pokemons[_pokemonId];
		pokemon.level = pokemons[_pokemonId].level.add(1);

		pokemon.baseStats.hp = pokemon.baseStats.hp.add(5);
		pokemon.baseStats.attack = pokemon.baseStats.attack.add(2);
		pokemon.baseStats.defense = pokemon.baseStats.defense.add(2);
		pokemon.baseStats.specialAttack = pokemon.baseStats.specialAttack.add(1);
		pokemon.baseStats.specialDefense = pokemon.baseStats.specialDefense.add(1);
		pokemon.baseStats.speed = pokemon.baseStats.speed.add(2);

		emit PokemonLevelUp(_pokemonId, pokemon.level);
	}

	function changeName(uint _pokemonId, string calldata _newName) external aboveLevel(2, _pokemonId) {
		pokemons[_pokemonId].name = _newName;
	}

	function evolve(uint _pokemonId) external ownerOfPokemon(_pokemonId) returns(string memory, uint, uint32, uint32, uint32) {
		require(isEvovalble(_pokemonId));
		Pokemon storage pokemon = pokemons[_pokemonId];

		pokemon.baseStats.hp = pokemon.baseStats.hp.add(12);
		pokemon.baseStats.attack = pokemon.baseStats.attack.add(6);
		pokemon.baseStats.defense = pokemon.baseStats.defense.add(6);
		pokemon.baseStats.specialAttack = pokemon.baseStats.specialAttack.add(6);
		pokemon.baseStats.specialDefense = pokemon.baseStats.specialDefense.add(6);
		pokemon.baseStats.speed = pokemon.baseStats.speed.add(6);

		uint newPokemonNumber = evolution[pokemon.pokemonNumber];
		BasePokemon storage basePokemon = basePokemons[newPokemonNumber-1];

		require(basePokemon.number == newPokemonNumber);
		pokemon.name = basePokemon.name;
		pokemon.pokemonNumber = newPokemonNumber;
		pokemon.type1 = basePokemon.type1;
		pokemon.type2 = basePokemon.type2;
		pokemon.legendary = basePokemon.legendary;
		return (pokemon.name, pokemon.pokemonNumber, pokemon.baseStats.hp, pokemon.baseStats.attack, pokemon.baseStats.defense);

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

	function isEvovalble(uint _pokemonId) public view returns(bool) {
		Pokemon storage pokemon = pokemons[_pokemonId];
		uint pokemonNumber = pokemon.pokemonNumber;
		return evolution[pokemonNumber] != 0 && evolution[pokemonNumber] != pokemonNumber;
	}

	function buyStarterPack() external payable returns(uint) {
		require(msg.value == 1.5 ether, "a pack costs 1.5 ether");
		pendingWithdrawals[owner()] += 1.5 ether;
		return createRandomPokemon();
	}

    /**
	Transfer the accumulated ETH by player. The balance is reset to 0 after withdraw.
    **/
    function withdraw() public {
        uint256 amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

    /**
    Return the amount the user can withdrawl.
    **/
    function getPendingWithdrawals() public view returns(uint) {
    	return pendingWithdrawals[msg.sender];
    }
}