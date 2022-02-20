require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
const { ACCOUNT_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
  // defaultNetwork: "rinkeby",
  paths: {
    artifacts: "./client/src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    // rinkeby: {
    //   url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    //   accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    // }
  },
};
