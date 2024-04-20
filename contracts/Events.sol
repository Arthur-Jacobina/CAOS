// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ERC20Token.sol";
import "./Rent.sol";

interface RentInterface {
    function getTotalResidents() external view returns (uint256);
}

contract Events {
    ERC20Token public tokenContract;
    RentInterface public rentContract;
    address public immutable i_owner;

    constructor(address _tokenContractAddress, address _rentContractAddress) {
        rentContract = RentInterface(_rentContractAddress);
        tokenContract = ERC20Token(_tokenContractAddress);
        i_owner = msg.sender;
    }

    function getTotalResidents() public view returns (uint256) {
        return rentContract.getTotalResidents();
    }

    mapping(address => bool) public hasVoted;
    mapping(address => uint256) public paymentsSent;
    event PaymentSent(address indexed recipient, uint256 value);
    event DepositReceived(address indexed sender, uint256 value);
    
    struct VoteCount {
        uint256 totalVoters;
        uint256 votedYes;
        uint256 votedNo;
    }

    VoteCount public voteCount;

    function voteYes() public {
        require(!hasVoted[msg.sender], "You have already voted.");
        uint256 voteCost = 1; 
        require(tokenContract.balanceOf(msg.sender) >= voteCost, "Insufficient balance to vote.");
        require(tokenContract.transfer(msg.sender, address(this), voteCost));
        hasVoted[msg.sender] = true;
        voteCount.totalVoters++;
        voteCount.votedYes++;
    }

    function voteNo() public {
        require(!hasVoted[msg.sender], "You have already voted.");
        uint256 voteCost = 1; 
        require(tokenContract.balanceOf(msg.sender) >= voteCost, "Insufficient balance to vote.");
        tokenContract.transfer(msg.sender, address(this), voteCost);
        hasVoted[msg.sender] = true;
        voteCount.totalVoters++;
        voteCount.votedNo++;
    }
    function totalVoters() public view returns(uint256) {
        return voteCount.totalVoters;
    }

    function isApproved() public view returns (bool) {
        uint256 approvalPercentage;
        require(totalVoters() == getTotalResidents(), "Not everyone has voted");
        approvalPercentage = (voteCount.votedYes * 100) / voteCount.totalVoters;
        return approvalPercentage > 50; 
    }

    function depositForEvents() public payable onlyOwner {
        emit DepositReceived(msg.sender, msg.value);
    }

    function transferForEventFunds(address payable _recipient, uint256 _value) public onlyOwner {
        require(isApproved(), "Event has not been approved");
        require(_recipient != address(0), "Invalid wallet address");
        require(address(this).balance >= _value, "Insufficient balance");
        _recipient.transfer(_value);
        paymentsSent[_recipient] += _value;

        emit PaymentSent(_recipient, _value);
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    modifier onlyOwner {
        require(msg.sender == i_owner, "Sender is not owner!");
        if(msg.sender != i_owner) { revert NotOwner(); }
        _; 
    }
}
