import { CacheRepository } from '../../../../../src/app/shared/database/repositories/cache.repository';
import { Database } from '../../../../../src/main/database/database.connection';
import { CacheDatabase } from '../../../../../src/main/database/redis.connection';
import { NotesRepository } from '../../../../../src/app/features/note/repositories/note.respository';
import { UserRepository } from '../../../../../src/app/features/user/repositories/user.repository';
import { CreateNoteUsecase } from '../../../../../src/app/features/note/usecases/create-note.usecase';
import { User } from '../../../../../src/app/models/user.model';
import { NoteType } from '../../../../../src/app/models/note.model';

describe('Testa create-note usecase', () => {
  beforeAll(async () => {
    await Database.connect();
    await CacheDatabase.connect();

    jest.setTimeout(30000);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await Database.connection.destroy();
    await CacheDatabase.connection.quit();
  });

  const createSut = () => {
    const cacheRepository = new CacheRepository();
    const notesRepository = new NotesRepository();
    const userRepository = new UserRepository();

    const sut = new CreateNoteUsecase(
      cacheRepository,
      notesRepository,
      userRepository
    );

    return sut;
  };

  const user = new User('any_email', 'any_password');

  test('deveria retornar usario nao encontrado se nao existir usuario', async () => {
    const sut = createSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(undefined);

    const result = await sut.execute({
      email: user.email,
      titulo: 'any_title',
      descricao: 'any_description',
      type: NoteType.overall,
    });

    expect(result).toBeDefined();
    expect(result.code).toBe(404);
    expect(result.ok).toBe(false);
    expect(result.message).toEqual('Usuário não encontrado');
    expect(result).not.toHaveProperty('data');
  });

  test('deveria retornar recado criado com sucesso quando criar o recado', async () => {
    const sut = createSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(user);

    const result = await sut.execute({
      email: user.email,
      titulo: 'any_title',
      descricao: 'any_description',
      type: NoteType.overall,
    });

    expect(result).toBeDefined();
    expect(result.code).toBe(200);
    expect(result.ok).toBe(true);
    expect(result.message).toEqual('Recado criado com sucesso');
    expect(result).toHaveProperty('data');
  });
});
