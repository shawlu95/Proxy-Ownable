require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');

module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.2"
  },
  networks: {
    rinkeby: {
      chainId: 4,
      url: process.env.RINKEBY_RPC,
      from: process.env.ADMIN_PRIVATE_KEY,
      accounts: [process.env.ADMIN_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_TOKEN
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  }
};