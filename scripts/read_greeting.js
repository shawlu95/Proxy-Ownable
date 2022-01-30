

const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  await hre.run('compile');

  // We get the contract to deploy
  const GreeterV2 = await ethers.getContractFactory("GreeterV2");

  const address = "0x3eC262Abe63aa1F7CB81565FB560d2f7f1CEC0Be"
  const greeter = GreeterV2.attach(address);

  console.log("Greeting:", await greeter.greet());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
