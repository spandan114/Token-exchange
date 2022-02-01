const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", async () => {

  var owner;
  var address1;
  var address;
  const name = "BrownieToken";
  const symbol = "BW";
  const totalSupply = '1000000000000000000000000';
  var tokenContract

  beforeEach(async () => {
    [owner,address1,address2,...address] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token"); //create instance
    tokenContract = await Token.deploy(); //Deploy contract
  });

 
  describe("Deployment", () => {

    it(`Name should be ${name}`, async () => {
      expect(await tokenContract.name()).to.equal(name);
    });
    it(`Symbol should be ${symbol}`, async () => {
      expect(await tokenContract.symbol()).to.equal(symbol);
    });
    it(`Total supply should be ${totalSupply}`, async () => {
      const supply = await tokenContract.totalSupply()
      expect(supply.toString()).to.equal(totalSupply);
    });
    it(`Assign total supply to deployer`, async () => {
      const ownerToken = await tokenContract.balanceOf(owner.address)
      const supply = await tokenContract.totalSupply()
      expect(ownerToken.toString()).to.equal(supply.toString());
    });
  });

  describe("Transfer", () => {
    it("transfer token",async()=>{
      const transferToken = await tokenContract.transfer(address1.address,10,{from:owner.address})
      const event = await transferToken.wait()

      expect(event.events.length).to.equal(1);
      expect(event.events[0].event).to.equal("Transfer");
      expect(event.events[0].args.from).to.equal(owner.address);
      expect(event.events[0].args.to).to.equal(address1.address);
      expect(event.events[0].args.value.toNumber()).to.equal(10);

      const ownerToken = await tokenContract.balanceOf(owner.address)
      const address1Token = await tokenContract.balanceOf(address1.address)
      expect(BigInt(ownerToken).toString()).to.equal("999999999999999999999990")
      expect(address1Token.toString()).to.equal("10")
      
    })
    it("Should fail if user doesn't have enough token ", async ()=>{
      const initialBalance = await tokenContract.balanceOf(owner.address);
      await expect(tokenContract.connect(address1).transfer(owner.address,2)).to.be.revertedWith("You dont have enough tokens")
      const currentBalance = await tokenContract.balanceOf(owner.address);
      expect(currentBalance.toString()).to.equal(initialBalance.toString());
   })
  })

});
