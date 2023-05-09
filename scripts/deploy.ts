import { ethers } from "hardhat";

async function main() {
  const MicroBlog = await ethers.getContractFactory("MicroBlog");
  const contract = await MicroBlog.deploy();
  const deployed = await contract.deployed();
  console.log("deployed address: ", deployed.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
