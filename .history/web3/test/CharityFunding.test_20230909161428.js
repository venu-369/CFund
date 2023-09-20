const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CharityFunding", function() {
  let CharityFunding;
  let charityFunding;

  before(async function() {
    // Retrieve the ContractFactory and Signers here.
    CharityFunding = await ethers.getContractFactory("CharityFunding");
    [owner] = await ethers.getSigners();

    // Deploy the contract
    charityFunding = await CharityFunding.deploy();
  });

  describe("Creating a Campaign", function() {
    it("Should be able to create a campaign", async function() {
      await charityFunding.createCampaign(
        owner.address,
        "Help Children",
        "This is a test campaign",
        10,
        1631297071,
        "image.png"
      );
      expect(await charityFunding.numberOfCampaigns()).to.equal(1);
    });
  });
});
