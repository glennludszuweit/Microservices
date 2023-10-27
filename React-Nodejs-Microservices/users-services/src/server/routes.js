import { User } from '#root/db/models';
import generateUUID from '#root/helpers/generateUUID';
import hashPassword from '#root/helpers/hashPassword';

const setUpRoutes = (app) => {
  app.post('/users', async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return next(new Error('Invalid'));
    }
    try {
      const newUser = await User.create({
        id: generateUUID(),
        name,
        email,
        passwordHash: hashPassword(password),
      });

      return res.json(newUser);
    } catch (error) {
      return next(error);
    }
  });

  app.get('/users', async (req, res, next) => {
    const users = await User.findAll();
    return res.json(users);
  });
};

export default setUpRoutes;
