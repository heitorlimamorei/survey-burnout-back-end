"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_2 = require("express");
dotenv_1.default.config();
const app = (0, express_1.default)();
const route = (0, express_2.Router)();
app.use(express_1.default.json());
route.get("/", (request, response) => {
    response.json({
        message: "Hello world with TypeScript (01)",
    });
});
app.use(route);
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}!`));
