import surveyController from "../controllers/survey.controller";

import express from "express";

const SurveyRouter = express.Router();

SurveyRouter.post('/', surveyController.createNewSurveyAnswered);
SurveyRouter.get('/:id', surveyController.getSurveyAnswered);
SurveyRouter.get('/', surveyController.getSurveys);
SurveyRouter.get('/jobsurvey', surveyController.getJobSurveys);
SurveyRouter.post('/jobsurvey', surveyController.createNewJobSurveyAnswered);


export default SurveyRouter;