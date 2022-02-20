require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

//require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");
const { ACCOUNT_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "ganache",
  paths: {
    artifacts: "./client/src/artifacts",
  },
  networks: {
    hardhat: {},
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    },
    // rinkeby: {
    //   url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    //   accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    // }
  },
};
