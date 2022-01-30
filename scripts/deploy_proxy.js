

const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");

async function main() {
  await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await upgrades.deployProxy(Greeter, ["Hello, Hardhat!"]);
  console.log("Greeter deployed to:", greeter.address);

  // Owner change greeting message
  await greeter.setGreeting("Hello again!");
  console.log("Owner change greeting message:", await greeter.greet());

  const GreeterV2 = await ethers.getContractFactory("GreeterV2");
  const greeterV2 = await upgrades.upgradeProxy(greeter.address, GreeterV2);
  console.log("Greeter upgraded:", greeterV2.address);
  console.log("Old message should still be there:", await greeter.greet());

  await greeterV2.resetGreeting();
  console.log("New function reset greeting:", await greeter.greet());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
