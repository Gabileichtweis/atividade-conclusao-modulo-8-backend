import { UserRepository } from '../../../../../src/app/features/user/repositories/user.repository';
import { CreateUserUsecase } from '../../../../../src/app/features/user/usecases//create-user.usecase';
import { User } from '../../../../../src/app/models/user.model';
import { CacheRepository } from '../../../../../src/app/shared/database/repositories/cache.repository';
import { Database } from '../../../../../src/main/database/database.connection';
import { CacheDatabase } from '../../../../../src/main/database/redis.connection';

describe('Testes para o create-user usecase', () => {
  beforeAll(async () => {
    await Database.connect();
    await CacheDatabase.connect();

    jest.setTimeout(30000);
  });

  afterAll(async () => {
    await Database.connection.destroy();
    await CacheDatabase.connection.quit();
  });

  const createSut = () => {
    const cacheRepository = new CacheRepository();
    const userRepository = new UserRepository();

    const sut = new CreateUserUsecase(cacheRepository, userRepository);

    return sut;
  };

  const user = new User('any_email', 'any_password');

  test('deveria retornar 401 - already exists se o usuario estiver cadastrado', async () => {
    const sut = createSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(user);

    const result = await sut.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toBeDefined();
    expect(result.code).toEqual(401);
    expect(result.ok).toBe(false);
    expect(result.message).toBe('Usuário já cadastrado');
  });

  test('deveria retornar sucesso se o usuario for cadastrado', async () => {
    const sut = createSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(undefined);

    const result = await sut.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toBeDefined();
    expect(result.code).toEqual(200);
    expect(result.ok).toBe(true);
    expect(result).toHaveProperty('message', 'Usuário criado com sucesso');
    expect(result).toHaveProperty('data');
  });
});
