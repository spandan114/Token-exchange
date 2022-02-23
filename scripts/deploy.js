const hre = require("hardhat");
const { seed } = require("./seed");

async function main() {

  const [deployer] = await hre.ethers.getSigners();
  console.log(deployer.address)
  // We get the contract to deploy
  const Token = await hre.ethers.getContractFactory("Token");
  const Exchange = await hre.ethers.getContractFactory("Exchange");
  
  const token = await Token.deploy();
  const exchange = await Exchange.deploy(deployer.address,10);

  await token.deployed();
  await exchange.deployed();

  await seed(token,exchange)
  
   console.log("token deployed to:", token.address);
   console.log("exchange deployed to:", exchange.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
