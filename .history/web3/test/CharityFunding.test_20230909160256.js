const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const { parseEther } = ethers.utils;
const { deployContract } = waffle;

describe("CharityFunding", function () {

  let CharityFunding;
  let charityFunding;

  beforeEach(async function () {
    CharityFunding = await ethers.getContractFactory("CharityFunding");
    charityFunding = await deployContract(
      (await ethers.getSigners())[0],
      CharityFunding,
      []
    );
  });

  describe("Creating a Campaign", function () {
    it("Should be able to create a campaign", async function () {
      const deadline = Math.floor(Date.now() / 1000) + 600; // 10 minutes from now
      const tx = await charityFunding.createCampaign(
        "0xAbc...",
        "Help Children",
        "This is a test campaign",
        parseEther("10"),
        deadline,
        "image.png"
      );
      await tx.wait();
      
      const numOfCampaigns = await charityFunding.numberOfCampaigns();
      expect(numOfCampaigns).to.equal(1);
    });
  });

  describe("Donating to a Campaign", function () {
    it("Should be able to donate", async function () {
      const deadline = Math.floor(Date.now() / 1000) + 600; // 10 minutes from now
      await charityFunding.createCampaign(
        "0xAbc...",
        "Help Children",
        "This is a test campaign",
        parseEther("10"),
        deadline,
        "image.png"
      );

      const donationAmount = parseEther("1");
      await charityFunding.donateToCampaign(0, {
        value: donationAmount,
      });

      const [donators, donations] = await charityFunding.getDonators(0);
      expect(donators.length).to.equal(1);
      expect(donations[0]).to.equal(donationAmount);
    });
  });
});
