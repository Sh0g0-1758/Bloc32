const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
	const { deployer } = await getNamedAccounts();
	const fundMe = await ethers.getContractAt("FundMe", deployer);
	// console.log(fundMe);
	console.log(`Got contract FundMe at ${fundMe.runner.address}`);
	console.log("Funding contract...");
	const transactionResponse = await fundMe.fund({
		value: ethers.parseEther("0.1"),
	});
	await transactionResponse.wait();
	console.log("Funded!");
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
