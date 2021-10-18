// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// TODO:
// change from skuCount to vinCount
// change from items mapping to vehicleListings mapping
contract VehicleMarketPlace {
    address public owner = msg.sender;
    uint public skuCount = 0;

    mapping(uint => Item) public items;

    enum State {
        ForSale,
        Sold,
        Shipped,
        Received
    }
    State public state;

    struct Item {
        string name;
        uint sku;
        uint price;
        State state;
        address payable seller;
        address payable buyer;
    }

    event LogForSale(uint sku);
    event LogSold(uint sku);
    event LogShipped(uint sku);
    event LogReceived(uint sku);

    /*
     * Modifiers
     */

    modifier isOwner() {
      require(owner == msg.sender);
      _;
    }

    modifier verifyCaller(address _address) {
      require (msg.sender == _address);
      _;
    }

    modifier verifySeller(uint _sku) {
      require(items[_sku].seller == msg.sender);
      _;
    }

    modifier verifyBuyer(uint _sku) {
      require(items[_sku].buyer == msg.sender);
      _;
    }

    modifier paidEnough(uint256 _price) {
      require(msg.value >= _price);
      _;
    }

    modifier checkValue(uint256 _sku) {
        _;
        uint _price = items[_sku].price;
        uint amountToRefund = msg.value - _price;
        items[_sku].buyer.transfer(amountToRefund);
    }

    modifier forSale(uint _sku) {
      require((items[_sku].seller != address(0)) && (items[_sku].state == State.ForSale), "Not for sale");
      _;
    }
    modifier sold(uint _sku) {
      require((items[_sku].state == State.Sold), "Item has not yet been sold");
      _;
    }
    modifier shipped(uint _sku) {
      require((items[_sku].state == State.Shipped), "Item has not yet been shipped");
      _;
    }
    // modifier shipped(uint _sku) virtual;
    // modifier received(uint _sku) virtual;

    constructor() {
        owner = msg.sender;
        skuCount = 0;
    }

    function addItem(string memory _name, uint256 _price)
        public
        returns (bool)
    {
        // 1. Create a new item and put in array
        items[skuCount] = Item({
          name: _name,
          sku: skuCount,
          price: _price,
          state: State.ForSale,
          seller: payable(msg.sender),
          buyer: payable(address(uint160(address(0))))
        });

        skuCount++;
        emit LogForSale(skuCount);
        return true;
    }

    function buyItem(uint256 sku) payable public forSale(sku) paidEnough(msg.value) {
      Item storage item = items[sku];

      address payable seller = item.seller;
      item.buyer = payable(msg.sender);

      seller.transfer(item.price);
      item.state = State.Sold;

      emit LogSold(sku);
    }

    function shipItem(uint256 sku) public sold(sku) verifySeller(sku) {
      Item storage item = items[sku];
      item.state = State.Shipped;
      emit LogShipped(sku);
    }

    function receiveItem(uint256 sku) public shipped(sku) verifyBuyer(sku) {
      Item storage item = items[sku];
      item.state = State.Received;
      emit LogReceived(sku);
    }

    function fetchItem(uint _sku) public view returns (string memory name, uint sku, uint price, uint state, address seller, address buyer) {
      name = items[_sku].name;
      sku = items[_sku].sku;
      price = items[_sku].price;
      state = uint(items[_sku].state);
      seller = items[_sku].seller;
      buyer = items[_sku].buyer;
      
      return (name, sku, price, state, seller, buyer);
    }
}
