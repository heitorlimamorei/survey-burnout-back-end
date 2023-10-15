import express from "express";
import dotenv from  'dotenv';
import SurveyRouter from "./routers/survey.router";

dotenv.config();

const app = express();

app.use(express.json());

app.use('/survey', SurveyRouter);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}!`));
