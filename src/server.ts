import express from 'express';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const sequelize = require('./models').sequelize;

const PORT: string | undefined = process.env.SERVER_PORT;
const COOKIE_SECRET: string | undefined = process.env.COOKIE_SECRET;
export const app = express();

app.disable('x-powered-by');
app.use(cors({ credentials: true }));
app.use(urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));
app.use(json());
app.use(morgan('dev'));

require('./routes/signup')('/api/user', app);
require('./routes/login')('/api/auth', app);
require('./routes/recipe')('/api/new-recipe', app);
require('./routes/testing')('/api/test', app);
require('./routes/getAllRecipes')('/api/get-all', app);
require('./routes/getRecipeCategory')('/api/category', app);

export const start = () =>
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log('Server was started on port: 3006');
    });
  });
