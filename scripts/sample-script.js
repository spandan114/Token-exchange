const hre = require("hardhat");
require("@nomiclabs/hardhat-ethers");

async function main() {

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const Token = await hre.ethers.getContractFactory("Token");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  const token = await Token.deploy();

  await greeter.deployed();
  await token.deployed();

  console.log("Greeter deployed to:", greeter.address);
  console.log("token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
