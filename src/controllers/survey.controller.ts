import { Request, Response, NextFunction } from "express";
import { INewSurveyAnsweredProps } from "../types/survey-types";
import surveyRepository from "../repositories/survey.repository";

export async function createNewSurveyAnswered(req: Request, res: Response, next: NextFunction) {
    try {
        const createNewSurveyAnswered: INewSurveyAnsweredProps = req.body;
        if (!createNewSurveyAnswered.author || !createNewSurveyAnswered.result || !createNewSurveyAnswered.answers) {
            throw new Error("400 - Missing required fields");
        }
           
        res.send(await surveyRepository.addSurveyAnswered(createNewSurveyAnswered));
    } catch (err) {
        next(err)
    }
}

export async function getSurveyAnswered(req: Request, res: Response, next: NextFunction) {
    try {
        const id: any = req.params.id;
        res.send(await surveyRepository.getSurveyAnswer(id))
    } catch (err) {
        next(err)
    }
}

export default {
    createNewSurveyAnswered,
    getSurveyAnswered
}