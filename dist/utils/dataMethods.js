"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeFirebaseRespItems = void 0;
const normalizeFirebaseRespItems = (items) => {
    let normalized = [];
    items.forEach((item) => normalized.push(Object.assign({ id: item.id }, item.data())));
    return normalized;
};
exports.normalizeFirebaseRespItems = normalizeFirebaseRespItems;
