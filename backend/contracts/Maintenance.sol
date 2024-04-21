// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

error NotOwner();

import "./PriceConverter.sol";

contract Maintenance {

    address public immutable i_owner;
    using PriceConverter for uint256;

    constructor() {
        i_owner = msg.sender;
    }

    struct MaintenanceRequest {
        string name;
        uint256 apartment;
        address residentWallet;
        string description;
        uint256 costInUsd;
        uint256 priorityOrder;
        bool paid;
    }

    MaintenanceRequest[] public maintenanceRequest;
    mapping(address => uint256) public addressToAmountPayed;
    mapping(address => bool) public inDebt;

    function addRequest (string memory _name, uint256 _apartment, address _residentWallet, string memory _description, uint256 _costInUsd, uint256 _priorityOrder) public {
        require(_priorityOrder >= 0 && _priorityOrder <= 2, "Priority must be between 0 and 2");
        bool found = false;
        for(uint256 i = 0; i < maintenanceRequest.length; i++) {
            if (maintenanceRequest[i].residentWallet == _residentWallet) {
                maintenanceRequest[i].costInUsd += _costInUsd;
                maintenanceRequest[i].description = string(abi.encodePacked(maintenanceRequest[i].description, ", ", _description));
                if(_priorityOrder > maintenanceRequest[i].priorityOrder) {
                    maintenanceRequest[i].priorityOrder = _priorityOrder;
                }
                found = true;
                break;
            }
        }
        if(!found){
            maintenanceRequest.push(MaintenanceRequest(_name, _apartment,  _residentWallet, _description, _costInUsd, _priorityOrder, false));
            inDebt[_residentWallet] = true;
        }
    }

    function getMaintenanceCostByAddress(address _wallet) public view returns (uint256) {
        for(uint256 i = 0; i < maintenanceRequest.length; i++) {
            if (maintenanceRequest[i].residentWallet == _wallet) {
                return maintenanceRequest[i].costInUsd;
            }
        }
        revert("Maintenance request not registered!");
    }

    function pay() public payable {
        uint256 amountDue = getMaintenanceCostByAddress(msg.sender);
        require(msg.value.getConversionRate() >= amountDue * 1e18, "Didn't send enough!");
        addressToAmountPayed[msg.sender] = msg.value;
        inDebt[msg.sender] = false;
        for (uint256 i = 0; i < maintenanceRequest.length; i++){
            if(maintenanceRequest[i].residentWallet == msg.sender){
                maintenanceRequest[i].paid = true;
                break;
            }
        }
    }

    function withdraw() public onlyOwner {  
        for(uint256 i = 0; i < maintenanceRequest.length; i++) {
           if(maintenanceRequest[i].paid == true) {
                delete maintenanceRequest[i];
           }
        }
        cleanUpMaintenanceRequestArray();
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed!");
    }

    function cleanUpMaintenanceRequestArray() internal {
        uint256 i = 0;
        while (i < maintenanceRequest.length) {
            if (maintenanceRequest[i].costInUsd == 0) {
                if (i != maintenanceRequest.length - 1) {
                    maintenanceRequest[i] = maintenanceRequest[maintenanceRequest.length - 1];
                }
                maintenanceRequest.pop();
            } else {
                i++;
            }
        }
    }

    function getMaxPriority() public view returns (address) {
        uint256 maxPriority = 0;
        require(maintenanceRequest.length > 0, "No requests");
        address wallet = maintenanceRequest[0].residentWallet;
        
        for (uint256 i = maintenanceRequest.length; i > 0; i--) {
            if (maxPriority <= maintenanceRequest[i - 1].priorityOrder) {
                maxPriority = maintenanceRequest[i - 1].priorityOrder;
                wallet = maintenanceRequest[i - 1].residentWallet;
            }
        }
        return wallet;
    }

    function checkInDebt() public view returns (bool) {
        return inDebt[msg.sender];
    }

    function amountPaid() public view returns (uint256) {
        return addressToAmountPayed[msg.sender];
    }

    modifier onlyOwner {
        require(msg.sender == i_owner, "Sender is not owner!");
        if(msg.sender != i_owner) { revert NotOwner(); }
        _; 
    }
 
    receive() external payable {
        pay();
    }    

    fallback() external payable {
        pay();
    }
}