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

export const getOwnerByPK = async (ownerUuid: string) => {
  try {
    const owner = await Owner.findByPk(ownerUuid);
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
    const ownerUuid = crypto.randomUUID();
    const owner = await Owner.create({ ownerUuid, address, email });
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const findOrCreateOwner = async (address: string) => {
  try {
    const ownerUuid = crypto.randomUUID();
    const owner = await Owner.findOrCreate({
      where: { address },
      defaults: { ownerUuid },
    });
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateOwnersEmail = async (ownerUuid: string, email: string) => {
  try {
    const owner = await Owner.update({ email }, { where: { ownerUuid } });
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};
export const updateOwnersAddress = async (
  ownerUuid: string,
  address: string
) => {
  try {
    const owner = await Owner.update({ address }, { where: { ownerUuid } });
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};
