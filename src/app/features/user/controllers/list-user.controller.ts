import { Request, Response } from 'express';
import { ListUsersUsecase } from '../usecases/list-users.usecase';
import { HttpResponse } from '../../../shared/util/http-response.adapter';

export class ListUsersController {
  constructor(private listUsersUsecase: ListUsersUsecase) {}

  public async listUser(req: Request, res: Response) {
    try {
      const user = await this.listUsersUsecase.execute();

      return res.status(user.code).send(user);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
