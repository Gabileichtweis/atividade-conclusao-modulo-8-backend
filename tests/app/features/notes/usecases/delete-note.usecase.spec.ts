import { DeleteNoteUsecase } from '../../../../../src/app/features/note/usecases/delete-note.usecase';
import { NotesRepository } from '../../../../../src/app/features/note/repositories/note.respository';
import { CacheRepository } from '../../../../../src/app/shared/database/repositories/cache.repository';
import { Database } from '../../../../../src/main/database/database.connection';
import { CacheDatabase } from '../../../../../src/main/database/redis.connection';
import { UserRepository } from '../../../../../src/app/features/user/repositories/user.repository';
import { User } from '../../../../../src/app/models/user.model';

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
    const notesRepository = new NotesRepository();
    const userRepository = new UserRepository();

    const sut = new DeleteNoteUsecase(
      userRepository,
      notesRepository,
      cacheRepository
    );

    return sut;
  };

  const user = new User('any_email', 'any_password');

  test('Deveria retornar usuario não encontrado se o usuario não estiver cadastrado', async () => {
    const sut = createSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(undefined);

    const result = await sut.execute({
      email: 'any_email',
      id: 'a12daw5as1',
    });

    expect(result).toBeDefined();
    expect(result.ok).toBe(false);
    expect(result.code).toEqual(404);
    expect(result).toHaveProperty('message', 'Usuário não encontrado');
    expect(result).not.toHaveProperty('data');
  });

  test('Deveria retornar recado não encontrado se o id do recado não existir', async () => {
    const sut = createSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(user);
    jest.spyOn(NotesRepository.prototype, 'delete').mockResolvedValue(0);

    const result = await sut.execute({
      email: 'any_email',
      id: 'a12daw5as1',
    });

    expect(result).toBeDefined();
    expect(result.ok).toBe(false);
    expect(result.code).toEqual(404);
    expect(result).toHaveProperty('message', 'Recado não encontrado');
    expect(result).not.toHaveProperty('data');
  });

  test('Deveria retornar sucesso se o recado for deletado', async () => {
    const sut = createSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(user);
    jest.spyOn(NotesRepository.prototype, 'delete').mockResolvedValue(1);

    const result = await sut.execute({
      email: 'any_email',
      id: 'any_id',
    });

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.code).toEqual(200);
    expect(result).toHaveProperty('message', 'Recado deletado com sucesso');
    expect(result).toHaveProperty('data');
  });
});
