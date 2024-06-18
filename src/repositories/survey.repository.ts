import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import {
  INewSurveyAnsweredProps,
  ISurveyAnsweredProps,
  ISurveyAnswerProps,
  INewSurveyAnswerProps,
  ISurveyAnsweredWithoutAnswersProps,
} from "../types/survey-types";
import { normalizeFirebaseRespItems } from '../utils/dataMethods';

interface IOnlyAnswers {
  id: string;
  answers: ISurveyAnswerProps[];
}

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

const addJobSuveryAnswers = async (surveyId: string, answers: INewSurveyAnswerProps[]): Promise<void> => {
  const subcollectionRef = collection(db, `jobs-survey/${surveyId}/answers`);
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

const getOnlyAnswers = async (surveyId: string): Promise<IOnlyAnswers> => {
  const anwers = collection(db, `surveys/${surveyId}/answers`);
  const answersResp: any = await getDocs(anwers);

  return {
    id: surveyId,
    answers: [...normalizeFirebaseRespItems(answersResp)]
  }
}

const getOnlyAnswersSurveyJob = async (surveyId: string): Promise<IOnlyAnswers> => {
  const anwers = collection(db, `jobs-survey/${surveyId}/answers`);
  const answersResp: any = await getDocs(anwers);

  return {
    id: surveyId,
    answers: [...normalizeFirebaseRespItems(answersResp)]
  }
}

const getSurveys = async (): Promise<ISurveyAnsweredProps[]> => {
  const surveysRef = collection(db, `surveys`);
  const surveysResp: any = await getDocs(surveysRef);
  const anwersWithoutAnswers: ISurveyAnsweredWithoutAnswersProps[] = normalizeFirebaseRespItems(surveysResp);

  let surveysAnwersPromises: Promise<IOnlyAnswers>[] = [];
  anwersWithoutAnswers.forEach((answer: ISurveyAnsweredWithoutAnswersProps) => {
    surveysAnwersPromises.push(getOnlyAnswers(answer.id));
  })

  const answersResp: IOnlyAnswers[] = await PromiseScheduler(surveysAnwersPromises);
  const surveysF = answersResp.map((c) => {
    const survey = anwersWithoutAnswers.find((s) => s.id === c.id);
    if(!survey?.author) throw new Error('Survey not in shape');

    return {
      ...survey,
      answers: [...c.answers]
    }
  });
  
  return surveysF ? surveysF : [];
}

const getJobSurveys = async (): Promise<ISurveyAnsweredProps[]> => {
  const surveysRef = collection(db, `jobs-survey`);
  const surveysResp: any = await getDocs(surveysRef);
  const anwersWithoutAnswers: ISurveyAnsweredWithoutAnswersProps[] = normalizeFirebaseRespItems(surveysResp);

  let surveysAnwersPromises: Promise<IOnlyAnswers>[] = [];
  anwersWithoutAnswers.forEach((answer: ISurveyAnsweredWithoutAnswersProps) => {
    surveysAnwersPromises.push(getOnlyAnswersSurveyJob(answer.id));
  })

  const answersResp: IOnlyAnswers[] = await PromiseScheduler(surveysAnwersPromises);
  const surveysF = answersResp.map((c) => {
    const survey = anwersWithoutAnswers.find((s) => s.id === c.id);
    if(!survey?.author) throw new Error('Survey not in shape');

    return {
      ...survey,
      answers: [...c.answers]
    }
  });
  
  return surveysF ? surveysF : [];
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

const addJobSurveyAnswered = async (props: INewSurveyAnsweredProps): Promise<void> => {
  const surveysRef = collection(db, `jobs-survey`);
  const surveyRef = await addDoc(surveysRef, {
    author: props.author,
    result: props.result,
    timestamp: new Date(),
  });
  await addJobSuveryAnswers(surveyRef.id, props.answers);
};

export default {
  addSurveyAnswered,
  getSurveyAnswer,
  getSurveys,
  addJobSurveyAnswered,
  getJobSurveys
}