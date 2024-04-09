import { Owner } from "../model";

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

export const getOwnerByPK = async (uuid: string) => {
  try {
    const owner = await Owner.findByPk(uuid);
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const createNewOwner = async (address: string, email: string) => {
  const uuid = crypto.randomUUID();
  try {
    const owner = await Owner.create({ uuid, address, email });
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateOwnersEmail = async (uuid: string, email: string) => {
  try {
    const owner = await Owner.update({ email }, { where: { uuid } })
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};
export const updateOwnersAddress = async (uuid: string, address: string) => {
  try {
    const owner = await Owner.update({ address }, { where: { uuid } })
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
};
