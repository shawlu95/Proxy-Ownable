

const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");

async function main() {
  await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await upgrades.deployProxy(Greeter, ["Hello, Hardhat!"]);
  console.log("Greeter deployed to:", greeter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
