import { CacheRepository } from '../../../shared/database/repositories/cache.repository';
import { CreateUserController } from '../controllers/create-user.controller';
import { GetUserController } from '../controllers/get-user.controller';
import { ListUsersController } from '../controllers/list-user.controller';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserUsecase } from '../usecases/create-user.usecase';
import { GetUserUsecase } from '../usecases/get-user.usecase';
import { ListUsersUsecase } from '../usecases/list-users.usecase';

export class UserControllerFactory {
  private get userRepository() {
    return new UserRepository();
  }

  private get cacheRepository() {
    return new CacheRepository();
  }

  public get listUserFactory() {
    const listUsersUsecase = new ListUsersUsecase(
      this.cacheRepository,
      this.userRepository
    );

    return new ListUsersController(listUsersUsecase);
  }

  public get getUserFactory() {
    const getUserUsecase = new GetUserUsecase(
      this.userRepository,
      this.cacheRepository
    );

    return new GetUserController(getUserUsecase);
  }

  public get createUserFactory() {
    const createUserUsecase = new CreateUserUsecase(
      this.cacheRepository,
      this.userRepository
    );

    return new CreateUserController(createUserUsecase);
  }
}
