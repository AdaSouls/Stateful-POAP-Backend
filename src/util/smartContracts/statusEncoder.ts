import { IEvent } from "../../common/interfaces";
import { ethers } from "ethers";

const abiEncoder = new ethers.AbiCoder();

const getTimestamp = (date: Date) => {
  return date.getTime() / 1000;
};

export const encodeStatus = (poapStatus: IEvent[]) => {
  const data = poapStatus.map((status) => {
    return {
      ...status,
      startDate: getTimestamp(status.startDate),
      endDate: getTimestamp(status.endDate),
      expiryDate: getTimestamp(
        status.expiryDate || new Date(Date.now() + 60 * 60 * 24 * 365 * 99)
      ),
    };
  });
  const encodedStatus = abiEncoder.encode(
    [
      "tuple(string title,string description,string city,string country,uint256 startDate,uint256 endDate,uint256 expiryDate,uint256 year,string eventUrl,bool virtualEvent,string image,uint256 secretCode,uint256 eventTemplateId,string email,uint256 requestedCodes,bool privateEvent,string purpose,string platform,string eventType,uint256 amountOfAttendees,string account,string poapType,uint256 poapsToBeMinted,uint256 mintedPoaps,uint256 idInContract)[]",
    ],
    [data]
  );
  return encodedStatus;
};

export const decodeStatus = (status: string) => {
  const decodedStatus = abiEncoder.decode(
    [
      "tuple(string title,string description,string city,string country,uint256 startDate,uint256 endDate,uint256 expiryDate,uint256 year,string eventUrl,bool virtualEvent,string image,uint256 secretCode,uint256 eventTemplateId,string email,uint256 requestedCodes,bool privateEvent,string purpose,string platform,string eventType,uint256 amountOfAttendees,string account,string poapType,uint256 poapsToBeMinted,uint256 mintedPoaps,uint256 idInContract)[]",
    ],
    status
  );

  const decodedArray = decodedStatus[0].map((inputArray: any) => ({
    title: inputArray[0] as string,
    description: inputArray[1] as string,
    city: inputArray[2] as string,
    country: inputArray[3] as string,
    startDate: new Date(Number(inputArray[4]) * 1000), // Convert to milliseconds
    endDate: new Date(Number(inputArray[5]) * 1000), // Convert to milliseconds
    expiryDate: new Date(Number(inputArray[6]) * 1000), // Convert to milliseconds
    year: Number(inputArray[7]),
    eventUrl: inputArray[8] as string,
    virtualEvent: inputArray[9] as boolean,
    image: inputArray[10] as string,
    secretCode: Number(inputArray[11]),
    eventTemplateId: Number(inputArray[12]),
    email: inputArray[13] as string,
    requestedCodes: Number(inputArray[14]),
    privateEvent: inputArray[15] as boolean,
    purpose: inputArray[16] as string,
    platform: inputArray[17] as string,
    eventType: inputArray[18] as string,
    amountOfAttendees: Number(inputArray[19]),
    account: inputArray[20] as string,
    poapType: inputArray[21] as string,
    poapsToBeMinted: Number(inputArray[22]),
    mintedPoaps: Number(inputArray[23]),
    idInContract: Number(inputArray[24])
  }));
  return decodedArray;
};
