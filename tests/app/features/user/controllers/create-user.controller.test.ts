import { Database } from '../../../../../src/main/database/database.connection';
import { CacheDatabase } from '../../../../../src/main/database/redis.connection';
import request from 'supertest';
import { Server } from '../../../../../src/main/config/express.config';
import { CreateUserUsecase } from '../../../../../src/app/features/user/usecases/create-user.usecase';
import { User } from '../../../../../src/app/models/user.model';
import { UserRepository } from '../../../../../src/app/features/user/repositories/user.repository';

describe('Testes para o create-user controller', () => {
  beforeAll(async () => {
    await Database.connect();
    await CacheDatabase.connect();

    jest.setTimeout(30000);
  });

  afterAll(async () => {
    await Database.connection.destroy();
    await CacheDatabase.connection.quit();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  const createSut = () => {
    return Server.create();
  };

  const createUser = async (user: User) => {
    const repository = new UserRepository();
    await repository.create(user);
  };

  test('Deveria retornar usuario já cadastrado se o email do usuário já estiver cadastrado', async () => {
    const sut = createSut();
    const user = new User('any_email', 'any_password');

    await createUser(user);

    const result = await request(sut).post('/users').send({
      email: 'any_email',
      password: 'any_password',
    });

    expect(result).toBeDefined();
    expect(result.ok).toBe(false);
    expect(result.status).toBe(401);
  });

  test('Deveria retornar sucesso se o usuário for criado com sucesso', async () => {
    const sut = createSut();

    const result = await request(sut).post('/users').send({
      email: 'new_email',
      password: 'new_password',
    });

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(result).toHaveProperty('body');
  });

  test('deveria retornar 500 se o usecase disparar uma exceção', async () => {
    const sut = createSut();

    jest
      .spyOn(CreateUserUsecase.prototype, 'execute')
      .mockRejectedValue('Error');

    const result = await request(sut).post('/users').send({
      email: 'any_email',
      password: 'any_password',
    });

    expect(result).toBeDefined();
    expect(result.status).toEqual(500);
  });
});
