import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      // This is the network name you'll use when deploying
      url: "http://127.0.0.1:7545", // The URL where Ganache is running
      // accounts: ["418562ba017a7050ae968ec01b8db0829320f48484c433f9cc6c6b9a18709a7a"], // List of account private keys to use for transactions on this network
      // You can also use a mnemonic to specify multiple accounts
      accounts: {
        mnemonic:
          "hope glad merry health neither steel dinner siren lawn thing athlete science",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
      },
      gas: 5500000, // Gas limit for your deployments
      // You might not need to specify the gas limit and gas price for Ganache,
      gasPrice: 20000000000, // Gas price for transactions (wei)
      // as it usually has default values set, but you can if necessary
      // chainId: 5777, // Any network (default: none)
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

export default config;
