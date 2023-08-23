import { Request, Response } from 'express';
import { GetUserUsecase } from '../usecases/get-user.usecase';
import { HttpResponse } from '../../../shared/util/http-response.adapter';

export class GetUserController {
  constructor(private getUserUsecase: GetUserUsecase) {}

  public async getUser(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const user = await this.getUserUsecase.execute(email);

      return res.status(user.code).send(user);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
