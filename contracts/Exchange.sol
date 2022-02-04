//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Exchange {
// Deposite & withdraw fund
// Manage order - Make or Cancel 
// Handle trade - charge fee

address public feeAccount;
uint256 public feePercent;

constructor(address _feeAccount,uint256 _feePercent){
    feeAccount = _feeAccount;
    feePercent = _feePercent;
}

}