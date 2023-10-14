import { firebaseTimesStampType } from "../types/utils-types";

export const firestoreTimestampToDate = (
  timestamp: firebaseTimesStampType
): Date => {
  const milliseconds =
    timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
  return new Date(milliseconds);
};

export const toggleDateToJson = (date: Date) => {
  if (!(date instanceof Date))
    throw new Error("This method supports only Date");
  return date.toJSON();
};

export const toggleJsonToDate = (date: string) => {
  if (!(typeof date == "string"))
    throw new Error("This method supports only string");
  return new Date(date);
};
