const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CharityFunding", function () {
  let charityFunding;
  let accounts;

  before(async function () {
    accounts = await ethers.getSigners();
    const CharityFunding = await ethers.getContractFactory("CharityFunding");
    charityFunding = await CharityFunding.deploy();
    await charityFunding.deployed();
  });

  // Test for Campaign Creation
  it("should allow campaign creation", async function () {
    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const campaignId = await charityFunding.createCampaign(accounts[0].address, "Test Campaign", "Test Description", 1000, deadline, "imageURL");
    expect(campaignId).to.equal(0);
  });

  // Test for Donations
  it("should allow donations", async function () {
    const campaignId = 0;
    await charityFunding.donateToCampaign(campaignId, { value: 100 });
    const campaign = await charityFunding.campaigns(campaignId);
    expect(campaign.amountCollected).to.equal(100);
  });

  // Test for fetching donators
  it("should return donators and donations", async function () {
    const campaignId = 0;
    const [donators, donations] = await charityFunding.getDonators(campaignId);
    expect(donators.length).to.equal(1);
    expect(donations.length).to.equal(1);
    expect(donations[0]).to.equal(100);
  });

  // Test for fetching all campaigns
  it("should return all campaigns", async function () {
    const campaigns = await charityFunding.getCampaigns();
    expect(campaigns.length).to.equal(1);
    expect(campaigns[0].title).to.equal("Test Campaign");
  });
});
