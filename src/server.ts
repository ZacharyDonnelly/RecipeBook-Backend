// import jwt from('jsonwebtoken');
// import bcrypt from('bcrypt');
import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

const PORT: number = 3000;
export const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(morgan('dev'));

const log = (req: any, res: any, next: () => void) => {
  console.log('loggin');
  next();
};

app.post('/data', (req: { body: any }, res: any) => {
  res.send({ message: 'hellooo' });
});
app.get('/data', (req: any, res: { send: (arg0: { test: boolean }) => void }) => {
  console.log(req.body);
  res.send({ test: true });
});

export const start = () => {
  app.listen(PORT, () => {
    console.log('Server was started on port: 3000');
  });
};
