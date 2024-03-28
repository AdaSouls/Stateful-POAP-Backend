import { Owner } from "@/model";

export const getAllOwners = async () => {
  try {
    const owners = await Owner.findAll();
    return owners;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getOwnerByAddress = async (address: string) => {
  try {
    const owner = await Owner.findOne({ where: { address } });
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getOwnerByPK = async (address: string) => {
  try {
    const owner = await Owner.findByPk(address);
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};
