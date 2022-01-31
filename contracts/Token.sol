//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
   string public name = "BrownieToken";
   string public symbol = "BW";
   uint256 public decimals = 18;
   uint256 public totalSupply ;

   mapping(address => uint256) public balanceOf;

constructor(){
   totalSupply = 1000000 * (10**decimals);
   balanceOf[msg.sender] = totalSupply;
}

function transfer(address _to,uint256 _value)public {
   require(balanceOf[msg.sender] >= _value,"You dont have enough tokens");
   balanceOf[msg.sender] -= _value;
   balanceOf[_to] += _value;
}

}