// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ERC20Token {
    string public name;
    string public symbol;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value);
    address public i_owner;
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
    ) {
        i_owner = msg.sender;
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        balanceOf[i_owner] = totalSupply;
    }

    function balance(address _wallet) public view returns (uint256) {
        return balanceOf[_wallet];
    }

    function transferFromOwner(address _to, uint256 _value) public returns (bool success) {
        require(_to != address(0), "ERC20: transfer to the zero address");
        require(balanceOf[i_owner] >= _value, "ERC20: insufficient balance");
        balanceOf[i_owner] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(i_owner, _to, _value);
        return true;
    }

    function transfer(address _from, address _to, uint256 _value) public returns (bool) {
    require(_from != address(0), "Transfer from the zero address");
    require(_to != address(0), "Transfer to the zero address");
    require(_value <= balanceOf[_from], "Insufficient balance");

    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;

    emit Transfer(_from, _to, _value);
    return true;
}
}

