import { Request, Response, NextFunction } from "express";
import { INewSurveyAnsweredProps } from "../types/survey-types";
import surveyService from "../services/survey.service";

export async function createNewSurveyAnswered(req: Request, res: Response, next: NextFunction) {
    try {
        const createNewSurveyAnswered: INewSurveyAnsweredProps = req.body;
        if (!createNewSurveyAnswered.author || !createNewSurveyAnswered.result || !createNewSurveyAnswered.answers) {
            throw new Error("400 - Missing required fields");
        }
           
        res.send(await surveyService.addSurveyAnswered(createNewSurveyAnswered));
    } catch (err) {
        next(err)
    }
}

export async function createNewJobSurveyAnswered(req: Request, res: Response, next: NextFunction) {
    try {
        const createNewSurveyAnswered: INewSurveyAnsweredProps = req.body;
        if (!createNewSurveyAnswered.author || !createNewSurveyAnswered.result || !createNewSurveyAnswered.answers) {
            throw new Error("400 - Missing required fields");
        }
           
        res.send(await surveyService.addJobSurveyAnswered(createNewSurveyAnswered));
    } catch (err) {
        next(err)
    }
}

export async function getSurveyAnswered(req: Request, res: Response, next: NextFunction) {
    try {
        const id: any = req.params.id;
        res.send(await surveyService.getSurveyAnswer(id))
    } catch (err) {
        next(err)
    }
}

export async function getSurveys(req: Request, res: Response, next: NextFunction) {
    try {
        res.send(await surveyService.getAllSurveys())
    } catch (err) {
        next(err)
    }
}

export async function getJobSurveys(req: Request, res: Response, next: NextFunction) {
    try {
        res.send(await surveyService.getAllJobSurveys())
    } catch (err) {
        next(err)
    }
}

export default {
    createNewSurveyAnswered,
    createNewJobSurveyAnswered,
    getSurveyAnswered,
    getSurveys,
    getJobSurveys
}