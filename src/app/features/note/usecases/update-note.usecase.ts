import { NoteType } from '../../../models/note.model';
import { CacheRepository } from '../../../shared/database/repositories/cache.repository';
import { Result } from '../../../shared/util/result.contract';
import { Return } from '../../../shared/util/return.adapter';
import { Usecase } from '../../../shared/util/usecase.contract';
import { UserRepository } from '../../user/repositories/user.repository';
import { NotesRepository } from '../repositories/note.respository';

interface UpdateNotesProps {
  email: string;
  id: string;
  title?: string;
  description?: string;
  type?: NoteType;
}

export class UpdateNoteUsecase implements Usecase {
  constructor(
    private userRepository: UserRepository,
    private notesRepository: NotesRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(props: UpdateNotesProps): Promise<Result> {
    const user = await this.userRepository.get(props.email);

    if (!user) {
      return Return.notFound('Usuário');
    }

    const note = await this.notesRepository.getNote(props.id);

    if (!note) {
      return Return.notFound('Recado');
    }

    if (props.title) {
      note.title = props.title;
    }

    if (props.description) {
      note.description = props.description;
    }

    if (props.type) {
      note.type = props.type;
    }

    await this.notesRepository.update(note);

    await this.cacheRepository.delete(`notes-${props.email}`);
    await this.cacheRepository.delete(`note-${props.id}`);

    const notes = await this.notesRepository.list({
      email: user.email,
    });

    return Return.success(
      'Recado deletado com sucesso',
      notes.map((note) => note.toJason())
    );
  }
}
