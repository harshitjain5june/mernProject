import express, { Express, Request, Response } from 'express';
import mongoDB from './mongoose';
import dotenv from 'dotenv';
import './routes/createUser'
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'OPTIONS'], // Specify allowed methods
  optionsSuccessStatus: 204
}));

mongoDB();
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(express.json());

app.use('/api', require('./routes/createUser'))
app.use('/api', require('./routes/displayFoodItems'))

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});