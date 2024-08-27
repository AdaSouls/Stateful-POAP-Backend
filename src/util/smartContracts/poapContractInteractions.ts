import { ethers } from "ethers";
import dotenv from "dotenv";
import path from "path";
import poapContractJson from "../../../artifacts/contracts/poap-types/Poap.sol/Poap.json";

dotenv.config({ path: path.join(__dirname, "../../../.env") });

const { HH_ACCOUNT_0, HH_ACCOUNT_0_PK, POAP_ADDRESS_HH } = process.env;

const providerRPC = {
  name: "localhost",
  rpc: "http://localhost:8545",
  chainId: 31337,
};

const provider = new ethers.JsonRpcProvider(providerRPC.rpc, {
  chainId: providerRPC.chainId,
  name: providerRPC.name,
});

const poapContractAbi = poapContractJson.abi;
const poapContractAddress = POAP_ADDRESS_HH as string;

const accountFrom = {
  privateKey: HH_ACCOUNT_0_PK as string,
};

let wallet = new ethers.Wallet(accountFrom.privateKey, provider);

const poap = new ethers.Contract(poapContractAddress, poapContractAbi, wallet);

const createContractInteraction = async () => {};

/**
 *
 * @param issuerId
 * @param eventId
 * @param maxSupply
 * @param mintExpiration
 * @param eventOrganizer
 *
 */
export const createEventId = async (
  issuerId: number,
  eventId: number,
  maxSupply: number,
  mintExpiration: number,
  eventOrganizer: string
) => {
  try {
    const createReceipt = await poap.createEventId(
      issuerId,
      eventId,
      maxSupply,
      mintExpiration,
      eventOrganizer
    );
    const receipt = await createReceipt.wait();
    console.log("Transaction submitted:", receipt);
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    return receipt;
  } catch (error) {
    console.error("Failed to create event ID:", error);
    throw error;
  }
};

export const getTokenEventId = async (tokenId: number) => {
  try {
    const txResponse = await poap.tokenEvent(tokenId);
    console.log("Transaction submitted:", txResponse.hash);
    const receipt = await txResponse.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    return receipt;
  } catch (error) {
    console.error("Failed to get Token Event ID:", error);
    throw error;
  }
};

export const getOwner = async () => {
  try {
    const txResponse = await poap.owner();
    console.log("getOwner Transaction response:", txResponse);
    return txResponse;
  } catch (error) {
    console.error("Failed to get Owner:", error);
    throw error;
  }
};

export const isAdmin = async (address: string) => {
  console.log("isAdmin HH_ACCOUNT_0:", HH_ACCOUNT_0);
  const poapContract = new ethers.Contract(
    poapContractAddress,
    poapContractAbi,
    wallet
  );
  try {
    const txResponse = await poap.isAdmin(address);
    console.log("isAdmin Transaction response:", txResponse);
    return txResponse;
  } catch (error) {
    console.error("Failed to check if is Admin:", error);
    throw error;
  }
};

export const mintToken = async (
  issuerId: number,
  eventId: number,
  to: string,
  // initialData: string
) => {
  try {
    // const txResponse = await poap.mintToken(issuerId, eventId, to, initialData);
    const txResponse = await poap.mintToken(issuerId, eventId, to);
    console.log("mintToken Transaction response:", txResponse);
    return txResponse;
  } catch (error) {
    console.error("Failed to mint Token:", error);
    throw error;
  }
};

export const mintEventToManyUsers = async (
  eventId: number,
  to: string[],
  initialData: string
) => {
  try {
    const txResponse = await poap.mintToken(eventId, to, initialData);
    console.log("mintToken Transaction response:", txResponse);
    return txResponse;
  } catch (error) {
    console.error("Failed to mint Event to many Users:", error);
    throw error;
  }
};

export const mintUserToManyEvents = async (
  eventIds: number[],
  to: string,
  initialData: string
) => {
  try {
    const txResponse = await poap.mintToken(eventIds, to, initialData);
    console.log("mintToken Transaction response:", txResponse);
    return txResponse;
  } catch (error) {
    console.error("Failed to mint User to many Events:", error);
    throw error;
  }
};

export const ownerOf = async (tokenId: number) => {
  try {
    const txResponse = await poap.ownerOf(tokenId);
    console.log("mintToken Transaction response:", txResponse);
    return txResponse;
  } catch (error) {
    console.error("Failed to create event ID:", error);
    throw error;
  }
};
