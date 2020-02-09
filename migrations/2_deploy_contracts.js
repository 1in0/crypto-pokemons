var PokemonCardFactory = artifacts.require("PokemonCardFactory");

module.exports = function(deployer) {
  deployer.deploy(PokemonCardFactory);
};