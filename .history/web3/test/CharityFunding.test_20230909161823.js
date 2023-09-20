const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CharityFunding", function() {
  let CharityFunding;
  let charityFunding;
  let owner;

  before(async function() {
    CharityFunding = await ethers.getContractFactory("CharityFunding");
    [owner] = await ethers.getSigners();

    charityFunding = await CharityFunding.deploy();
    await charityFunding.deployed();
  });

  describe("Creating a Campaign", function() {
    it("Should be able to create a campaign", async function() {
      const futureDate = Math.floor(new Date().getTime() / 1000) + 1000; // Current time in seconds + 1000 seconds
      await charityFunding.createCampaign(
        owner.address,
        "Help Children",
        "This is a test campaign",
        10,
        futureDate,
        "image.png"
      );
      expect(await charityFunding.numberOfCampaigns()).to.equal(1);
    });
  });
});
