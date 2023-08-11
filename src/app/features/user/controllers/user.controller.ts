import { Request, Response } from 'express';
import { HttpResponse } from '../../../shared/util/http-response.adapter';
import { usersList } from '../../../../data/users';
import { User } from '../../../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../../../shared/database/entities/user.entity';

export class UserController {
  public async list(req: Request, res: Response) {
    try {
      const repository = new UserRepository();
      const result = await repository.list();

      return HttpResponse.success(res, 'Users successfully listed', result);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const repository = new UserRepository();
      const result = await repository.get(email);

      if (!result) {
        return HttpResponse.notFound(res, 'User');
      }

      return HttpResponse.success(res, 'User successfully obtained', result);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await new User(email, password);

      new UserRepository().create(user);

      HttpResponse.success(
        res,
        'Usuário cadastrado com sucesso',
        user.toJason()
      );
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

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
