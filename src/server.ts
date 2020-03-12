// import jwt from('jsonwebtoken');
// import bcrypt from('bcrypt');
import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
const sequelize = require('../models').sequelize; // import Sequelize

const PORT: number = 3000;
export const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(morgan('dev'));

// middleware section
const log = (req: any, res: any, next: () => void) => {
  console.log('loggin');
  next();
};

// routes
app.post('/api/data', log, (req: { body: any }, res: any) => {
  res.send({ message: 'hellooo' });
});
app.get('/api/data', (req: any, res: { send: (arg0: { test: boolean }) => void }) => {
  console.log(req.body);
  res.send({ test: true });
});

// server

export const start = () =>
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log('Server was started on port: 3000');
    });
  });
