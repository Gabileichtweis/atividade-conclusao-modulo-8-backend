import { Request, Response } from 'express';
import { HttpResponse } from '../../../shared/util/http-response.adapter';
import { User } from '../../../models/user.model';
import { UserRepository } from '../repositories/user.repository';

export class UserController {
  /*   public login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return HttpResponse.fieldNotProvided(res, 'E-mail');
      }

      if (!password) {
        return HttpResponse.fieldNotProvided(res, 'Senha');
      }

      const user = new UserRepository().get(email);
      if (!user) {
        return HttpResponse.invalidCredentials(res);
      }
      if (user. !== password) {
        return HttpResponse.invalidCredentials(res);
      }
      return HttpResponse.success(
        res,
        'Login realizado com sucesso',
        user.toJason()
      );
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  } */
}
