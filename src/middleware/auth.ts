import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = require('../models').sequelize;
const { User } = sequelize.models;
//@ts-ignore
const SECRET: string = process.env.JWT_SECRET;

export const authValidation = (
  req: { headers: { [x: string]: any }; body: { email: string; headers: any } },
  res: { status: (arg0: number) => void; send: (arg0: string) => void; locals: any },
  next: () => void,
) => {
  const authHeader = req.body.headers.Authorization;
  // @ts-ignore
  if (typeof authHeader === 'undefined' || !authHeader.includes('Bearer')) {
    res.status(403);
    res.send('Invalid credentials');
    return;
  }

  const bearer = authHeader.split('Bearer')[1];

  try {
    const decodedToken = jwt.verify(
      bearer.replace(' ', ''),
      SECRET,
      async (err: any, payload: any) => {
        console.log(payload.email);
        await User.findOne({
          where: {
            email: payload.email,
          },
        }).catch((err: any) => {
          res.status(405);
          console.error(err);
        });
      },
    );
  } catch (err) {
    res.status(405);
    res.send('Invalid credentials');

    return;
  }
  next();
};
