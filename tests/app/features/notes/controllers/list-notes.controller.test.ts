import { Database } from '../../../../../src/main/database/database.connection';
import { CacheDatabase } from '../../../../../src/main/database/redis.connection';
import request from 'supertest';
import { Server } from '../../../../../src/main/config/express.config';
import { ListUsersUsecase } from '../../../../../src/app/features/user/usecases/list-users.usecase';
import { Return } from '../../../../../src/app/shared/util/return.adapter';
import { UserRepository } from '../../../../../src/app/features/user/repositories/user.repository';
import { User } from '../../../../../src/app/models/user.model';
import { NoteType } from '../../../../../src/app/models/note.model';
import { ListNotesUsecase } from '../../../../../src/app/features/note/usecases/list-notes.usecase';

describe('Testes para o list-users controller', () => {
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

  test('Deveria retornar sucesso se houverem recados para listar', async () => {
    const sut = createSut();
    const user = new User('any_email', 'any_password');

    await createUser(user);

    jest
      .spyOn(ListNotesUsecase.prototype, 'execute')
      .mockResolvedValue(Return.success('Recados listados com sucesso', []));

    const result = await request(sut).get(`/users/${user.email}/notes`).send({
      email: 'any_email',
      type: NoteType.overall,
    });

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(result).toHaveProperty('body');
  });

  test('deveria retornar 500 se o usecase disparar uma exceção', async () => {
    const sut = createSut();
    const user = new User('any_email', 'any_password');

    await createUser(user);

    jest
      .spyOn(ListNotesUsecase.prototype, 'execute')
      .mockRejectedValue('Error');
    const result = await request(sut).get(`/users/${user.email}/notes`).send();

    expect(result).toBeDefined();
    expect(result.status).toEqual(500);
  });
});
