import { Request, Response, Router } from 'express';
import { UserMiddleware } from '../validators/user.validator';
import { noteRoutes } from '../../note/routes/note.routes';
import { UserControllerFactory } from '../util/user.factory';

export const appRoutes = () => {
  const app = Router();

  const userController = new UserControllerFactory();

  app.get('/', (req: Request, res: Response) =>
    userController.listUserFactory.listUser(req, res)
  );

  app.get('/:email', (req: Request, res: Response) =>
    userController.getUserFactory.getUser(req, res)
  );

  app.post(
    '/',
    [UserMiddleware.validateUserEmail, UserMiddleware.validateUserPassword],
    (req: Request, res: Response) =>
      userController.createUserFactory.createUser(req, res)
  );

  /* app.post('/login', new UserController().login); */

  app.use('/:email/notes', noteRoutes());

  return app;
};
