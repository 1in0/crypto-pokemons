var PokemonCardMarketplace = artifacts.require("PokemonCardMarketplace");

module.exports = function(deployer) {
  deployer.deploy(PokemonCardMarketplace);
};