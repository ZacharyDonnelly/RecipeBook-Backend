import express from 'express';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = require('./models').sequelize; // import Sequelize

const PORT = process.env.SERVER_PORT;
export const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(json());
app.use(morgan('dev'));

require('./routes/signup')('/api/user', app);
require('./routes/login')('/api/auth', app);
require('./routes/testing')('/api/test', app);

export const start = () =>
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log('Server was started on port: 3000');
    });
  });
