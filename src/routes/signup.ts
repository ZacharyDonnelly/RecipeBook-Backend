import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { requestLogger } from '../middleware';

const sequelize = require('../models').sequelize;
const { User } = sequelize.models;
dotenv.config();

module.exports = function(route: string, app: any) {
  app.post(
    route,
    requestLogger,
    async (
      req: { body: { password: string; email: string } },
      res: { status: (arg0: number) => void; send: (arg0: { success: boolean }) => void },
    ) => {
      try {
        // salting and hashing password
        const hashedPassword = await bcrypt.hash(req.body.password, 10, async function(err, hash) {
          // storing hash
          const user = await User.create({ email: req.body.email, hash });
        });
        res.status(200);
        res.send({ success: true });
      } catch (err) {
        res.status(403);
        res.send({ success: false });
      }
    },
  );
};
