//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";

contract Exchange {
//[x] Deposite & withdraw fund
//[x] Manage order - Make or Cancel 
//[ ] Handle trade - charge fee

address public feeAccount;
uint256 public feePercent;
address ETHER = address(0);
// erc-20 token address => ( my address => no of token)
mapping(address => mapping(address=>uint256)) public tokens;
mapping(uint256 => _Order) public orders;
mapping(uint256 => bool) public canceldOrders;
uint256 public orderCount;

//model the order
struct _Order{
  uint id;
  address user;
  address tokenGet;
  address tokenGive;
  uint amountGet;
  uint amountGive;
  uint timestamp;
}

// Map the order
// Add the order to storage

//Events
event Deposite(address indexed token, address indexed user, uint256 amount, uint256 balance);
event Withdraw(address indexed token, address indexed user, uint256 amount, uint256 balance);
event Order(
  uint id,
  address user,
  address tokenGet,
  address tokenGive,
  uint amountGet,
  uint amountGive,
  uint timestamp
);
event CancelOrder(
  uint id,
  address user,
  address tokenGet,
  address tokenGive,
  uint amountGet,
  uint amountGive,
  uint timestamp
);

constructor(address _feeAccount,uint256 _feePercent){
    feeAccount = _feeAccount;
    feePercent = _feePercent;
}

//FALLBACK : revert if someone bymistake send ether to smartcontract
fallback() external {
  revert();
}

function depositeEther() payable public {
tokens[ETHER][msg.sender] += msg.value;
emit Deposite(ETHER,msg.sender,msg.value,tokens[ETHER][msg.sender]);
}

function depositeToken(address _token,uint256 _amount) public {
  // Reject eth deposite
  // which ERC-20 token ?
  // How much amount ?
  // Send token to this contract
  // Manage Deposite balance
  // emit event
  
  require(_token != ETHER,"Ether deposite not allowed");
  require(Token(_token).transferFrom(msg.sender, address(this), _amount),"You dont have enough tokens");
  tokens[_token][msg.sender] += _amount;
  emit Deposite(_token,msg.sender,_amount,tokens[_token][msg.sender]);
}

function withdrawEther(uint _amount) public {
  require(tokens[ETHER][msg.sender] > _amount,"Account balance low");
  tokens[ETHER][msg.sender] -= _amount;
  payable(msg.sender).transfer(_amount);
  emit Withdraw(ETHER,msg.sender,_amount,tokens[ETHER][msg.sender]);
}

function withdrawToken(address _token,uint _amount) public {
 // console.log(tokens[_token][msg.sender]);
  require(tokens[_token][msg.sender] > _amount,"Account balance low");
  tokens[_token][msg.sender] -= _amount;
  Token(_token).transfer(msg.sender,_amount);
 // console.log(tokens[_token][msg.sender]);
  emit Withdraw(_token,msg.sender,_amount,tokens[_token][msg.sender]);
}

function balanceOf(address _user,address _token) public view returns(uint){
 return tokens[_token][_user];
}

function makeOrder(address _tokenGive,uint _amountGive,address _tokenGet,uint _amountGet) public{
    orderCount += 1;
    orders[orderCount] = _Order(orderCount,msg.sender,_tokenGet,_tokenGive,_amountGet,_amountGive,block.timestamp);
    emit Order(orderCount,msg.sender,_tokenGet,_tokenGive,_amountGet,_amountGive,block.timestamp);
}

function cancelOrder(uint orderId) public {
  _Order storage _order = orders[orderId];
  
  //User must be same who created the order
  require(address(_order.user) == msg.sender,"You are not create this order");
  //Order must be exists
  require(_order.id == orderId,"Order not exists");
  canceldOrders[orderId]=true;
  emit CancelOrder(orderCount,msg.sender,_order.tokenGet,_order.tokenGive,_order.amountGet,_order.amountGive,_order.timestamp);
}

}