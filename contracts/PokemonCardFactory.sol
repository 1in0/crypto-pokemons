pragma solidity >=0.5.0 <0.6.0;

import "./Ownable.sol";
import "./SafeMath.sol";

contract PokemonCardFactory is Ownable {
	using SafeMath for uint256;
	using SafeMath32 for uint32;
	using SafeMath16 for uint16;

	event NewPokemon(uint pokemonId, string name, uint dna);

	uint dnaDigits = 16;
	uint dnaModulus = 10 ** dnaDigits;
	uint battleCooldownTime = 1 days;
	uint breedingCooldownTime = 10 days;


	struct Pokemon {
		string name;
		uint dna;
		uint32 level;
		uint32 battleReadyTime;
		uint32 breedingReadyTime;
	}

	Pokemon[] public pokemons;

	mapping (uint => address) public pokemonToOwner;
	mapping (address => uint) ownerPokemonCount;

	function _createPokemon(string memory _name, uint _dna) internal {
		uint id = pokemons.push(Pokemon(_name, _dna, 1, uint32(now + battleCooldownTime), uint32(now + breedingCooldownTime))) - 1;
		pokemonToOwner[id] = msg.sender;
		ownerPokemonCount[msg.sender] = ownerPokemonCount[msg.sender].add(1);
		emit NewPokemon(id, _name, _dna);
	}

	function _generateRandomDna(string memory _str) private view returns (uint) {
		uint rand = uint(keccak256(abi.encodePacked(_str)));
		return rand % dnaModulus;
	}

	function createRandomPokemon(string memory _name) public {
		require(ownerPokemonCount[msg.sender] == 0);
		uint randDna = _generateRandomDna(_name);
		_createPokemon(_name, randDna);
	}

	modifier ownerOfPokemon(uint _pokemonId) {
		require(msg.sender == pokemonToOwner[_pokemonId]);
		_;
	}
}