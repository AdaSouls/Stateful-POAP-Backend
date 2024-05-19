// import ethers from "ethers"
import { ethers } from "hardhat";
import dotenv from "dotenv";
import path from "path";

// const ganache: Record<string, string> = {};
dotenv.config({ path: path.join(__dirname, "../.env") });

const {ADDRESS_0, ADDRESS_1, HH_ACCOUNT_0} = process.env;

const getEthersSigners = async () => {
  const signers = await ethers.getSigners()
  return signers
}

async function deployPoap(owner: string) {
  const Poap = await ethers.getContractFactory("Poap");
  const poap = await Poap.deploy(
    "Poap",
    "POAP",
    owner
  );
  console.log("Poap deployed to:", poap);
  return poap;
}

async function deploySPoap(owner: string) {
  const SoulboundPoap = await ethers.getContractFactory("SoulboundPoap");
  const sPoap = await SoulboundPoap.deploy("SouldBound", "SOUL", owner);
  console.log("SoulboundPoap deployed to:", sPoap);
  return sPoap;
}

async function deployCSPoap(owner: string) {
  const ConsensualSoulboundPoap = await ethers.getContractFactory(
    "ConsensualSoulboundPoap"
  );
  const cSPoap = await ConsensualSoulboundPoap.deploy("ConsensualSoulbound", "CONS", owner);
  console.log("ConsensualSoulboundPoap deployed to:", cSPoap);
  return cSPoap;
}

async function main() {
  await deployPoap(HH_ACCOUNT_0 as string);
  await deploySPoap(HH_ACCOUNT_0 as string);
  await deployCSPoap(HH_ACCOUNT_0 as string);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
