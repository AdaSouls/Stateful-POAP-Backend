import { Owner } from "../model";

export const getAllOwners = async (offset: number, limit: number) => {
  try {
    const owners = await Owner.findAll({ offset, limit });
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

export const getOwnerByEmail = async (email: string) => {
  try {
    const owner = await Owner.findOne({ where: { email } });
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getOwnerByPK = async (uuid: string) => {
  try {
    const owner = await Owner.findByPk(uuid);
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const createNewOwner = async (address: string, email: string) => {
  try {
    if (!address && !email) {
      return { message: "Address and/or email are required" };
    }
    const uuid = crypto.randomUUID();
    const owner = await Owner.create({ uuid, address, email });
    console.log("🚀 ~ createNewOwner ~ owner:", owner);
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateOwnersEmail = async (uuid: string, email: string) => {
  try {
    const owner = await Owner.update({ email }, { where: { uuid } });
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};
export const updateOwnersAddress = async (uuid: string, address: string) => {
  try {
    const owner = await Owner.update({ address }, { where: { uuid } });
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};
