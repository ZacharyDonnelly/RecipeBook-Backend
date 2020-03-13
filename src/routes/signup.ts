import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { requestLogger } from '../middleware';
dotenv.config();

const sequelize = require('../models').sequelize;
const { User } = sequelize.models;

module.exports = function(route: string, app: any) {
  // signup route
  app.post(
    route,
    requestLogger,
    async ({ body }: any, res: { send: (arg0: { success: boolean }) => void }) => {
      try {
        // salting and hashing password
        const hashedPassword = await bcrypt.hash(body.password, 10, async function(err, hash) {
          // storing hash
          const user = await User.create({ email: body.email, hash });
        });
        res.send({ success: true });
      } catch (err) {
        console.error(err);
        res.send({ success: false });
      }
    },
  );
};
