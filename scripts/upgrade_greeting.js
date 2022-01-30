

const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");

async function main() {
  await hre.run('compile');

  const address = "0x3eC262Abe63aa1F7CB81565FB560d2f7f1CEC0Be"

  const GreeterV2 = await ethers.getContractFactory("GreeterV2");
  const greeterV2 = await upgrades.upgradeProxy(address, GreeterV2);
  console.log("Greeter upgraded:", greeterV2.address);
  console.log("Old message should still be there:", await greeterV2.greet());

  await greeterV2.resetGreeting();
  console.log("New function reset greeting:", await greeterV2.greet());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
