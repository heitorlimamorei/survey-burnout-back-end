import express from "express";
import dotenv from "dotenv";
import { Router, Request, Response } from "express";

dotenv.config();

const app = express();
const route = Router();

app.use(express.json());

route.get("/", (request: Request, response: Response) => {
  response.json({
    message: "Hello world with TypeScript (01)",
  });
});

app.use(route);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}!`));
