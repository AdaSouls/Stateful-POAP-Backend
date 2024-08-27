import { ethers } from "hardhat";
import dotenv from "dotenv";
import path from "path";

// const ganache: Record<string, string> = {};
dotenv.config({ path: path.join(__dirname, "../.env") });

const { ADDRESS_0, ADDRESS_1 } = process.env;

async function deployPoap() {
  const Poap = await ethers.getContractFactory("Poap");
  const poap = await Poap.deploy("Poap", "POAP", ADDRESS_1 as string);
  console.log("Poap deployed to:", poap);
  return poap;
}

async function deploySPoap() {
  const SoulboundPoap = await ethers.getContractFactory("SoulboundPoap");
  const sPoap = await SoulboundPoap.deploy(
    "SouldBound",
    "SOUL",
    ADDRESS_1 as string
  );
  console.log("SoulboundPoap deployed to:", sPoap);
  return sPoap;
}

async function deployCSPoap() {
  const ConsensualSoulboundPoap = await ethers.getContractFactory(
    "ConsensualSoulboundPoap"
  );
  const cSPoap = await ConsensualSoulboundPoap.deploy(
    "ConsensualSoulbound",
    "CONS",
    ADDRESS_1 as string
  );
  console.log("ConsensualSoulboundPoap deployed to:", cSPoap);
  return cSPoap;
}

async function main() {
  await deployPoap();
  await deploySPoap();
  await deployCSPoap(); // Add as many deployments as needed
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
