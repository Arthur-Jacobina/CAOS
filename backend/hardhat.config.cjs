require("@nomicfoundation/hardhat-toolbox");

const proxy_url = "https://devnet.neonevm.org";
const network_id = 245022926;

// Private key for the test account
// NOTE: Replace the private key by your own and make sure it has non-zero NEON balance


module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "neonevm",
  networks: {
    hardhat: {},
    neonevm: {
      url: proxy_url,
      network_id: network_id,
      chainId: network_id,
      allowUnlimitedContractSize: false,
      timeout: 1000000,
      isFork: true,
    },
  },
  etherscan: {
    apiKey: {
      neonevm: "test",
    },
    customChains: [
      {
        network: "neonevm",
        chainId: network_id,
        urls: {
          apiURL: "https://devnet-api.neonscan.org/hardhat/verify",
          browserURL: "https://devnet.neonscan.org",
        },
      },
    ],
  },
};