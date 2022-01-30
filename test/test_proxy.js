const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Test proxy", function () {
  let proxy;
  let owner;
  let user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    const Greeter = await ethers.getContractFactory("Greeter");
    proxy = await upgrades.deployProxy(Greeter, ["Hello, Hardhat!"]);
  });

  it("Test read proxy", async function () {
      expect(await proxy.greet()).to.equal("Hello, Hardhat!");
  });

  it("Test owner set greeting", async function() {
      expect(await proxy.owner()).to.equal(owner.address);
      await proxy.setGreeting("Hello again");
      expect(await proxy.greet()).to.equal("Hello again");
  })

  it("Test non-owner set greeting", async function() {
    expect(await proxy.owner()).to.equal(owner.address);
    await expect(proxy.connect(user).setGreeting("Hello again"))
        .to.be.revertedWith("Ownable: caller is not the owner");
    expect(await proxy.greet()).to.equal("Hello, Hardhat!");
  })

  it("Test upgrade proxy", async function() {
      const address = proxy.address;

      await proxy.connect(owner).setGreeting("Old data");

      const GreeterV2 = await ethers.getContractFactory("GreeterV2");
      const upgraded = await upgrades.upgradeProxy(proxy.address, GreeterV2);

      // Address should not change, 
      expect(upgraded.address).to.equal(address);

      // Data should still be available.
      expect(await upgraded.greet()).to.equal("Old data");

      // New function is available
      await upgraded.connect(owner).resetGreeting();
      expect(await proxy.greet()).to.equal("");
  })
});