import { UserRepository } from '../../../../../src/app/features/user/repositories/user.repository';
import { ListUsersUsecase } from '../../../../../src/app/features/user/usecases/list-users.usecase';
import { User } from '../../../../../src/app/models/user.model';
import { CacheRepository } from '../../../../../src/app/shared/database/repositories/cache.repository';
import { Database } from '../../../../../src/main/database/database.connection';
import { CacheDatabase } from '../../../../../src/main/database/redis.connection';

describe('Testes para o list-users usecase', () => {
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

    const sut = new ListUsersUsecase(cacheRepository, userRepository);

    return sut;
  };

  test('Deveria retornar sucesso se houver usuário em cache para listar', async () => {
    const sut = createSut();

    const user: User = new User('any_email', 'any_passord');

    jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(user);

    const result = await sut.execute();

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.code).toEqual(200);
    expect(result).toHaveProperty('message', 'Usuários listados com sucesso');
    expect(result).toHaveProperty('data');
  });

  test('Deveria retornar sucesso se houver usuário para listar', async () => {
    const sut = createSut();

    const user: User = new User('any_email', 'any_passord');

    jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(undefined);
    jest.spyOn(CacheRepository.prototype, 'setEx').mockResolvedValue();

    const result = await sut.execute();

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.code).toEqual(200);
    expect(result).toHaveProperty('message', 'Usuários listados com sucesso');
    expect(result).toHaveProperty('data');
  });
});
