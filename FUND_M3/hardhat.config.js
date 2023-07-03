require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");
require("hardhat-gas-reporter");
// require("solidity-coverage");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */

const sepolia_url = process.env.sepolia_rpc_url;
const private_key = process.env.PRIVATE_KEY;
const etherscanKey = process.env.etherscan_api_key;
const coin_market_cap_key = process.env.coin_market_cap_key;
module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		sepolia: {
			url: sepolia_url,
			accounts: [private_key],
			chainId: 11155111,
			blockConfirmations: 6,
		},
		localhost: {
			url: "http://0.0.0.0:8545",
			chainId: 1337,
			accounts: [
				"0x1751f9cc075ffafc434347e67ef2049f62f77d9f9f3cb0b14693d746fb90b7db",
			],
		},
	},
	etherscan: {
		apiKey: etherscanKey,
	},
	gasReporter: {
		enabled: false,
		outputFile: "gas-report.txt",
		noColors: true,
		currency: "USD",
		coinmarketcap: coin_market_cap_key,
		token: "MATIC",
	},
	solidity: {
		compilers: [
			{
				version: "0.8.8",
			},
			{
				version: "0.6.6",
			},
		],
	},
	namedAccounts: {
		deployer: {
			default: 0,
		},
		user: {
			default: 1,
		},
	},
};
