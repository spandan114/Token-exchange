const { expect } = require("chai");
const { ethers } = require("hardhat");
const { tokens } = require("./helpers");

describe("Exchange", async () => {
  var owner;
  var address1;
  var address2;
  var address4;
  var address5;
  var ETHER = "0x0000000000000000000000000000000000000000";

  var feeAccount;
  var feePercent = 10;
  var exchangeContract;
  var tokenContract;

  [owner, address1, address2, feeAccount, address4, address5, ...address] =
    await ethers.getSigners();

  const tokenDeploy = await ethers.getContractFactory("Token");
  tokenContract = await tokenDeploy.deploy();

  // beforeEach(async () => {
  const exchange = await ethers.getContractFactory("Exchange"); //create instance
  exchangeContract = await exchange.deploy(feeAccount.address, feePercent); //Deploy contract

  // })

  describe("Exchange contract deployment", () => {
    it(`feeAccount must be ${feeAccount.address}`, async () => {
      expect(await exchangeContract.feeAccount()).to.equal(feeAccount.address);
    });
    it(`feePercent must be ${feePercent}`, async () => {
      expect(await exchangeContract.feePercent()).to.equal(feePercent);
    });
  });

  describe("Deposits token", () => {
    it(`Track token deposited`, async () => {
      await tokenContract.connect(owner).approve(exchangeContract.address, 1000);
      const depositedToken = await exchangeContract.connect(owner).depositeToken(tokenContract.address, 1000);

      const event = await depositedToken.wait();

      expect(event.events.length).to.equal(2);
      expect(event.events[1].event).to.equal("Deposite");
      expect(event.events[1].args.token).to.equal(tokenContract.address);
      expect(event.events[1].args.user).to.equal(owner.address);
      expect(event.events[1].args.amount.toNumber()).to.equal(1000);
      expect(event.events[1].args.balance.toNumber()).to.equal(1000);

      //Check contract balance
      const contractBalance = await tokenContract.balanceOf(
        exchangeContract.address
      );
      expect(contractBalance.toString()).to.equal("1000");
      //Check token on exchange
      const tokenBalance = await exchangeContract.tokens(
        tokenContract.address,
        owner.address
      );
      expect(tokenBalance.toString()).to.equal("1000");
    });

    it(`Reject ether deposited`, async () => {
      await expect(
        exchangeContract
          .connect(address2)
          .depositeToken(ETHER, 10)
      ).to.be.revertedWith("Ether deposite not allowed");
    });

    it(`Failed if user doesn't have enough tokens`, async () => {
      await expect(
        exchangeContract
          .connect(address2)
          .depositeToken(tokenContract.address, 10)
      ).to.be.revertedWith("Account balance low");
    });
  });

  describe("Deposits ether", () => {
    it(`Track ether deposited`, async () => {
      const depositeEther = await exchangeContract
      .connect(address4)
      .depositeEther({value: ethers.utils.parseEther("1")});

      const event = await depositeEther.wait();

      expect(event.events.length).to.equal(1);
      expect(event.events[0].event).to.equal("Deposite");
      expect(event.events[0].args.token).to.equal(ETHER);
      expect(event.events[0].args.user).to.equal(address4.address);
      expect(event.events[0].args.amount).to.equal(ethers.utils.parseEther("1"));
      expect(event.events[0].args.balance).to.equal(ethers.utils.parseEther("1"));

      const etherBalance = await exchangeContract.tokens(
        ETHER,
        address4.address
      );

      expect(etherBalance).to.equal(ethers.utils.parseEther("1"));

    });
  });

});
