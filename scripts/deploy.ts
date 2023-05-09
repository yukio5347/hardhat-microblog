import { ethers } from "hardhat";

async function main() {
  const MicroBlog = await ethers.getContractFactory("MicroBlog");
  const contract = await MicroBlog.deploy();
  await contract.deployed();
  console.log("contract address: ", contract.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
