import { Issuer } from "../model";

export const getAllIssuers = async (offset: number, limit: number) => {
  try {
    const issuers = await Issuer.findAll({ offset, limit });
    return issuers;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getIssuerByAddress = async (address: string) => {
  try {
    const issuer = await Issuer.findOne({ where: { address } });
    return issuer;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getIssuerByEmail = async (email: string) => {
  try {
    const issuer = await Issuer.findOne({ where: { email } });
    return issuer;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getIssuerByPK = async (uuid: string) => {
  try {
    const issuer = await Issuer.findByPk(uuid);
    return issuer;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const createNewIssuer = async (address: string, email: string, organization: string, name: string) => {
  try {
    if (!address && !email && !organization && !name) {
      return { message: "Address, email, name and organization are required" };
    }
    const uuid = crypto.randomUUID();
    const issuer = await Issuer.create({ uuid, address, email, organization });
    console.log("🚀 ~ createNewIssuer ~ issuer:", issuer);
    return issuer;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateIssuersEmail = async (uuid: string, email: string) => {
  try {
    const issuer = await Issuer.update({ email }, { where: { uuid } });
    return issuer;
  } catch (error) {
    console.log("Error: ", error);
  }
};
export const updateIssuersAddress = async (uuid: string, address: string) => {
  try {
    const issuer = await Issuer.update({ address }, { where: { uuid } });
    return issuer;
  } catch (error) {
    console.log("Error: ", error);
  }
};
