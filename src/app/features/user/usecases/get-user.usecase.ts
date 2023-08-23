import { CacheRepository } from '../../../shared/database/repositories/cache.repository';
import { Result } from '../../../shared/util/result.contract';
import { Return } from '../../../shared/util/return.adapter';
import { Usecase } from '../../../shared/util/usecase.contract';
import { UserRepository } from '../repositories/user.repository';

export class GetUserUsecase implements Usecase {
  constructor(
    private userRepository: UserRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(email: string): Promise<Result> {
    const cacheUsers = await this.cacheRepository.get(`user-${email}`);

    if (cacheUsers) {
      return Return.success('Usuários listados com sucesso', cacheUsers);
    }

    const user = await this.userRepository.get(email);

    if (!user) {
      return Return.notFound('Usuário');
    }

    await this.cacheRepository.setEx(`user`, user, 3600);

    return Return.success('Usuário obtido com sucess', user);
  }
}
