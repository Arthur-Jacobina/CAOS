// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

error NotOwner();

contract Bills {

    address payable public immutable i_owner;
    
    constructor() {
        i_owner = payable(msg.sender);
    }
    
    mapping(address => uint256) public paymentsSent;
    event PaymentSent(address indexed recipient, uint256 value);
    event DepositReceived(address indexed sender, uint256 value);

    modifier onlyOwner() {
        require(msg.sender == i_owner, "Sender is not owner");
        _;
    }

    function depositForBills() public payable onlyOwner {
        emit DepositReceived(msg.sender, msg.value);
    }

    function payBills(address payable _recipient, uint256 _value) public onlyOwner {
        require(_recipient != address(0), "Invalid wallet address");
        require(address(this).balance >= _value, "Insufficient balance");
        _recipient.transfer(_value);
        paymentsSent[_recipient] += _value;

        emit PaymentSent(_recipient, _value);
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
