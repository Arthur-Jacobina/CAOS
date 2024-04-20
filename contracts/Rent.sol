// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

error NotOwner();

import "./ERC20Token.sol";
import "./PriceConverter.sol";

contract Rent {
     
    address public immutable i_owner;
    ERC20Token public tokenContract;
    using PriceConverter for uint256; 


    struct Residents {
        uint256 apartment;
        uint256 rentValueInUsd;
        address residentWallet;
        bool hasPaidRent;
    }

    Residents[] public residents;

    constructor(address _tokenContract,  Residents[] memory _residents ) {
        i_owner = msg.sender;
        tokenContract = ERC20Token(_tokenContract);
        for(uint256 i = 0; i < _residents.length; i++) {
            residents.push(_residents[i]);
        }
    }

    function getTotalResidents() public view returns (uint256) {
        return residents.length;
    }

    mapping(address => uint256) public addressToAmountPayed;
    mapping(address => bool) public inDebt;

    function addResident (uint256 _apartment, uint256 _rentValueInUsd, address _residentWallet) public {
        residents.push(Residents( _apartment, _rentValueInUsd, _residentWallet, false));
        inDebt[_residentWallet] = true;
    }

    function getRentValueByAddress(address _wallet) public view returns (uint256) {
        for(uint256 i = 0; i < residents.length; i++) {
            if (residents[i].residentWallet == _wallet) {
                return residents[i].rentValueInUsd;
            }
        }
        revert("Address not registered, contact management!");
    }

    function rent() public payable {
        uint256 amountDue = getRentValueByAddress(msg.sender);
        require(msg.value.getConversionRate() >= amountDue * 1e18, "Did not send enough!");
        addressToAmountPayed[msg.sender] = msg.value;
        inDebt[msg.sender] = false;
        tokenContract.transferFromOwner(msg.sender, 5);
        for (uint256 i = 0; i < residents.length; i++){
            if(residents[i].residentWallet == msg.sender){
                residents[i].hasPaidRent = true;
                break;
            }
        }
    }
    
    function withdraw() public onlyOwner {  
        for(uint256 i = 0; i < residents.length; i++) {
            if(!residents[i].hasPaidRent) {
                inDebt[residents[i].residentWallet] = true;
            }
        }
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed!");
    }

    modifier onlyOwner {
        require(msg.sender == i_owner, "Sender is not owner!");
        if(msg.sender != i_owner) { revert NotOwner(); }
        _; 
    }
    
    function checkTokenBalance() public view returns (uint256) {
        return tokenContract.balance(msg.sender);
    }

    function checkInDebt() public view returns (bool) {
        return inDebt[msg.sender];
    }

    receive() external payable {
        rent();
    }    

    fallback() external payable {
        rent();
    }
}
