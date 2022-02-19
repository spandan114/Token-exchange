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
      await tokenContract
        .connect(owner)
        .approve(exchangeContract.address, 1000);
      const depositedToken = await exchangeContract
        .connect(owner)
        .depositeToken(tokenContract.address, 1000);

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
        exchangeContract.connect(address2).depositeToken(ETHER, 10)
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
        .depositeEther({ value: ethers.utils.parseEther("1") });

      const event = await depositeEther.wait();

      expect(event.events.length).to.equal(1);
      expect(event.events[0].event).to.equal("Deposite");
      expect(event.events[0].args.token).to.equal(ETHER);
      expect(event.events[0].args.user).to.equal(address4.address);
      expect(event.events[0].args.amount).to.equal(
        ethers.utils.parseEther("1")
      );
      expect(event.events[0].args.balance).to.equal(
        ethers.utils.parseEther("1")
      );

      const etherBalance = await exchangeContract.tokens(
        ETHER,
        address4.address
      );

      expect(etherBalance).to.equal(ethers.utils.parseEther("1"));
    });
  });

  describe("Withdraw ether", () => {
    it(`Failed if user doesn't have enough ether`, async () => {
      await expect(
        exchangeContract
          .connect(address2)
          .withdrawEther(ethers.utils.parseEther("1"))
      ).to.be.revertedWith("Account balance low");
    });

    it(`Withdraw ether from account`, async () => {
      await exchangeContract
        .connect(address4)
        .depositeEther({ value: ethers.utils.parseEther("2") });

      const withdrawEther = await exchangeContract
        .connect(address4)
        .withdrawEther(ethers.utils.parseEther("1"));

      const event = await withdrawEther.wait();

      expect(event.events.length).to.equal(1);
      expect(event.events[0].event).to.equal("Withdraw");
      expect(event.events[0].args.token).to.equal(ETHER);
      expect(event.events[0].args.user).to.equal(address4.address);
      expect(event.events[0].args.amount).to.equal(
        ethers.utils.parseEther("1")
      );
      expect(event.events[0].args.balance).to.equal(
        ethers.utils.parseEther("2")
      );
    });
  });

  describe("Withdraw Token", () => {
    it(`Failed if user doesn't have enough token`, async () => {
      await expect(
        exchangeContract
          .connect(address2)
          .withdrawToken(tokenContract.address, 10)
      ).to.be.revertedWith("Account balance low");
    });

    it(`Withdraw token from account`, async () => {
      await tokenContract
        .connect(owner)
        .approve(exchangeContract.address, 1000);
      await exchangeContract
        .connect(owner)
        .depositeToken(tokenContract.address, 1000);
      const withdrawToken = await exchangeContract
        .connect(owner)
        .withdrawToken(tokenContract.address, 10);

      const event = await withdrawToken.wait();

      expect(event.events.length).to.equal(2);
      expect(event.events[1].event).to.equal("Withdraw");
      expect(event.events[1].args.token).to.equal(tokenContract.address);
      expect(event.events[1].args.user).to.equal(owner.address);
      expect(event.events[1].args.amount).to.equal(10);
      expect(event.events[1].args.balance).to.equal("1990");
    });
  });

  describe("Check user token balance", () => {
    it(`Token balance must 1990`, async () => {
      const userBalance = await exchangeContract.balanceOf(
        owner.address,
        tokenContract.address
      );
      expect(userBalance).to.equal("1990");
    });
  });

  describe("Make order", () => {
    it(`Order token`, async () => {
       const exchangeToken = await exchangeContract.connect(address2).makeOrder(tokenContract.address, 1, ETHER, 1);
     
        const event = await exchangeToken.wait();
        expect(event.events.length).to.equal(1);
        expect(event.events[0].event).to.equal("Order");
        expect(event.events[0].args.user).to.equal(address2.address);
        expect(event.events[0].args.tokenGet).to.equal(ETHER);
        expect(event.events[0].args.tokenGive).to.equal(tokenContract.address);
        expect(event.events[0].args.amountGet).to.equal(1);
        expect(event.events[0].args.amountGive).to.equal(1);
        expect(event.events[0].args.timestamp).to.gt(0)
   
    });
    it(`Track the newly created order`, async () => {
       const orderCount = await exchangeContract.orderCount(); 
       expect(orderCount).to.gt(0);
       const orders = await exchangeContract.orders(1); 

       expect(orders.id).to.equal(1);
       expect(orders.user).to.equal(address2.address);
       expect(orders.tokenGet).to.equal(ETHER);
       expect(orders.tokenGive).to.equal(tokenContract.address);
       expect(orders.amountGet).to.equal(1);
       expect(orders.amountGive).to.equal(1);
       expect(orders.timestamp).to.gt(0)
    })
  });

  describe("Cancel order", () => {
    
    it(`Cancel order`, async () => {
      const canceledOrder = await exchangeContract.connect(address2).cancelOrder(1);
      const event = await canceledOrder.wait();
      expect(event.events.length).to.equal(1);
      expect(event.events[0].event).to.equal("CancelOrder");
      expect(event.events[0].args.user).to.equal(address2.address);
      expect(event.events[0].args.tokenGet).to.equal(ETHER);
      expect(event.events[0].args.tokenGive).to.equal(tokenContract.address);
      expect(event.events[0].args.amountGet).to.equal(1);
      expect(event.events[0].args.amountGive).to.equal(1);
      expect(event.events[0].args.timestamp).to.gt(0)
    })

    it(`Cancel invalid order`, async () => {
   
      await expect(
        exchangeContract.connect(address5).cancelOrder(1)
      ).to.be.revertedWith("You are not create this order");

    })

  })

  describe("Handle trade", () => {
    it(`Fill order`, async () => {
      await exchangeContract.connect(owner).makeOrder(tokenContract.address, 1, ETHER, 1);
      const filledOrder = await exchangeContract.connect(address4).fillOrder(2);
      expect(await exchangeContract.orderFilled(2)).to.eq(true)
      const event = await filledOrder.wait();

      expect(event.events[0].event).to.equal("FillOrder");
      expect(event.events[0].args.id).to.equal(2);
      expect(event.events[0].args.user).to.equal(owner.address);
      expect(event.events[0].args.tokenGet).to.equal(ETHER);
      expect(event.events[0].args.tokenGive).to.equal(tokenContract.address);
      expect(event.events[0].args.amountGet).to.equal(1);
      expect(event.events[0].args.amountGive).to.equal(1);
      
    })
    it(`Check account balance`, async () => {
      //TODO:
    })

    it(`Check failed fill order`, async () => {
      //TODO:
    })

  })

});
