import express, { Express, Request, Response } from 'express';
import AppRouter from './router/api';
import CommonRouter from './router/common';
import cors from 'cors';


const app: Express = express();
const port = 5000;


const username = encodeURIComponent(process.env.MONGO_USERNAME ?? "");
const password = encodeURIComponent(process.env.MONGO_KEY ?? "");


console.log(username, password);

app.use(cors());

app.use('api/', AppRouter);
app.use('comm/', CommonRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Typescript + Node.js + Express Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});