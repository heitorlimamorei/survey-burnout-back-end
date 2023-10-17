import { firebaseTimesStampType } from "./utils-types";

export interface INewSurveyAnswerProps {
    questionId: string;
    value: number;
}

export interface ISurveyAnswerProps {
    id: string;
    questionId: string;
    value: number;
}

export interface ISurveyAnsweredProps {
    id: string;
    author: string;
    timestamp: firebaseTimesStampType;
    result: number;
    answers: ISurveyAnswerProps[];
}

export interface ISurveyAnsweredWithoutAnswersProps {
    id: string;
    author: string;
    timestamp: firebaseTimesStampType;
    result: number;
}

export interface INewSurveyAnsweredProps {
    author: string;
    result: number;
    answers: INewSurveyAnswerProps[];
}