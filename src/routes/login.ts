import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const sequelize = require('../models').sequelize;
const { User } = sequelize.models;
const SECRET = process.env.JWT_SECRET;
dotenv.config();

module.exports = function(route: string, app: any) {
  app.post(
    route,
    async (
      // @ts-ignore
      req: { body: { email: string; pass: string } },
      res: {
        status: (arg0: number) => void;
        send: (arg0: { userFound?: boolean; cookie?: never }) => void;
        cookie: (
          arg0: string,
          arg1: string,
          arg2: {
            maxAge: number;
            signed: boolean;
            secure: true;
            httpOnly: true;
          },
        ) => void;
        locals: any;
      },
    ) => {
      try {
        // querying db for specific user to extract hash
        const { hash } = await User.findOne({
          where: {
            email: req.body.email,
          },
        });
        const matching = await bcrypt.compare(req.body.pass, hash);
        if (!matching) {
          res.status(403);
          res.send({ userFound: false });
        } else {
          const token = await jwt.sign(
            { email: req.body.email, issuer: 'dis', expiresIn: '120h' },
            // @ts-ignore
            SECRET,
          );
          // ! SET SECURE TO TRUE WHEN YOU GO TO PRODUCTION
          res.cookie('jwt', token, {
            httpOnly: true,
            signed: true,
            secure: true,
            maxAge: 432000000,
          });
          res.send({ cookie: token });
        }
      } catch (err) {
        res.status(403);
        res.send({ userFound: false });
        console.error(err);
      }
    },
  );
};
