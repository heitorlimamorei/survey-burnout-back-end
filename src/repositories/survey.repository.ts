import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import {
  INewSurveyAnsweredProps,
  ISurveyAnsweredProps,
  ISurveyAnswerProps,
  INewSurveyAnswerProps,
} from "../types/survey-types";
import { normalizeFirebaseRespItems } from '../utils/dataMethods';

const PromiseScheduler = async (promises: Promise<any>[]): Promise<any> => {
    return await Promise.all([...promises]);   
}

const addSuveryAnswers = async (surveyId: string, answers: INewSurveyAnswerProps[]): Promise<void> => {
  const subcollectionRef = collection(db, `surveys/${surveyId}/answers`);
  const promises = answers.map((answer) => {
    return addDoc(subcollectionRef, {
      questionId: answer.questionId,
      value: answer.value,
    });
  }); 
  await PromiseScheduler(promises);
}

const getSurveyAnswer = async (surveyId: string): Promise<ISurveyAnsweredProps> => {
  const surveyRef = doc(db, `surveys/${surveyId}`);
  const surveyResp: any = await getDoc(surveyRef);
  const anwers = collection(db, `surveys/${surveyId}/answers`);
  const answersResp: any = await getDocs(anwers);

  const anwersF: ISurveyAnswerProps[] = normalizeFirebaseRespItems(answersResp);
  return {
    id: surveyResp.id,
    ...surveyResp.data(),
    answers: [...anwersF],
  }
}


const addSurveyAnswered = async (props: INewSurveyAnsweredProps): Promise<void> => {
  const surveysRef = collection(db, `surveys`);
  const surveyRef = await addDoc(surveysRef, {
    author: props.author,
    result: props.result,
    timestamp: new Date(),
  });
  await addSuveryAnswers(surveyRef.id, props.answers);
};

export default {
  addSurveyAnswered,
  getSurveyAnswer
}