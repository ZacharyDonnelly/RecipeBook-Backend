// import jwt from('jsonwebtoken');
// import bcrypt from('bcrypt');
import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
const sequelize = require('./models').sequelize; // import Sequelize
const { Article } = sequelize.models;

const PORT: number = 3000;
export const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(morgan('dev'));

// middleware section

// custom logging middleware to test routes
const requestLogger = (req: any, res: any, next: () => void) => {
  console.table([req.body.title, req.body.author, req.body.body]);
  next();
};

// routes
app.post(
  '/api/data',
  requestLogger,
  (req: { body: any }, res: { send: (arg0: { success: boolean }) => void }) => {
    try {
      res.send({ success: true });
    } catch (err) {
      console.error(err);
      res.send({ success: false });
    }
  },
);
// development database object creating route test
app.post(
  '/api/create/test',
  requestLogger,
  async (
    req: { body: { title: string; author: string; body: Text } },
    res: { send: (arg0: { created: boolean }) => void },
  ) => {
    try {
      await Article.create({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
      });
      res.send({ created: true });
    } catch (err) {
      console.error(err);
      res.send({ created: false });
    }
  },
);

app.get('/api/data', (req: any, res: { send: (arg0: { success: boolean }) => void }) => {
  try {
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.send({ success: false });
  }
});

// server
export const start = () =>
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log('Server was started on port: 3000');
    });
  });
