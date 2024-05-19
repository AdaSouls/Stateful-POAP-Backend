import { ethers } from "ethers";
import dotenv from "dotenv";
import path from "path";
// import poapContractJson from "../../../artifacts/contracts/poap-types/Poap.sol/Poap.json";
// import soulboundContractJson from "../../../artifacts/contracts/poap-types/SoulboundPoap.sol/SoulboundPoap.json";
import consensualContractJson from "../../../artifacts/contracts/poap-types/ConsensualSoulboundPoap.sol/ConsensualSoulboundPoap.json";

dotenv.config({ path: path.join(__dirname, "../.env") });

const {
  HH_URL,
  HH_ACCOUNT_0,
  HH_ACCOUNT_0_PK,
  POAP_ADDRESS_HH,
  SOULBOUND_ADDRESS_HH,
  CONSENSUAL_ADDRESS_HH,
} = process.env;

const providerRPC = {
  name: "localhost",
  rpc: "http://localhost:8545",
  chainId: 31337,
};

const provider = new ethers.JsonRpcProvider(providerRPC.rpc, {
  chainId: providerRPC.chainId,
  name: providerRPC.name,
});

// const poapContractAbi = poapContractJson.abi;
const consensualContractBytecode = consensualContractJson.bytecode;
const consensualContractAddress = CONSENSUAL_ADDRESS_HH as string;
// const soulboundContractAbi = soulboundContractJson.abi;
const consensualContractAbi = consensualContractJson.abi;

const accountFrom = {
  privateKey: HH_ACCOUNT_0_PK as string,
};

let wallet = new ethers.Wallet(accountFrom.privateKey, provider);

const consensual = new ethers.Contract(consensualContractAddress, consensualContractAbi, wallet);

export const createEventId = async (
  eventId: number,
  maxSupply: number,
  mintExpiration: number,
  eventOrganizer: string
) => {
  try {
    const createReceipt = await consensual.createEventId(
      eventId,
      maxSupply,
      mintExpiration,
      eventOrganizer
    );
    const receipt = await createReceipt.wait();
    console.log("Transaction submitted:", createReceipt);
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    return receipt;
  } catch (error) {
    console.error("Failed to create event ID:", error);
    throw error;
  }
};

export const getTokenEventId = async (tokenId: number) => {
  try {
    const txResponse = await consensual.tokenEvent(tokenId);
    console.log("Transaction submitted:", txResponse.hash);
    const receipt = await txResponse.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    return receipt;
  } catch (error) {
    console.error("Failed to create event ID:", error);
    throw error;
  }
};

export const getOwner = async () => {
  try {
    const txResponse = await consensual.owner();
    console.log("getOwner Transaction response:", txResponse);
    return txResponse;
  } catch (error) {
    console.error("Failed to create event ID:", error);
    throw error;
  }
};

export const isAdmin = async (address: string) => {
  try {
    const txResponse = await consensual.isAdmin(address);
    console.log("isAdmin Transaction response:", txResponse);
    return txResponse;
  } catch (error) {
    console.error("Failed to create event ID:", error);
    throw error;
  }
};

export const mintToken = async (
  eventId: number,
  to: string,
  initialData: string
) => {
  try {
    const txResponse = await consensual.mintToken(eventId, to, initialData);
    console.log("mintToken Transaction response:", txResponse);
    return txResponse;
  } catch (error) {
    console.error("Failed to create event ID:", error);
    throw error;
  }
};

export const mintEventToManyUsers = async (
  eventId: number,
  to: string[],
  initialData: string
) => {
  try {
    const txResponse = await consensual.mintToken(eventId, to, initialData);
    console.log("mintToken Transaction response:", txResponse);
    return txResponse;
  } catch (error) {
    console.error("Failed to create event ID:", error);
    throw error;
  }
};

export const mintUserToManyEvents = async (
  eventIds: number[],
  to: string,
  initialData: string
) => {
  try {
    const txResponse = await consensual.mintToken(eventIds, to, initialData);
    console.log("mintToken Transaction response:", txResponse);
    return txResponse;
  } catch (error) {
    console.error("Failed to create event ID:", error);
    throw error;
  }
};

export const ownerOf = async (tokenId: number) => {
  try {
    const txResponse = await consensual.ownerOf(tokenId);
    console.log("mintToken Transaction response:", txResponse);
    return txResponse;
  } catch (error) {
    console.error("Failed to create event ID:", error);
    throw error;
  }
};
