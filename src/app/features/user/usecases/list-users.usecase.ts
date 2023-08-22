import { CacheRepository } from '../../../shared/database/repositories/cache.repository';
import { Result } from '../../../shared/util/result.contract';
import { Return } from '../../../shared/util/return.adapter';
import { Usecase } from '../../../shared/util/usecase.contract';
import { UserRepository } from '../repositories/user.repository';

export class ListUsersUsecase implements Usecase {
  constructor(
    private cacheRepository: CacheRepository,
    private userRepository: UserRepository
  ) {}
  public async execute(): Promise<Result> {
    const cacheUsers = await this.cacheRepository.get(`users`);

    if (cacheUsers) {
      return Return.success('Usuários listados com sucesso', cacheUsers);
    }

    let users = await this.userRepository.list();

    await this.cacheRepository.setEx(`users`, users, 3600);

    return Return.success('Usuários listados com sucesso', users);
  }
}
