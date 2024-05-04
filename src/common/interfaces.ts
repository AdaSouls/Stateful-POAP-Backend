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
  poapToBeMinted: number;
  mintedPoaps: number;
  // state
}

export interface IOwner {
  uuid?: string;
  address: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
