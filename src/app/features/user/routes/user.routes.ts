import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserMiddleware } from '../validators/user.validator';
import { noteRoutes } from '../../note/routes/note.routes';

export const appRoutes = () => {
  const app = Router();

  app.get('/', new UserController().list);

  app.post(
    '/',
    [UserMiddleware.validateUserEmail, UserMiddleware.validateUserPassword],
    new UserController().create
  );

  /* app.post('/login', new UserController().login); */

  app.use('/:email/notes', noteRoutes());

  return app;
};
