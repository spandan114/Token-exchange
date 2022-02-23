function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const seed = async(tokenContract,exchangeContract) => {
  try {
      console.log("Seed start")
    const [sender, receiver, deployer, user4] = await ethers.getSigners();
    var ETHER = "0x0000000000000000000000000000000000000000";
    // Get the contract to deploy
    // const Token = await ethers.getContractFactory("Token");
    // const Exchange = await ethers.getContractFactory("Exchange");

    const depositeETH = await ethers.utils.parseEther("50");

    // var tokenContract = await Token.deploy();
    // var exchangeContract = await Exchange.deploy(deployer.address, 10);

    await tokenContract.connect(sender).transfer(receiver.address, 10000);
    await tokenContract
      .connect(receiver)
      .approve(exchangeContract.address, 10000);

    await exchangeContract
      .connect(sender)
      .depositeEther({ value: depositeETH });
    await exchangeContract.connect(user4).depositeEther({ value: depositeETH });
    await exchangeContract
      .connect(receiver)
      .depositeToken(tokenContract.address, 200);

    var result;
    var event;
    var orderId;
    //Cancel order

    result = await exchangeContract
      .connect(receiver)
      .makeOrder(tokenContract.address, 1, ETHER, 1);
    event = await result.wait();
    orderId = event.events[0].args.id;
    await exchangeContract.connect(receiver).cancelOrder(orderId);

    await wait(20);
    // Make & Fill orders
    result = await exchangeContract
      .connect(receiver)
      .makeOrder(
        tokenContract.address,
        50,
        ETHER,
        await ethers.utils.parseEther("0.20")
      );
    event = await result.wait();
    orderId = event.events[0].args.id;
    await exchangeContract.connect(user4).fillOrder(orderId);

    await wait(20);

    result = await exchangeContract
      .connect(receiver)
      .makeOrder(
        tokenContract.address,
        30,
        ETHER,
        await ethers.utils.parseEther("0.12")
      );
    event = await result.wait();
    orderId = event.events[0].args.id;
    await exchangeContract.connect(user4).fillOrder(orderId);

    await wait(20);

    result = await exchangeContract
      .connect(receiver)
      .makeOrder(
        tokenContract.address,
        80,
        ETHER,
        await ethers.utils.parseEther("0.22")
      );
    event = await result.wait();
    orderId = event.events[0].args.id;
    await exchangeContract.connect(user4).fillOrder(orderId);

    //USER 1 make 10 orders
    for (i = 0; i <= 10; i++) {
      await exchangeContract
        .connect(receiver)
        .makeOrder(
          tokenContract.address,
          10 * 1,
          ETHER,
          await ethers.utils.parseEther("0.02")
        );
      await wait(10);
    }

    //USER 2 make 10 orders
    for (i = 0; i <= 10; i++) {
      await exchangeContract
        .connect(user4)
        .makeOrder(
          ETHER,
          await ethers.utils.parseEther("0.01"),
          tokenContract.address,
          10 * i
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
