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
	uint battleCooldownTime = 5;
	uint breedingCooldownTime = 5;

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

	mapping (uint => address payable) public pokemonToOwner;
	mapping (address => uint) ownerPokemonCount;

	constructor() public {
		createStarterPokemon("Initial", 0);
	}

	function _generateRandomGender(string memory _str) private view returns (bool) {
		uint rand = uint(keccak256(abi.encodePacked(_str)));
		uint secureRand = uint(block.number + block.difficulty);
		return ((rand + secureRand) % 2 == 0);
	}

	function _generateRandomDna(string memory _str) private view returns (uint) {
		uint rand = uint(keccak256(abi.encodePacked(_str)));
		uint secureRand = uint(block.number + block.difficulty);
		return (rand + secureRand) % dnaModulus;
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
		basePokemon.stats.hp = basePokemon.stats.hp.add(variant[0]);
		basePokemon.stats.attack = basePokemon.stats.attack.add(variant[1]);
		basePokemon.stats.defense = basePokemon.stats.defense.add(variant[2]);
		basePokemon.stats.specialAttack = basePokemon.stats.specialAttack.add(variant[3]);
		basePokemon.stats.specialDefense = basePokemon.stats.specialDefense.add(variant[4]);
		basePokemon.stats.speed = basePokemon.stats.speed.add(variant[5]);

		Pokemon memory _pokemon = Pokemon({
			nickname: _name,
			name: basePokemon.name,
			type1: basePokemon.type1,
			type2: basePokemon.type2,
			pokemonNumber: basePokemon.number,
			legendary: basePokemon.legendary,
			level: 1,
			battleReadyTime: 0,
			breedingReadyTime: 0,
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

	function createStarterPokemon(string memory _nickname, uint _pokemonNumber) public returns (uint){
		require(ownerPokemonCount[msg.sender] == 0);
		require(_pokemonNumber == 0 || _pokemonNumber == 3 || _pokemonNumber == 6);
		uint randDna = _generateRandomDna(_nickname);
		return _createPokemon(_nickname, randDna, 0, 0, _pokemonNumber);
	}

	function _breedPokemon(string memory _nickname, uint _fatherId, uint _motherId) internal returns (uint){
		Pokemon storage _mother = pokemons[_motherId];
		uint _pokemonNumber = _mother.pokemonNumber;
		uint _originPokemonNumber = origin[_pokemonNumber]-1;
		uint randDna = _generateRandomDna(_nickname);
		return _createPokemon(_nickname, randDna, _fatherId, _motherId, _originPokemonNumber);
	}

	modifier ownerOfPokemon(uint _pokemonId) {
		require(msg.sender == pokemonToOwner[_pokemonId]);
		_;
	}

	function isNewTrainer() public view returns (bool) {
		return (ownerPokemonCount[msg.sender] == 0);
	}

	function returnNumberOfPokemons() external view returns (uint) {
		return ownerPokemonCount[msg.sender];
	}

	function returnTotalNumberOfPokemons() external view returns (uint) {
		return pokemons.length;
	}

	function getPokemonCardsByOwner() external view returns (uint[] memory) {
		uint[] memory result = new uint[](ownerPokemonCount[msg.sender]);
		uint counter = 0;
		for (uint i = 0; i < pokemons.length; i++) {
			if (pokemonToOwner[i] == msg.sender) {
				result[counter] = i;
				counter = counter.add(1);
			}
		}
		return result;
	}

	function getPokemonInfo(uint _pokemonId) external view returns (
		string memory,
		string memory,
		string memory,
		string memory,
		uint32,
		uint,
		bool
		) {

		Pokemon storage _pokemon = pokemons[_pokemonId];

		return (_pokemon.nickname, _pokemon.name, _pokemon.type1, _pokemon.type2, _pokemon.level,
		 	_pokemon.pokemonNumber, _pokemon.legendary);
	}

	function getPokemonBreedingDetails(uint _pokemonId) external view returns (
		uint32,
		bool,
		uint,
		uint,
		uint
		) {
		Pokemon storage _pokemon = pokemons[_pokemonId];

		return (_pokemon.breedingReadyTime, _pokemon.gender, _pokemon.fatherId, _pokemon.motherId, _pokemon.breedingWithId);
	}

	function getPokemonBattleDetails(uint _pokemonId) external view returns (uint32) {
		Pokemon storage _pokemon = pokemons[_pokemonId];
		return _pokemon.battleReadyTime;
	}

	function getPokemonStats(uint _pokemonId) external view returns (
		uint32,
		uint32,
		uint32,
		uint32,
		uint32,
		uint32
		) {
		BaseStats storage stats = pokemons[_pokemonId].baseStats;

		return (stats.hp, stats.attack, stats.defense, stats.specialAttack, stats.specialDefense, stats.speed);
	}

	function createRandomPokemon() internal returns(uint) {
		// Avoid creating legendary pokemon. Don't want to make the game too easy :)
		uint _pokemonNumber = (block.number + block.difficulty) % (basePokemons.length - 10);
		uint _originPokemonNumber = origin[_pokemonNumber] - 1;
		uint randDna = _generateRandomDna("NoName");
		return _createPokemon("NoName", randDna, 0, 0, _originPokemonNumber);
	}

}