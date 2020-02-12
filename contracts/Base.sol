pragma solidity >=0.5.0 <0.6.0;

import "./Ownable.sol";

contract Base is Ownable {
	
	struct BaseStats {
		uint32 hp;
		uint32 attack;
		uint32 defense;
		uint32 specialAttack;
		uint32 specialDefense;
		uint32 speed;
	}

	struct BasePokemon {
		string name;
		uint number;
		string type1;
		string type2;
		uint catch_rate;
		bool legendary;
		BaseStats stats;
	}

	mapping (uint => uint) internal evolution;
	mapping (uint => uint) internal origin;
	BasePokemon[] basePokemons;

    function getPokemonName(uint pokemonNumber) public view returns (string memory){
        return basePokemons[pokemonNumber-1].name;
    }

    function getBasicPokemonInfo(uint pokemonNumber) public view returns (string memory, string memory, string memory, bool) {
    	BasePokemon storage basePokemon = basePokemons[pokemonNumber-1];
    	return (basePokemon.name, basePokemon.type1, basePokemon.type2, basePokemon.legendary);
    }

	constructor() public {
		_addBasePokemons();
		_addEvolutions();
		_addOrigins();
	}

	function _addBasePokemons() private {
		basePokemons.push(BasePokemon("Bulbasaur", 1, "Grass", "Poison", 582, false, BaseStats(45, 49, 49, 65, 65, 45)));
		basePokemons.push(BasePokemon("Ivysaur", 2, "Grass", "Poison", 495, false, BaseStats(60, 62, 63, 80, 80, 60)));
		basePokemons.push(BasePokemon("Venusaur", 3, "Grass", "Poison", 375, false, BaseStats(80, 82, 83, 100, 100, 80)));
		basePokemons.push(BasePokemon("Charmander", 4, "Fire", "nan", 591, false, BaseStats(39, 52, 43, 60, 50, 65)));
		basePokemons.push(BasePokemon("Charmeleon", 5, "Fire", "nan", 495, false, BaseStats(58, 64, 58, 80, 65, 80)));
		basePokemons.push(BasePokemon("Charizard", 6, "Fire", "Flying", 366, false, BaseStats(78, 84, 78, 109, 85, 100)));
		basePokemons.push(BasePokemon("Squirtle", 7, "Water", "nan", 586, false, BaseStats(44, 48, 65, 50, 64, 43)));
		basePokemons.push(BasePokemon("Wartortle", 8, "Water", "nan", 495, false, BaseStats(59, 63, 80, 65, 80, 58)));
		basePokemons.push(BasePokemon("Blastoise", 9, "Water", "nan", 370, false, BaseStats(79, 83, 100, 85, 105, 78)));
		basePokemons.push(BasePokemon("Caterpie", 10, "Bug", "nan", 705, false, BaseStats(45, 30, 35, 20, 20, 45)));
		basePokemons.push(BasePokemon("Metapod", 11, "Bug", "nan", 695, false, BaseStats(50, 20, 55, 25, 25, 30)));
		basePokemons.push(BasePokemon("Butterfree", 12, "Bug", "Flying", 505, false, BaseStats(60, 45, 50, 90, 80, 70)));
		basePokemons.push(BasePokemon("Weedle", 13, "Bug", "Poison", 705, false, BaseStats(40, 35, 30, 20, 20, 50)));
		basePokemons.push(BasePokemon("Kakuna", 14, "Bug", "Poison", 695, false, BaseStats(45, 25, 50, 25, 25, 35)));
		basePokemons.push(BasePokemon("Beedrill", 15, "Bug", "Poison", 505, false, BaseStats(65, 90, 40, 45, 80, 75)));
		basePokemons.push(BasePokemon("Pidgey", 16, "Normal", "Flying", 649, false, BaseStats(40, 45, 40, 35, 35, 56)));
		basePokemons.push(BasePokemon("Pidgeotto", 17, "Normal", "Flying", 551, false, BaseStats(63, 60, 55, 50, 50, 71)));
		basePokemons.push(BasePokemon("Pidgeot", 18, "Normal", "Flying", 421, false, BaseStats(83, 80, 75, 70, 70, 101)));
		basePokemons.push(BasePokemon("Rattata", 19, "Normal", "nan", 647, false, BaseStats(30, 56, 35, 25, 35, 72)));
		basePokemons.push(BasePokemon("Raticate", 20, "Normal", "nan", 487, false, BaseStats(55, 81, 60, 50, 70, 97)));
		basePokemons.push(BasePokemon("Spearow", 21, "Normal", "Flying", 638, false, BaseStats(40, 60, 30, 31, 31, 70)));
		basePokemons.push(BasePokemon("Fearow", 22, "Normal", "Flying", 458, false, BaseStats(65, 90, 65, 61, 61, 100)));
		basePokemons.push(BasePokemon("Ekans", 23, "Poison", "nan", 612, false, BaseStats(35, 60, 44, 40, 54, 55)));
		basePokemons.push(BasePokemon("Arbok", 24, "Poison", "nan", 462, false, BaseStats(60, 85, 69, 65, 79, 80)));
		basePokemons.push(BasePokemon("Pikachu", 25, "Electric", "nan", 580, false, BaseStats(35, 55, 40, 50, 50, 90)));
		basePokemons.push(BasePokemon("Raichu", 26, "Electric", "nan", 415, false, BaseStats(60, 90, 55, 90, 80, 110)));
		basePokemons.push(BasePokemon("Sandshrew", 27, "Ground", "nan", 600, false, BaseStats(50, 75, 85, 20, 30, 40)));
		basePokemons.push(BasePokemon("Sandslash", 28, "Ground", "nan", 450, false, BaseStats(75, 100, 110, 45, 55, 65)));
		basePokemons.push(BasePokemon("Nidoran♀", 29, "Poison", "nan", 625, false, BaseStats(55, 47, 52, 40, 40, 41)));
		basePokemons.push(BasePokemon("Nidorina", 30, "Poison", "nan", 535, false, BaseStats(70, 62, 67, 55, 55, 56)));
		basePokemons.push(BasePokemon("Nidoqueen", 31, "Poison", "Ground", 395, false, BaseStats(90, 92, 87, 75, 85, 76)));
		basePokemons.push(BasePokemon("Nidoran♂", 32, "Poison", "nan", 627, false, BaseStats(46, 57, 40, 40, 40, 50)));
		basePokemons.push(BasePokemon("Nidorino", 33, "Poison", "nan", 535, false, BaseStats(61, 72, 57, 55, 55, 65)));
		basePokemons.push(BasePokemon("Nidoking", 34, "Poison", "Ground", 395, false, BaseStats(81, 102, 77, 85, 75, 85)));
		basePokemons.push(BasePokemon("Clefairy", 35, "Fairy", "nan", 577, false, BaseStats(70, 45, 48, 60, 65, 35)));
		basePokemons.push(BasePokemon("Clefable", 36, "Fairy", "nan", 417, false, BaseStats(95, 70, 73, 95, 90, 60)));
		basePokemons.push(BasePokemon("Vulpix", 37, "Fire", "nan", 601, false, BaseStats(38, 41, 40, 50, 65, 65)));
		basePokemons.push(BasePokemon("Ninetales", 38, "Fire", "nan", 395, false, BaseStats(73, 76, 75, 81, 100, 100)));
		basePokemons.push(BasePokemon("Jigglypuff", 39, "Normal", "Fairy", 630, false, BaseStats(115, 45, 20, 45, 25, 20)));
		basePokemons.push(BasePokemon("Wigglytuff", 40, "Normal", "Fairy", 465, false, BaseStats(140, 70, 45, 85, 50, 45)));
		basePokemons.push(BasePokemon("Zubat", 41, "Poison", "Flying", 655, false, BaseStats(40, 45, 35, 30, 40, 55)));
		basePokemons.push(BasePokemon("Golbat", 42, "Poison", "Flying", 445, false, BaseStats(75, 80, 70, 65, 75, 90)));
		basePokemons.push(BasePokemon("Oddish", 43, "Grass", "Poison", 580, false, BaseStats(45, 50, 55, 75, 65, 30)));
		basePokemons.push(BasePokemon("Gloom", 44, "Grass", "Poison", 505, false, BaseStats(60, 65, 70, 85, 75, 40)));
		basePokemons.push(BasePokemon("Vileplume", 45, "Grass", "Poison", 410, false, BaseStats(75, 80, 85, 110, 90, 50)));
		basePokemons.push(BasePokemon("Paras", 46, "Bug", "Grass", 615, false, BaseStats(35, 70, 55, 45, 55, 25)));
		basePokemons.push(BasePokemon("Parasect", 47, "Bug", "Grass", 495, false, BaseStats(60, 95, 80, 60, 80, 30)));
		basePokemons.push(BasePokemon("Venonat", 48, "Bug", "Poison", 595, false, BaseStats(60, 55, 50, 40, 55, 45)));
		basePokemons.push(BasePokemon("Venomoth", 49, "Bug", "Poison", 450, false, BaseStats(70, 65, 60, 90, 75, 90)));
		basePokemons.push(BasePokemon("Diglett", 50, "Ground", "nan", 635, false, BaseStats(10, 55, 25, 35, 45, 95)));
		basePokemons.push(BasePokemon("Dugtrio", 51, "Ground", "nan", 495, false, BaseStats(35, 80, 50, 50, 70, 120)));
		basePokemons.push(BasePokemon("Meowth", 52, "Normal", "nan", 610, false, BaseStats(40, 45, 35, 40, 40, 90)));
		basePokemons.push(BasePokemon("Persian", 53, "Normal", "nan", 460, false, BaseStats(65, 70, 60, 65, 65, 115)));
		basePokemons.push(BasePokemon("Psyduck", 54, "Water", "nan", 580, false, BaseStats(50, 52, 48, 65, 50, 55)));
		basePokemons.push(BasePokemon("Golduck", 55, "Water", "nan", 400, false, BaseStats(80, 82, 78, 95, 80, 85)));
		basePokemons.push(BasePokemon("Mankey", 56, "Fighting", "nan", 595, false, BaseStats(40, 80, 35, 35, 45, 70)));
		basePokemons.push(BasePokemon("Primeape", 57, "Fighting", "nan", 445, false, BaseStats(65, 105, 60, 60, 70, 95)));
		basePokemons.push(BasePokemon("Growlithe", 58, "Fire", "nan", 550, false, BaseStats(55, 70, 45, 70, 50, 60)));
		basePokemons.push(BasePokemon("Arcanine", 59, "Fire", "nan", 345, false, BaseStats(90, 110, 80, 100, 80, 95)));
		basePokemons.push(BasePokemon("Poliwag", 60, "Water", "nan", 600, false, BaseStats(40, 50, 40, 40, 40, 90)));
		basePokemons.push(BasePokemon("Poliwhirl", 61, "Water", "nan", 515, false, BaseStats(65, 65, 65, 50, 50, 90)));
		basePokemons.push(BasePokemon("Poliwrath", 62, "Water", "Fighting", 390, false, BaseStats(90, 95, 95, 70, 90, 70)));
		basePokemons.push(BasePokemon("Abra", 63, "Psychic", "nan", 590, false, BaseStats(25, 20, 15, 105, 55, 90)));
		basePokemons.push(BasePokemon("Kadabra", 64, "Psychic", "nan", 500, false, BaseStats(40, 35, 30, 120, 70, 105)));
		basePokemons.push(BasePokemon("Alakazam", 65, "Psychic", "nan", 400, false, BaseStats(55, 50, 45, 135, 95, 120)));
		basePokemons.push(BasePokemon("Machop", 66, "Fighting", "nan", 595, false, BaseStats(70, 80, 50, 35, 35, 35)));
		basePokemons.push(BasePokemon("Machoke", 67, "Fighting", "nan", 495, false, BaseStats(80, 100, 70, 50, 60, 45)));
		basePokemons.push(BasePokemon("Machamp", 68, "Fighting", "nan", 395, false, BaseStats(90, 130, 80, 65, 85, 55)));
		basePokemons.push(BasePokemon("Bellsprout", 69, "Grass", "Poison", 600, false, BaseStats(50, 75, 35, 70, 30, 40)));
		basePokemons.push(BasePokemon("Weepinbell", 70, "Grass", "Poison", 510, false, BaseStats(65, 90, 50, 85, 45, 55)));
		basePokemons.push(BasePokemon("Victreebel", 71, "Grass", "Poison", 410, false, BaseStats(80, 105, 65, 100, 70, 70)));
		basePokemons.push(BasePokemon("Tentacool", 72, "Water", "Poison", 565, false, BaseStats(40, 40, 35, 50, 100, 70)));
		basePokemons.push(BasePokemon("Tentacruel", 73, "Water", "Poison", 385, false, BaseStats(80, 70, 65, 80, 120, 100)));
		basePokemons.push(BasePokemon("Geodude", 74, "Rock", "Ground", 600, false, BaseStats(40, 80, 100, 30, 30, 20)));
		basePokemons.push(BasePokemon("Graveler", 75, "Rock", "Ground", 510, false, BaseStats(55, 95, 115, 45, 45, 35)));
		basePokemons.push(BasePokemon("Golem", 76, "Rock", "Ground", 405, false, BaseStats(80, 120, 130, 55, 65, 45)));
		basePokemons.push(BasePokemon("Ponyta", 77, "Fire", "nan", 490, false, BaseStats(50, 85, 55, 65, 65, 90)));
		basePokemons.push(BasePokemon("Rapidash", 78, "Fire", "nan", 400, false, BaseStats(65, 100, 70, 80, 80, 105)));
		basePokemons.push(BasePokemon("Slowpoke", 79, "Water", "Psychic", 585, false, BaseStats(90, 65, 65, 40, 40, 15)));
		basePokemons.push(BasePokemon("Slowbro", 80, "Water", "Psychic", 410, false, BaseStats(95, 75, 110, 100, 80, 30)));
		basePokemons.push(BasePokemon("Magnemite", 81, "Electric", "Steel", 575, false, BaseStats(25, 35, 70, 95, 55, 45)));
		basePokemons.push(BasePokemon("Magneton", 82, "Electric", "Steel", 435, false, BaseStats(50, 60, 95, 120, 70, 70)));
		basePokemons.push(BasePokemon("Farfetch'd", 83, "Normal", "Flying", 548, false, BaseStats(52, 65, 55, 58, 62, 60)));
		basePokemons.push(BasePokemon("Doduo", 84, "Normal", "Flying", 590, false, BaseStats(35, 85, 45, 35, 35, 75)));
		basePokemons.push(BasePokemon("Dodrio", 85, "Normal", "Flying", 440, false, BaseStats(60, 110, 70, 60, 60, 100)));
		basePokemons.push(BasePokemon("Seel", 86, "Water", "nan", 575, false, BaseStats(65, 45, 55, 45, 70, 45)));
		basePokemons.push(BasePokemon("Dewgong", 87, "Water", "Ice", 425, false, BaseStats(90, 70, 80, 70, 95, 70)));
		basePokemons.push(BasePokemon("Grimer", 88, "Poison", "nan", 575, false, BaseStats(80, 80, 50, 40, 50, 25)));
		basePokemons.push(BasePokemon("Muk", 89, "Poison", "nan", 400, false, BaseStats(105, 105, 75, 65, 100, 50)));
		basePokemons.push(BasePokemon("Shellder", 90, "Water", "nan", 595, false, BaseStats(30, 65, 100, 45, 25, 40)));
		basePokemons.push(BasePokemon("Cloyster", 91, "Water", "Ice", 375, false, BaseStats(50, 95, 180, 85, 45, 70)));
		basePokemons.push(BasePokemon("Gastly", 92, "Ghost", "Poison", 590, false, BaseStats(30, 35, 30, 100, 35, 80)));
		basePokemons.push(BasePokemon("Haunter", 93, "Ghost", "Poison", 495, false, BaseStats(45, 50, 45, 115, 55, 95)));
		basePokemons.push(BasePokemon("Gengar", 94, "Ghost", "Poison", 400, false, BaseStats(60, 65, 60, 130, 75, 110)));
		basePokemons.push(BasePokemon("Onix", 95, "Rock", "Ground", 515, false, BaseStats(35, 45, 160, 30, 45, 70)));
		basePokemons.push(BasePokemon("Drowzee", 96, "Psychic", "nan", 572, false, BaseStats(60, 48, 45, 43, 90, 42)));
		basePokemons.push(BasePokemon("Hypno", 97, "Psychic", "nan", 417, false, BaseStats(85, 73, 70, 73, 115, 67)));
		basePokemons.push(BasePokemon("Krabby", 98, "Water", "nan", 575, false, BaseStats(30, 105, 90, 25, 25, 50)));
		basePokemons.push(BasePokemon("Kingler", 99, "Water", "nan", 425, false, BaseStats(55, 130, 115, 50, 50, 75)));
		basePokemons.push(BasePokemon("Voltorb", 100, "Electric", "nan", 570, false, BaseStats(40, 30, 50, 55, 55, 100)));
		basePokemons.push(BasePokemon("Electrode", 101, "Electric", "nan", 420, false, BaseStats(60, 50, 70, 80, 80, 140)));
		basePokemons.push(BasePokemon("Exeggcute", 102, "Grass", "Psychic", 575, false, BaseStats(60, 40, 80, 60, 45, 40)));
		basePokemons.push(BasePokemon("Exeggutor", 103, "Grass", "Psychic", 380, false, BaseStats(95, 95, 85, 125, 65, 55)));
		basePokemons.push(BasePokemon("Cubone", 104, "Ground", "nan", 580, false, BaseStats(50, 50, 95, 40, 50, 35)));
		basePokemons.push(BasePokemon("Marowak", 105, "Ground", "nan", 475, false, BaseStats(60, 80, 110, 50, 80, 45)));
		basePokemons.push(BasePokemon("Hitmonlee", 106, "Fighting", "nan", 445, false, BaseStats(50, 120, 53, 35, 110, 87)));
		basePokemons.push(BasePokemon("Hitmonchan", 107, "Fighting", "nan", 445, false, BaseStats(50, 105, 79, 35, 110, 76)));
		basePokemons.push(BasePokemon("Lickitung", 108, "Normal", "nan", 515, false, BaseStats(90, 55, 75, 60, 75, 30)));
		basePokemons.push(BasePokemon("Koffing", 109, "Poison", "nan", 560, false, BaseStats(40, 65, 95, 60, 45, 35)));
		basePokemons.push(BasePokemon("Weezing", 110, "Poison", "nan", 410, false, BaseStats(65, 90, 120, 85, 70, 60)));
		basePokemons.push(BasePokemon("Rhyhorn", 111, "Ground", "Rock", 555, false, BaseStats(80, 85, 95, 30, 30, 25)));
		basePokemons.push(BasePokemon("Rhydon", 112, "Ground", "Rock", 415, false, BaseStats(105, 130, 120, 45, 45, 40)));
		basePokemons.push(BasePokemon("Chansey", 113, "Normal", "nan", 450, false, BaseStats(250, 5, 5, 35, 105, 50)));
		basePokemons.push(BasePokemon("Tangela", 114, "Grass", "nan", 465, false, BaseStats(65, 55, 115, 100, 40, 60)));
		basePokemons.push(BasePokemon("Kangaskhan", 115, "Normal", "nan", 410, false, BaseStats(105, 95, 80, 40, 80, 90)));
		basePokemons.push(BasePokemon("Horsea", 116, "Water", "nan", 605, false, BaseStats(30, 40, 70, 70, 25, 60)));
		basePokemons.push(BasePokemon("Seadra", 117, "Water", "nan", 460, false, BaseStats(55, 65, 95, 95, 45, 85)));
		basePokemons.push(BasePokemon("Goldeen", 118, "Water", "nan", 580, false, BaseStats(45, 67, 60, 35, 50, 63)));
		basePokemons.push(BasePokemon("Seaking", 119, "Water", "nan", 450, false, BaseStats(80, 92, 65, 65, 80, 68)));
		basePokemons.push(BasePokemon("Staryu", 120, "Water", "nan", 560, false, BaseStats(30, 45, 55, 70, 55, 85)));
		basePokemons.push(BasePokemon("Starmie", 121, "Water", "Psychic", 380, false, BaseStats(60, 75, 85, 100, 85, 115)));
		basePokemons.push(BasePokemon("Mr. Mime", 122, "Psychic", "Fairy", 440, false, BaseStats(40, 45, 65, 100, 120, 90)));
		basePokemons.push(BasePokemon("Scyther", 123, "Bug", "Flying", 400, false, BaseStats(70, 110, 80, 55, 80, 105)));
		basePokemons.push(BasePokemon("Jynx", 124, "Ice", "Psychic", 445, false, BaseStats(65, 50, 35, 115, 95, 95)));
		basePokemons.push(BasePokemon("Electabuzz", 125, "Electric", "nan", 410, false, BaseStats(65, 83, 57, 95, 85, 105)));
		basePokemons.push(BasePokemon("Magmar", 126, "Fire", "nan", 405, false, BaseStats(65, 95, 57, 100, 85, 93)));
		basePokemons.push(BasePokemon("Pinsir", 127, "Bug", "nan", 400, false, BaseStats(65, 125, 100, 55, 70, 85)));
		basePokemons.push(BasePokemon("Tauros", 128, "Normal", "nan", 410, false, BaseStats(75, 100, 95, 40, 70, 110)));
		basePokemons.push(BasePokemon("Magikarp", 129, "Water", "nan", 700, false, BaseStats(20, 10, 55, 15, 20, 80)));
		basePokemons.push(BasePokemon("Gyarados", 130, "Water", "Flying", 360, false, BaseStats(95, 125, 79, 60, 100, 81)));
		basePokemons.push(BasePokemon("Lapras", 131, "Water", "Ice", 365, false, BaseStats(130, 85, 80, 85, 95, 60)));
		basePokemons.push(BasePokemon("Ditto", 132, "Normal", "nan", 612, false, BaseStats(48, 48, 48, 48, 48, 48)));
		basePokemons.push(BasePokemon("Eevee", 133, "Normal", "nan", 575, false, BaseStats(55, 55, 50, 45, 65, 55)));
		basePokemons.push(BasePokemon("Vaporeon", 134, "Water", "nan", 375, false, BaseStats(130, 65, 60, 110, 95, 65)));
		basePokemons.push(BasePokemon("Jolteon", 135, "Electric", "nan", 375, false, BaseStats(65, 65, 60, 110, 95, 130)));
		basePokemons.push(BasePokemon("Flareon", 136, "Fire", "nan", 375, false, BaseStats(65, 130, 60, 95, 110, 65)));
		basePokemons.push(BasePokemon("Porygon", 137, "Normal", "nan", 505, false, BaseStats(65, 60, 70, 85, 75, 40)));
		basePokemons.push(BasePokemon("Omanyte", 138, "Rock", "Water", 545, false, BaseStats(35, 40, 100, 90, 55, 35)));
		basePokemons.push(BasePokemon("Omastar", 139, "Rock", "Water", 405, false, BaseStats(70, 60, 125, 115, 70, 55)));
		basePokemons.push(BasePokemon("Kabuto", 140, "Rock", "Water", 545, false, BaseStats(30, 80, 90, 55, 45, 55)));
		basePokemons.push(BasePokemon("Kabutops", 141, "Rock", "Water", 405, false, BaseStats(60, 115, 105, 65, 70, 80)));
		basePokemons.push(BasePokemon("Aerodactyl", 142, "Rock", "Flying", 385, false, BaseStats(80, 105, 65, 60, 75, 130)));
		basePokemons.push(BasePokemon("Snorlax", 143, "Normal", "nan", 360, false, BaseStats(160, 110, 65, 65, 110, 30)));
		basePokemons.push(BasePokemon("Articuno", 144, "Ice", "Flying", 320, true, BaseStats(90, 85, 100, 95, 125, 85)));
		basePokemons.push(BasePokemon("Zapdos", 145, "Electric", "Flying", 320, true, BaseStats(90, 90, 85, 125, 90, 100)));
		basePokemons.push(BasePokemon("Moltres", 146, "Fire", "Flying", 320, true, BaseStats(90, 100, 90, 125, 85, 90)));
		basePokemons.push(BasePokemon("Dratini", 147, "Dragon", "nan", 600, false, BaseStats(41, 64, 45, 50, 50, 50)));
		basePokemons.push(BasePokemon("Dragonair", 148, "Dragon", "nan", 480, false, BaseStats(61, 84, 65, 70, 70, 70)));
		basePokemons.push(BasePokemon("Dragonite", 149, "Dragon", "Flying", 300, false, BaseStats(91, 134, 95, 100, 100, 80)));
		basePokemons.push(BasePokemon("Mewtwo", 150, "Psychic", "nan", 220, true, BaseStats(106, 110, 90, 154, 90, 130)));
		basePokemons.push(BasePokemon("Mew", 151, "Psychic", "nan", 300, false, BaseStats(100, 100, 100, 100, 100, 100)));
	}

	function _addEvolutions() private {
		evolution[1] = 2;
		evolution[2] = 3;
		evolution[4] = 5;
		evolution[5] = 6;
		evolution[7] = 8;
		evolution[8] = 9;
		evolution[10] = 11;
		evolution[11] = 12;
		evolution[13] = 14;
		evolution[14] = 15;
		evolution[16] = 17;
		evolution[17] = 18;
		evolution[19] = 20;
		evolution[21] = 22;
		evolution[23] = 24;
		evolution[25] = 26;
		evolution[27] = 28;
		evolution[29] = 30;
		evolution[30] = 31;
		evolution[32] = 33;
		evolution[33] = 34;
		evolution[35] = 36;
		evolution[37] = 38;
		evolution[39] = 40;
		evolution[41] = 42;
		evolution[43] = 44;
		evolution[44] = 45;
		evolution[46] = 47;
		evolution[48] = 49;
		evolution[50] = 51;
		evolution[52] = 53;
		evolution[54] = 55;
		evolution[56] = 57;
		evolution[58] = 59;
		evolution[60] = 61;
		evolution[61] = 62;
		evolution[63] = 64;
		evolution[64] = 65;
		evolution[66] = 67;
		evolution[67] = 68;
		evolution[69] = 70;
		evolution[70] = 71;
		evolution[72] = 73;
		evolution[74] = 75;
		evolution[75] = 76;
		evolution[77] = 78;
		evolution[79] = 80;
		evolution[81] = 82;
		evolution[84] = 85;
		evolution[86] = 87;
		evolution[88] = 89;
		evolution[90] = 91;
		evolution[92] = 93;
		evolution[93] = 94;
		evolution[96] = 97;
		evolution[98] = 99;
		evolution[100] = 101;
		evolution[102] = 103;
		evolution[104] = 105;
		evolution[109] = 110;
		evolution[111] = 112;
		evolution[116] = 117;
		evolution[118] = 119;
		evolution[120] = 121;
		evolution[129] = 130;
		evolution[133] = 134;
		evolution[138] = 139;
		evolution[140] = 141;
		evolution[147] = 148;
		evolution[148] = 149;
	}

	function _addOrigins() private {
		origin[1] = 1;
		origin[2] = 1;
		origin[3] = 1;
		origin[4] = 4;
		origin[5] = 4;
		origin[6] = 4;
		origin[7] = 7;
		origin[8] = 7;
		origin[9] = 7;
		origin[10] = 10;
		origin[11] = 10;
		origin[12] = 10;
		origin[13] = 13;
		origin[14] = 13;
		origin[15] = 13;
		origin[16] = 16;
		origin[17] = 16;
		origin[18] = 16;
		origin[19] = 19;
		origin[20] = 19;
		origin[21] = 21;
		origin[22] = 21;
		origin[23] = 23;
		origin[24] = 23;
		origin[25] = 25;
		origin[26] = 25;
		origin[27] = 27;
		origin[28] = 27;
		origin[29] = 29;
		origin[30] = 29;
		origin[31] = 29;
		origin[32] = 32;
		origin[33] = 32;
		origin[34] = 32;
		origin[35] = 35;
		origin[36] = 35;
		origin[37] = 37;
		origin[38] = 37;
		origin[39] = 39;
		origin[40] = 39;
		origin[41] = 41;
		origin[42] = 41;
		origin[43] = 43;
		origin[44] = 43;
		origin[45] = 43;
		origin[46] = 46;
		origin[47] = 46;
		origin[48] = 48;
		origin[49] = 48;
		origin[50] = 50;
		origin[51] = 50;
		origin[52] = 52;
		origin[53] = 52;
		origin[54] = 54;
		origin[55] = 54;
		origin[56] = 56;
		origin[57] = 56;
		origin[58] = 58;
		origin[59] = 58;
		origin[60] = 60;
		origin[61] = 60;
		origin[62] = 60;
		origin[63] = 63;
		origin[64] = 63;
		origin[65] = 63;
		origin[66] = 66;
		origin[67] = 66;
		origin[68] = 66;
		origin[69] = 69;
		origin[70] = 69;
		origin[71] = 69;
		origin[72] = 72;
		origin[73] = 72;
		origin[74] = 74;
		origin[75] = 74;
		origin[76] = 74;
		origin[77] = 77;
		origin[78] = 77;
		origin[79] = 79;
		origin[80] = 79;
		origin[81] = 81;
		origin[82] = 81;
		origin[83] = 83;
		origin[84] = 84;
		origin[85] = 84;
		origin[86] = 86;
		origin[87] = 86;
		origin[88] = 88;
		origin[89] = 88;
		origin[90] = 90;
		origin[91] = 90;
		origin[92] = 92;
		origin[93] = 92;
		origin[94] = 92;
		origin[95] = 95;
		origin[96] = 96;
		origin[97] = 96;
		origin[98] = 98;
		origin[99] = 98;
		origin[100] = 100;
		origin[101] = 100;
		origin[102] = 102;
		origin[103] = 102;
		origin[104] = 104;
		origin[105] = 104;
		origin[106] = 106;
		origin[107] = 107;
		origin[108] = 108;
		origin[109] = 109;
		origin[110] = 109;
		origin[111] = 111;
		origin[112] = 111;
		origin[113] = 113;
		origin[114] = 114;
		origin[115] = 115;
		origin[116] = 116;
		origin[117] = 116;
		origin[118] = 118;
		origin[119] = 118;
		origin[120] = 120;
		origin[121] = 120;
		origin[122] = 122;
		origin[123] = 123;
		origin[124] = 124;
		origin[125] = 125;
		origin[126] = 126;
		origin[127] = 127;
		origin[128] = 128;
		origin[129] = 129;
		origin[130] = 129;
		origin[131] = 131;
		origin[132] = 132;
		origin[133] = 133;
		origin[134] = 133;
		origin[135] = 135;
		origin[136] = 136;
		origin[137] = 137;
		origin[138] = 138;
		origin[139] = 138;
		origin[140] = 140;
		origin[141] = 140;
		origin[142] = 142;
		origin[143] = 143;
		origin[144] = 144;
		origin[145] = 145;
		origin[146] = 146;
		origin[147] = 147;
		origin[148] = 147;
		origin[149] = 147;
		origin[150] = 150;
		origin[151] = 151;
	}

	function max(uint a, uint b) private pure returns (uint) {
		return a > b ? a : b;
	}


}