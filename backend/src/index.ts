import express, { Express, Request, Response } from 'express';
import mongoDB from './mongoose';
import dotenv from 'dotenv';
import './routes/createUser'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
mongoDB();
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(express.json());

app.use('/api', require('./routes/createUser'))

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});