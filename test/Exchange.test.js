const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Exchange", async () => {
  var owner;
  var address1;
  var address2;
  var address4;
  var address5;

  var feeAccount;
  var feePercent = 10;
  var exchangeContract;

  [owner, address1, address2,feeAccount,address4,address5, ...address] = await ethers.getSigners();
//   beforeEach(async () => {
   const Exchange = await ethers.getContractFactory("Exchange"); //create instance
   exchangeContract = await Exchange.deploy(feeAccount.address,feePercent); //Deploy contract
//   })
 
  describe("Exchange contract deployment", () => {
    it(`feeAccount must be ${feeAccount.address}`, async () => {
      expect(await exchangeContract.feeAccount()).to.equal(feeAccount.address);
    });
    it(`feePercent must be ${feePercent}`, async () => {
        expect(await exchangeContract.feePercent()).to.equal(feePercent);
      });
})



});
