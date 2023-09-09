import { Database } from '../../../../../src/main/database/database.connection';
import { CacheDatabase } from '../../../../../src/main/database/redis.connection';
import request from 'supertest';
import { Server } from '../../../../../src/main/config/express.config';
import { ListUsersUsecase } from '../../../../../src/app/features/user/usecases/list-users.usecase';
import { Return } from '../../../../../src/app/shared/util/return.adapter';

describe('Testes para o list-users controller', () => {
  beforeAll(async () => {
    await Database.connect();
    await CacheDatabase.connect();

    jest.setTimeout(30000);
  });

  const createSut = () => {
    return Server.create();
  };

  test('Deveria retornar sucesso se houverem usuários para listar', async () => {
    const sut = createSut();

    jest
      .spyOn(ListUsersUsecase.prototype, 'execute')
      .mockResolvedValue(Return.success('Usuários listados com sucesso', []));

    const result = await request(sut).get('/users').send();

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(result).toHaveProperty('body');
  });

  test('deveria retornar 500 se o usecase disparar uma exceção', async () => {
    const sut = createSut();

    jest
      .spyOn(ListUsersUsecase.prototype, 'execute')
      .mockRejectedValue('Error');
    const result = await request(sut).get('/users').send();

    expect(result).toBeDefined();
    expect(result.status).toEqual(500);
  });
});
