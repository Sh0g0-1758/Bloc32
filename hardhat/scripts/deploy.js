// imports
const { ethers, run, network, hre } = require("hardhat");

// async main
async function main() {
    try {
        console.log("Yo bro");
        const simpleStorage = await ethers.deployContract("SimpleStorage");
        console.log("Deploying, please wait...");
        await simpleStorage.waitForDeployment();
        console.log(`the contract is deployed at ${simpleStorage.target}`);
        if (
            network.config.chainId == 11155111 &&
            process.env.etherscan_api_key
        ) {
            await verify(simpleStorage.target, []);
        }
        const currentValue = await simpleStorage.retrieve();
        console.log(`the currrent value is ${currentValue}`);
        await simpleStorage.store(69);
        const updatedValue = await simpleStorage.retrieve();
        console.log(`the updated value is ${updatedValue}`);
    } catch (e) {
        console.log(e);
    }
}

async function verify(contractAddress, args) {
    console.log("verifying contract ...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified !");
        } else {
            console.log(e);
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
