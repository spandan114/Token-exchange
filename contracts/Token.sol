//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
   string public name = "BrownieToken";
   string public symbol = "BW";
   uint256 public decimals = 18;
   uint256 public totalSupply ;

   mapping(address => uint256) public balanceOf;
   mapping(address=>mapping(address=>uint256)) public allowance;

   event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address owner, address spender, uint256 value);

constructor(){
   totalSupply = 1000000 * (10**decimals);
   balanceOf[msg.sender] = totalSupply;
   console.log(msg.sender);
}

function transfer(address _to,uint256 _value)public returns(bool) {
   console.log(balanceOf[msg.sender],_value);
   require(balanceOf[msg.sender] >= _value,"You dont have enough tokens");
   balanceOf[msg.sender] -= _value;
   balanceOf[_to] += _value;
   emit Transfer(msg.sender,_to,_value);
   return true;
}

    function approve(address spender, uint256 amount) external returns (bool){
       allowance[msg.sender][spender] = amount;
       emit Approval(msg.sender,spender,amount);
       return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool){

        require(amount <= balanceOf[sender],'Account balance low');
        //Check sender must have enough amount of token in allowence to transfer
        require(amount <= allowance[sender][msg.sender],'Allowance balance low');
        //Update allowence
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        //Emit event
        emit Transfer(sender,recipient,amount);
        return true;
    }

}