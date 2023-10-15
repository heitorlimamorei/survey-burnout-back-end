import surveyController from "../controllers/survey.controller";

import express from "express";

const SurveyRouter = express.Router();

SurveyRouter.post('/', surveyController.createNewSurveyAnswered);
SurveyRouter.get('/:id', surveyController.getSurveyAnswered);

export default SurveyRouter;