import { UUID } from "crypto";
import { EventType, PoapType } from "./enums";

export interface IEvent {
  title: string;
  description: string;
  city?: string;
  country?: string;
  startDate: Date;
  endDate: Date;
  expiryDate?: Date;
  year?: number;
  eventUrl?: string;
  virtualEvent: boolean;
  image: string;
  secretCode?: number;
  eventTemplateId?: number;
  email: string;
  requestedCodes: number;
  privateEvent: boolean;
  purpose?: string;
  platform: string;
  eventType?: EventType;
  amountOfAttendees?: number;
  account?: string;
  poapType: PoapType;
  poapsToBeMinted: number;
  mintedPoaps: number;
  idInContract: number;
  eventUuid?: UUID;
}

export interface IOwner {
  ownerUuid?: UUID;
  address: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IIssuer {
  issuerUuid?: UUID;
  address: string;
  email: string;
  name: string;
  organization: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPoap {
  poapUuid?: UUID;
  instance: number;
  createdAt?: Date;
  updatedAt?: Date;
}
