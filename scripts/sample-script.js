const hre = require("hardhat");
require("@nomiclabs/hardhat-ethers");

async function main() {

  const [owner, address1, address2,address3,address4,address5, ...address] = await hre.ethers.getSigners();
  console.log(address3)
  // We get the contract to deploy
  const Token = await hre.ethers.getContractFactory("Token");
  const Exchange = await hre.ethers.getContractFactory("Exchange");
  
  const token = await Token.deploy();
  const exchange = await Exchange.deploy(address3.address);

  await token.deployed();
  await exchange.deployed();

   console.log("token deployed to:", token.address);
   console.log("exchange deployed to:", exchange.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
