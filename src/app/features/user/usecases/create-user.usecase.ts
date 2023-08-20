import { User } from '../../../models/user.model';
import { CacheRepository } from '../../../shared/database/repositories/cache.repository';
import { Result } from '../../../shared/util/result.contract';
import { Return } from '../../../shared/util/return.adapter';
import { Usecase } from '../../../shared/util/usecase.contract';
import { UserRepository } from '../repositories/user.repository';

interface CreateUserProps {
  email: string;
  password: string;
}
export class CreateUserUsecase implements Usecase {
  constructor(
    private cacheRepository: CacheRepository,
    private userRepository: UserRepository
  ) {}

  public async execute(props: CreateUserProps): Promise<Result> {
    const user = await this.userRepository.get(props.email);

    if (user) {
      return Return.alreadyExist('Usuário');
    }

    const newUser = new User(props.email, props.password);

    await this.userRepository.create(newUser);
    await this.cacheRepository.delete('user');

    return Return.success('Usuário criado com sucesso', newUser.toJason());
  }
}
