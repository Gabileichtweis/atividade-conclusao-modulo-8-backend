import { Request, Response } from 'express';
import { CreateUserUsecase } from '../usecases/create-user.usecase';
import { HttpResponse } from '../../../shared/util/http-response.adapter';

export class CreateUserController {
  constructor(private createUserUsecase: CreateUserUsecase) {}

  public async createUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await this.createUserUsecase.execute({
        email: email,
        password: password,
      });

      return res.status(user.code).send(user);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
