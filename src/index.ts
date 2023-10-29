import express from "express";
import dotenv from  'dotenv';
import SurveyRouter from "./routers/survey.router";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/survey', SurveyRouter);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}!`));
