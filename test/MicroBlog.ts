import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MicroBlog", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const MicroBlog = await ethers.getContractFactory("MicroBlog");
    const contract = await MicroBlog.deploy();
    return { contract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("can store a new post", async function () {
      const { contract } = await loadFixture(deployContractFixture);
      const content = 'this is a new post';
      await contract.store(content);
      const posts = await contract.getPosts();
      expect(posts.length).to.equal(1);
      expect(posts[0].content).to.equal(content);
    });

    it("can retrieve posts of each author", async function () {
      const { contract, owner, otherAccount } = await loadFixture(deployContractFixture);
      const myContent = 'my content';
      const othersContent = "other's content";
      await contract.store(myContent);
      await contract.connect(otherAccount).store(othersContent);
      const posts1 = await contract.getPostsByAuthor(owner.getAddress());
      expect(posts1[0].content).to.equal(myContent);
      expect(posts1[1].content).to.be.empty;

      const posts2 = await contract.getPostsByAuthor(otherAccount.getAddress());
      expect(posts2[1].content).to.equal(othersContent);
      expect(posts2[0].content).to.be.empty;
    });
  });
});
