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
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const config_1 = require("../firebase/config");
const dataMethods_1 = require("../utils/dataMethods");
const PromiseScheduler = (promises) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all([...promises]);
});
const addSuveryAnswers = (surveyId, answers) => __awaiter(void 0, void 0, void 0, function* () {
    const subcollectionRef = (0, firestore_1.collection)(config_1.db, `surveys/${surveyId}/answers`);
    const promises = answers.map((answer) => {
        return (0, firestore_1.addDoc)(subcollectionRef, {
            questionId: answer.questionId,
            value: answer.value,
        });
    });
    yield PromiseScheduler(promises);
});
const getSurveyAnswer = (surveyId) => __awaiter(void 0, void 0, void 0, function* () {
    const surveyRef = (0, firestore_1.doc)(config_1.db, `surveys/${surveyId}`);
    const surveyResp = yield (0, firestore_1.getDoc)(surveyRef);
    const anwers = (0, firestore_1.collection)(config_1.db, `surveys/${surveyId}/answers`);
    const answersResp = yield (0, firestore_1.getDocs)(anwers);
    const anwersF = (0, dataMethods_1.normalizeFirebaseRespItems)(answersResp);
    return Object.assign(Object.assign({ id: surveyResp.id }, surveyResp.data()), { answers: [...anwersF] });
});
const getOnlyAnswers = (surveyId) => __awaiter(void 0, void 0, void 0, function* () {
    const anwers = (0, firestore_1.collection)(config_1.db, `surveys/${surveyId}/answers`);
    const answersResp = yield (0, firestore_1.getDocs)(anwers);
    return {
        id: surveyId,
        answers: [...(0, dataMethods_1.normalizeFirebaseRespItems)(answersResp)]
    };
});
const getSurveys = () => __awaiter(void 0, void 0, void 0, function* () {
    const surveysRef = (0, firestore_1.collection)(config_1.db, `surveys`);
    const surveysResp = yield (0, firestore_1.getDocs)(surveysRef);
    const anwersWithoutAnswers = (0, dataMethods_1.normalizeFirebaseRespItems)(surveysResp);
    let surveysAnwersPromises = [];
    anwersWithoutAnswers.forEach((answer) => {
        surveysAnwersPromises.push(getOnlyAnswers(answer.id));
    });
    const answersResp = yield PromiseScheduler(surveysAnwersPromises);
    const surveysF = answersResp.map((c) => {
        const survey = anwersWithoutAnswers.find((s) => s.id === c.id);
        if (!(survey === null || survey === void 0 ? void 0 : survey.author))
            throw new Error('Survey not in shape');
        return Object.assign(Object.assign({}, survey), { answers: [...c.answers] });
    });
    return surveysF ? surveysF : [];
});
const addSurveyAnswered = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const surveysRef = (0, firestore_1.collection)(config_1.db, `surveys`);
    const surveyRef = yield (0, firestore_1.addDoc)(surveysRef, {
        author: props.author,
        result: props.result,
        timestamp: new Date(),
    });
    yield addSuveryAnswers(surveyRef.id, props.answers);
});
exports.default = {
    addSurveyAnswered,
    getSurveyAnswer,
    getSurveys
};
