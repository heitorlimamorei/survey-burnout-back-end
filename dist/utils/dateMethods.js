"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleJsonToDate = exports.toggleDateToJson = exports.firestoreTimestampToDate = void 0;
const firestoreTimestampToDate = (timestamp) => {
    const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
    return new Date(milliseconds);
};
exports.firestoreTimestampToDate = firestoreTimestampToDate;
const toggleDateToJson = (date) => {
    if (!(date instanceof Date))
        throw new Error("This method supports only Date");
    return date.toJSON();
};
exports.toggleDateToJson = toggleDateToJson;
const toggleJsonToDate = (date) => {
    if (!(typeof date == "string"))
        throw new Error("This method supports only string");
    return new Date(date);
};
exports.toggleJsonToDate = toggleJsonToDate;
