import surveyRepository from "../repositories/survey.repository";
import { INewSurveyAnsweredProps, ISurveyAnsweredProps } from "../types/survey-types";

const addSurveyAnswered = async (newSurvey: INewSurveyAnsweredProps): Promise<void> => {
    return await surveyRepository.addSurveyAnswered(newSurvey);
}

const getSurveyAnswer = async (id: string): Promise<ISurveyAnsweredProps> => {
    return await surveyRepository.getSurveyAnswer(id);
}

const getAllSurveys = async (): Promise<ISurveyAnsweredProps[]> => {
    return await surveyRepository.getSurveys();
}

export default {
    addSurveyAnswered,
    getSurveyAnswer,
    getAllSurveys
}