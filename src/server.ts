// import jwt from('jsonwebtoken');
import bcrypt from 'bcrypt';
import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = require('./models').sequelize; // import Sequelize

const { Article, User } = sequelize.models;

const PORT = process.env.SERVER_PORT;
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
app.post('/user', async ({ body }, res) => {
  try {
    const hashedPassword = await bcrypt.hash(body.hash, 10, async function(err, hash) {
      const user = await User.create({ email: body.email, hash });
    });
  } catch (err) {
    console.error(err);
  }
  res.send({ success: true });
});
// development database object creating route test
app.post(
  '/api/create/test',
  async (
    req: { body: { hash: string; email: string } },
    res: { send: (arg0: { created: boolean }) => void },
  ) => {
    try {
      await User.create({
        email: req.body.email,
        hash: req.body.hash,
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
