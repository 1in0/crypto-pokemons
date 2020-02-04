pragma solidity >=0.5.0 <0.6.0;

import "./SafeMath.sol";
import "./Base.sol";

contract PokemonCardFactory is Base {
	using SafeMath for uint256;
	using SafeMath32 for uint32;
	using SafeMath16 for uint16;

	event NewPokemon(uint pokemonId, string name, uint dna);

	uint dnaDigits = 16;
	uint dnaModulus = 10 ** dnaDigits;
	uint battleCooldownTime = 1 days;
	uint breedingCooldownTime = 10 days;

	struct Pokemon {
		string nickname;
		string name;
		string type1;
		string type2;
		uint32 level;
		uint32 battleReadyTime;
		uint32 breedingReadyTime;
		bool gender;
		uint dna;
		uint fatherId;
		uint motherId;
		uint breedingWithId;
		uint pokemonNumber;
		bool legendary;
		BaseStats baseStats;
	}

	Pokemon[] pokemons;

	mapping (uint => address) public pokemonToOwner;
	mapping (address => uint) ownerPokemonCount;

	function _generateRandomGender(string memory _str) private pure returns (bool) {
		uint rand = uint(keccak256(abi.encodePacked(_str)));
		return (rand % 2 == 0);
	}

	function _generateRandomDna(string memory _str) private view returns (uint) {
		uint rand = uint(keccak256(abi.encodePacked(_str)));
		return rand % dnaModulus;
	}

	function _createPokemon(string memory _name, uint _dna, uint _fatherId, uint _motherId, uint _pokemonNumber) internal returns (uint) {
		uint32[] memory variant = new uint32[](6);
		uint clone = _dna;
		uint temp;
		for (uint index = 0; index < 6; index++) {
			temp = clone % 10;
			variant[index] = uint32(temp);
			clone = (clone - temp) / 10;
		}

		BasePokemon memory basePokemon = basePokemons[_pokemonNumber];
		basePokemon.stats.hp += variant[0];
		basePokemon.stats.attack += variant[1];
		basePokemon.stats.defense += variant[2];
		basePokemon.stats.specialAttack += variant[3];
		basePokemon.stats.specialDefense += variant[4];
		basePokemon.stats.speed += variant[5];

		Pokemon memory _pokemon = Pokemon({
			nickname: _name,
			name: basePokemon.name,
			type1: basePokemon.type1,
			type2: basePokemon.type2,
			pokemonNumber: basePokemon.number,
			legendary: basePokemon.legendary,
			level: 1,
			battleReadyTime: uint32(now + battleCooldownTime),
			breedingReadyTime: uint32(now + breedingCooldownTime),
			gender: _generateRandomGender(_name),
			dna: _dna,
			fatherId: _fatherId,
			motherId: _motherId,
			breedingWithId: 0,
			baseStats: basePokemon.stats
			});

		uint id = pokemons.push(_pokemon) - 1;
		pokemonToOwner[id] = msg.sender;
		ownerPokemonCount[msg.sender] = ownerPokemonCount[msg.sender].add(1);
		emit NewPokemon(id, _name, _dna);
		return id;
	}

	function createStarterPokemon(string memory _nickname, uint _pokemonNumber) public {
		require(ownerPokemonCount[msg.sender] == 0);
		require(_pokemonNumber == 0 || _pokemonNumber == 3 || _pokemonNumber == 6);
		uint randDna = _generateRandomDna(_nickname);
		_createPokemon(_nickname, randDna, 0, 0, _pokemonNumber);
	}

	function _breedPokemon(string memory _nickname, uint _dna, uint _fatherId, uint _motherId) internal {
		Pokemon storage _mother = pokemons[_motherId];
		uint _pokemonNumber = _mother.pokemonNumber;
		uint _originPokemonNumber = origin[_pokemonNumber];
		_createPokemon(_nickname, _dna, _fatherId, _motherId, _originPokemonNumber);
	}

	modifier ownerOfPokemon(uint _pokemonId) {
		require(msg.sender == pokemonToOwner[_pokemonId]);
		_;
	}
}