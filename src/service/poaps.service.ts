import { Poap } from "@/model";

export const getAllPoaps = async () => {
  try {
    const poaps = await Poap.findAll();
    return poaps;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Check if it should be here or in event's service
export const getAllPoapsByEvent = async (eventId: string) => {
  try {
    const poaps = await Poap.findAll({ where: { eventId } });
    return poaps;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Check if it should be here or in owner's service
export const getAllPoapsByOwnersAddress = async (ownerId: string) => {
  try {
    const poaps = await Poap.findAll({ where: { ownerId } });
    return poaps;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getPoapByAddress = async (address: string) => {
  try {
    const poap = await Poap.findOne({ where: { address } });
    return poap;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getPoapByPK = async (address: string) => {
  try {
    const poap = await Poap.findByPk(address);
    return poap;
  } catch (error) {
    console.log("Error: ", error);
  }
};
