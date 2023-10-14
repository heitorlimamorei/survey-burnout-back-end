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
    result: number;
    answers: ISurveyAnswerProps[];
}

export interface INewSurveyAnsweredProps {
    author: string;
    result: number;
    answers: INewSurveyAnswerProps[];
}