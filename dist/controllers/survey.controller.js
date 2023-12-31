"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSurveys = exports.getSurveyAnswered = exports.createNewSurveyAnswered = void 0;
const survey_service_1 = __importDefault(require("../services/survey.service"));
function createNewSurveyAnswered(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createNewSurveyAnswered = req.body;
            if (!createNewSurveyAnswered.author || !createNewSurveyAnswered.result || !createNewSurveyAnswered.answers) {
                throw new Error("400 - Missing required fields");
            }
            res.send(yield survey_service_1.default.addSurveyAnswered(createNewSurveyAnswered));
        }
        catch (err) {
            next(err);
        }
    });
}
exports.createNewSurveyAnswered = createNewSurveyAnswered;
function getSurveyAnswered(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            res.send(yield survey_service_1.default.getSurveyAnswer(id));
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getSurveyAnswered = getSurveyAnswered;
function getSurveys(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.send(yield survey_service_1.default.getAllSurveys());
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getSurveys = getSurveys;
exports.default = {
    createNewSurveyAnswered,
    getSurveyAnswered,
    getSurveys
};
