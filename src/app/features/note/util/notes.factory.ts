import { CacheRepository } from '../../../shared/database/repositories/cache.repository';
import { UserRepository } from '../../user/repositories/user.repository';
import { CreateNoteController } from '../controllers/create-note.crontroller';
import { DeleteNoteController } from '../controllers/delete-note.controller';
import { ListNotesController } from '../controllers/list-notes.controller';
import { UpdateNotesController } from '../controllers/update-note.controller';
import { NotesRepository } from '../repositories/note.respository';
import { CreateNoteUsecase } from '../usecases/create-note.usecase';
import { DeleteNoteUsecase } from '../usecases/delete-note.usecase';
import { ListNotesUsecase } from '../usecases/list-notes.usecase';
import { UpdateNoteUsecase } from '../usecases/update-note.usecase';

export class NotesControllerFactory {
  private get userRepository() {
    return new UserRepository();
  }

  private get notesRepository() {
    return new NotesRepository();
  }

  private get cacheRepository() {
    return new CacheRepository();
  }

  public get listNotesFactory() {
    const listNotesUsecase = new ListNotesUsecase(
      this.cacheRepository,
      this.notesRepository
    );

    return new ListNotesController(listNotesUsecase);
  }

  public get createNoteFactory() {
    const createNoteUsecase = new CreateNoteUsecase(
      this.cacheRepository,
      this.notesRepository,
      this.userRepository
    );

    return new CreateNoteController(createNoteUsecase);
  }

  public get deleteNoteFactory() {
    const deleteNoteUsecase = new DeleteNoteUsecase(
      this.userRepository,
      this.notesRepository,
      this.cacheRepository
    );

    return new DeleteNoteController(deleteNoteUsecase);
  }

  public get updateNoteFactory() {
    const updateNoteUsecase = new UpdateNoteUsecase(
      this.userRepository,
      this.notesRepository,
      this.cacheRepository
    );

    return new UpdateNotesController(updateNoteUsecase);
  }
}
