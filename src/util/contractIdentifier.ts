import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });

const {
  POAP_ADDRESS_HH,
  SOULBOUND_ADDRESS_HH,
  CONSENSUAL_ADDRESS_HH,
} = process.env;

const poapAddress = POAP_ADDRESS_HH as string;
const soulboundAddress = SOULBOUND_ADDRESS_HH as string;
const consensualAddress = CONSENSUAL_ADDRESS_HH as string;

const contractAddresses = {
  poapAddress,
  soulboundAddress,
  consensualAddress,
};

// This function is used to identify the contract address based on the contract address.
const contractIdentifier = (contractAddress: string) => {
  if (contractAddress === contractAddresses.poapAddress) {
    return "Poap";
  } else if (contractAddress === contractAddresses.soulboundAddress) {
    return "Soulbound";
  } else if (contractAddress === contractAddresses.consensualAddress) {
    return "Consensual";
  } else {
    return "Contract not found";
  }
};

export default contractIdentifier;
