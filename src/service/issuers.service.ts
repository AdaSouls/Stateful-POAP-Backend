import { FindAttributeOptions } from "sequelize";
import { Issuer } from "../model";

export const getAllIssuers = async (offset: number, limit: number) => {
  try {
    const issuers = await Issuer.findAll({ offset, limit });
    return issuers;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getAllIssuersByAddress = async (offset: number, limit: number, address: string) => {
  try {
    const issuers = await Issuer.findAll({ offset, limit, where: { address } });
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

export const getIssuerByPK = async (
  issuerUuid: string,
  options?: FindAttributeOptions | undefined
) => {
  try {
    const issuer = await Issuer.findByPk(issuerUuid, { attributes: options });
    console.log("🚀 ~ issuer:", issuer)
    return issuer;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const createNewIssuer = async (
  address: string,
  email: string,
  organization: string,
  name: string
) => {
  try {
    const issuerUuid = crypto.randomUUID();
    const issuerData = { issuerUuid, address, email, organization, name };
    const issuer = await Issuer.create(issuerData);
    console.log("🚀 ~ createNewIssuer ~ issuer:", issuer);
    return issuer;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateIssuersEmail = async (issuerUuid: string, email: string) => {
  try {
    const issuer = await Issuer.update({ email }, { where: { issuerUuid } });
    console.log("🚀 ~ updateIssuersEmail ~ issuer:", issuer)
    return issuer;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateIssuersAddress = async (
  issuerUuid: string,
  address: string
) => {
  try {
    const issuer = await Issuer.update({ address }, { where: { issuerUuid } });
    return issuer;
  } catch (error) {
    console.log("Error: ", error);
  }
};
