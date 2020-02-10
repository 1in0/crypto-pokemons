pragma solidity >=0.5.0 <0.6.0;

import "./PokemonCardOwnership.sol";

// 0xe3a0ec5cb60318a00ff9efc6371cfcdb836bbcf2
contract PokemonCardMarketplace is PokemonCardOwnership {

    struct Market {
        address winner;
        address seller;
        uint pokemonId;
        uint price;
        bool ended;
    }

    Market[] public market;
    mapping (uint => bool) private _pokemonInMarket;
    mapping (uint => uint) private _pokemonIdToItemId;
    uint public creationFee = 1.5 finney;

    event SoldPokemon(uint itemId, uint pokemonId, address buyer);
    event NewItem(uint itemId, uint pokemonId, address seller);
    event PriceChange(uint itemId, address seller, uint newPrice);

    modifier isNotOnMarket(uint _pokemonId) {
        require(!_pokemonInMarket[_pokemonId]);
        _;
    }
    
    function isSelling(uint _pokemonId) public view returns(bool) {
        return _pokemonInMarket[_pokemonId];
    }

    /**
    Create item in the market
    **/
    function createItem(uint _pokemonId, uint _price) public payable isNotOnMarket(_pokemonId) {
        require(msg.value >= creationFee);
        Market memory item;
        item.seller = msg.sender;
        item.pokemonId = _pokemonId;
        item.price = _price;
        item.ended = false;
        market.push(item);
        _pokemonInMarket[_pokemonId] = true;
        _pokemonIdToItemId[_pokemonId] = market.length - 1;
        emit NewItem(market.length - 1, _pokemonId, msg.sender);
    }

    function buyItem(uint _itemId) public payable {
        Market storage item = market[_itemId];
        require(msg.value == item.price);
        require(!item.ended);
        uint pokemonId = item.pokemonId;
        item.winner = msg.sender;
        address payable owner = pokemonToOwner[pokemonId];
        owner.transfer(msg.value);
        _transfer(owner, msg.sender, pokemonId);
        _pokemonInMarket[pokemonId] = false;
        _pokemonIdToItemId[pokemonId] = 0;
        emit SoldPokemon(_itemId, pokemonId, msg.sender);
    }

    function changePrice(uint _itemId, uint _newPrice) public {
        Market storage item = market[_itemId];
        uint pokemonId = item.pokemonId;
        require(pokemonToOwner[pokemonId] == msg.sender);
        item.price = _newPrice;
        emit PriceChange(_itemId, msg.sender, _newPrice);
    }

    function getMarketCount() public view returns (uint) {
        return market.length;
    }

    function getPrice(uint itemId) public view returns (uint) {
        return market[itemId].price;
    }

    function setCreationFee(uint _fee) external onlyOwner {
        creationFee = _fee;
    }

    function getItemInfo(uint _itemId) public view returns (address, uint, uint) {
        Market storage item = market[_itemId];
        return (item.seller, item.pokemonId, item.price);
    }

    function getAllMarketplaceItems() external view returns (uint[] memory) {
        uint[] memory result;
        uint counter = 0;
        for (uint i = 0; i < market.length; i++) {
            if (!market[i].ended) {
                result[counter] = i;
                counter = counter.add(1);
            }
        }
        return result;
    }
}
