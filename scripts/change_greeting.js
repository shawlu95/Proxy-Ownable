

const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");

  const address = "0x3eC262Abe63aa1F7CB81565FB560d2f7f1CEC0Be"
  const greeter = Greeter.attach(address);
  console.log("Greeter deployed to:", greeter.address);

  // Owner change greeting message
  const tx = await greeter.setGreeting("Hello again!");
  await tx.wait();

  console.log("Owner address:", await greeter.owner());
  console.log("Owner change greeting message:", await greeter.greet());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
