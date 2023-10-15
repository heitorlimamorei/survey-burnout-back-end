"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const survey_controller_1 = __importDefault(require("../controllers/survey.controller"));
const express_1 = __importDefault(require("express"));
const SurveyRouter = express_1.default.Router();
SurveyRouter.post('/', survey_controller_1.default.createNewSurveyAnswered);
exports.default = SurveyRouter;
