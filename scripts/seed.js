
function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const ether = (n) => {
  const weiBigNumber = ethers.utils.parseEther(n.toString());
  const wei = weiBigNumber.toString();
  return wei
}
const tokens = (n) => ether(n)


const seed = async(tokenContract,exchangeContract) => {
  try {
      console.log("Seed start")
    const [sender, receiver, deployer, user4] = await ethers.getSigners();
    var ETHER = "0x0000000000000000000000000000000000000000";
    // Get the contract to deploy
    // const Token = await ethers.getContractFactory("Token");
    // const Exchange = await ethers.getContractFactory("Exchange");

    const depositeETH = ether("5000");

    // var tokenContract = await Token.deploy();
    // var exchangeContract = await Exchange.deploy(deployer.address, 10);

    await tokenContract.connect(sender).transfer(receiver.address, tokens(10000));
    await tokenContract
      .connect(receiver)
      .approve(exchangeContract.address, tokens(10000));

    await exchangeContract
      .connect(sender)
      .depositeEther({ value: depositeETH });
    await exchangeContract.connect(user4).depositeEther({ value: depositeETH });
    await exchangeContract
      .connect(receiver)
      .depositeToken(tokenContract.address, tokens(10000));

    var result;
    var event;
    var orderId;
    //Cancel order

    result = await exchangeContract
      .connect(receiver)
      .makeOrder(tokenContract.address, tokens(10), ETHER, ether(0.05));
    event = await result.wait();
    orderId = event.events[0].args.id;
    await exchangeContract.connect(receiver).cancelOrder(orderId);

    await wait(20);
    // Make & Fill orders

    for (i = 1; i <= 15; i++) {
      console.log("Buy token start")
    result = await exchangeContract
      .connect(receiver)
      .makeOrder(
        tokenContract.address,
        tokens(10*i),
        ETHER,
        ether(0.01*i)
      );
    event = await result.wait();
    orderId = event.events[0].args.id;
    console.log(orderId)
    await exchangeContract.connect(user4).fillOrder(orderId);
    await wait(1000*i);
    console.log("Buy token end")
  }

    await wait(30000);

    for (i = 1; i <= 15; i++) {
      console.log("sell token start")
    result = await exchangeContract
      .connect(user4)
      .makeOrder(
        ETHER,
        ether(0.01*i),
        tokenContract.address,
        tokens(10*i)
      );
    event = await result.wait();
    orderId = event.events[0].args.id;
    console.log(orderId)
    await exchangeContract.connect(receiver).fillOrder(orderId);
    await wait(1000*i);
    console.log("Sell token end")
  }



    //USER 1 make 10 orders
    for (i = 1; i <= 10; i++) {
      await exchangeContract
        .connect(receiver)
        .makeOrder(
          tokenContract.address,
          tokens(10 * i),
          ETHER,
          ether(0.01)
        );
      await wait(10);
    }

    //USER 2 make 10 orders
    for (i = 1; i <= 10; i++) {
      await exchangeContract
        .connect(user4)
        .makeOrder(
          ETHER,
          ether(0.01),
          tokenContract.address,
          tokens(10 * i)
        );
      await wait(10);
    }

    console.log("Seed end")

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    seed
}
