import { ListNotesUsecase } from '../../../../../src/app/features/note/usecases/list-notes.usecase';
import { NotesRepository } from '../../../../../src/app/features/note/repositories/note.respository';
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
    const notesRepository = new NotesRepository();

    const sut = new ListNotesUsecase(cacheRepository, notesRepository);

    return sut;
  };

  test('Deveria retornar sucesso se houverem recados em cache para listar', async () => {
    const sut = createSut();

    jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(true);

    const result = await sut.execute({
      email: 'any_email',
    });

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.code).toEqual(200);
    expect(result).toHaveProperty('message', 'Recados listados com sucesso');
    expect(result).toHaveProperty('data');
  });

  test('Deveria retornar sucesso se houverem recados sem cache para listar', async () => {
    const sut = createSut();

    jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(undefined);
    jest.spyOn(CacheRepository.prototype, 'setEx').mockResolvedValue();

    const result = await sut.execute({
      email: 'any_email',
    });

    expect(result).toBeDefined();
    expect(result.ok).toBe(true);
    expect(result.code).toEqual(200);
    expect(result).toHaveProperty('message', 'Recados listados com sucesso');
    expect(result).toHaveProperty('data');
  });
});
