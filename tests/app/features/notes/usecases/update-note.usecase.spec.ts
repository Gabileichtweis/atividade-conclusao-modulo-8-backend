import { UpdateNoteUsecase } from '../../../../../src/app/features/note/usecases/update-note.usecase';
import { NotesRepository } from '../../../../../src/app/features/note/repositories/note.respository';
import { CacheRepository } from '../../../../../src/app/shared/database/repositories/cache.repository';
import { Database } from '../../../../../src/main/database/database.connection';
import { CacheDatabase } from '../../../../../src/main/database/redis.connection';
import { UserRepository } from '../../../../../src/app/features/user/repositories/user.repository';
import { User } from '../../../../../src/app/models/user.model';
import { Note, NoteType } from '../../../../../src/app/models/note.model';

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

    const sut = new UpdateNoteUsecase(
      userRepository,
      notesRepository,
      cacheRepository
    );

    return sut;
  };

  const user = new User('any_email', 'any_password');

  const note = new Note('any_title', 'any_description', NoteType.overall, user);

  test('Deveria retornar usuario não encontrado se o usuario não estiver cadastrado', async () => {
    const sut = createSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(undefined);

    const result = await sut.execute({
      email: 'any_email',
      id: 'any_id',
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
    jest
      .spyOn(NotesRepository.prototype, 'getNote')
      .mockResolvedValue(undefined);

    const result = await sut.execute({
      email: 'any_email',
      id: 'any_id',
    });

    expect(result).toBeDefined();
    expect(result.ok).toBe(false);
    expect(result.code).toEqual(404);
    expect(result).toHaveProperty('message', 'Recado não encontrado');
    expect(result).not.toHaveProperty('data');
  });

  test('Deveria retornar sucesso se o recado for atualizado', async () => {
    const sut = createSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(user);
    jest.spyOn(NotesRepository.prototype, 'getNote').mockResolvedValue(note);

    const result = await sut.execute({
      email: 'any_email',
      id: 'any_id',
    });

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.code).toEqual(200);
    expect(result).toHaveProperty('message', 'Recado atualizado com sucesso');
    expect(result).toHaveProperty('data');
  });

  test('Deveria retornar sucesso se o titulo for atualizado', async () => {
    const sut = createSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(user);
    jest.spyOn(NotesRepository.prototype, 'getNote').mockResolvedValue(note);

    const result = await sut.execute({
      email: 'any_email',
      id: 'any_id',
      title: 'any_title',
    });

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.code).toEqual(200);
    expect(result).toHaveProperty('message', 'Recado atualizado com sucesso');
    expect(result).toHaveProperty('data');
  });

  test('Deveria retornar sucesso se a descricao for atualizada', async () => {
    const sut = createSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(user);
    jest.spyOn(NotesRepository.prototype, 'getNote').mockResolvedValue(note);

    const result = await sut.execute({
      email: 'any_email',
      id: 'any_id',
      description: 'any_description',
    });

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.code).toEqual(200);
    expect(result).toHaveProperty('message', 'Recado atualizado com sucesso');
    expect(result).toHaveProperty('data');
  });

  test('Deveria retornar sucesso se o tipo for atualizado', async () => {
    const sut = createSut();

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(user);
    jest.spyOn(NotesRepository.prototype, 'getNote').mockResolvedValue(note);

    const result = await sut.execute({
      email: 'any_email',
      id: 'any_id',
      type: NoteType.archived,
    });

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.code).toEqual(200);
    expect(result).toHaveProperty('message', 'Recado atualizado com sucesso');
    expect(result).toHaveProperty('data');
  });
});
