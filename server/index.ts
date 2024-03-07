import express, { Express, Request, Response } from 'express';
import AppRouter from './router/api';
import CommonRouter from './router/common';
import cors from 'cors';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api', AppRouter);
app.use('/comm', CommonRouter);

const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Typescript + Node.js + Express Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});