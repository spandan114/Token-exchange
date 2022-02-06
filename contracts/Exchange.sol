//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";

contract Exchange {
// Deposite & withdraw fund
// Manage order - Make or Cancel 
// Handle trade - charge fee

address public feeAccount;
uint256 public feePercent;
mapping(address=>mapping(address=>uint256)) public tokens;

event Deposite(address indexed token, address indexed user, uint256 amount, uint256 balance);

constructor(address _feeAccount,uint256 _feePercent){
    feeAccount = _feeAccount;
    feePercent = _feePercent;
}

function depositeToken(address _token,uint256 _amount) public {
  // which ERC-20 token ?
  // How much amount ?
  // Send token to this contract
  // Manage Deposite balance
  // emit event
  
  //TODO: Reject eth deposite... 
  require(Token(_token).transferFrom(msg.sender, address(this), _amount));
  tokens[_token][msg.sender] += _amount;
  emit Deposite(_token,msg.sender,_amount,tokens[_token][msg.sender]);
}

}