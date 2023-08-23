import { Note, NoteType } from '../../../models/note.model';
import { CacheRepository } from '../../../shared/database/repositories/cache.repository';
import { Result } from '../../../shared/util/result.contract';
import { Return } from '../../../shared/util/return.adapter';
import { Usecase } from '../../../shared/util/usecase.contract';
import { UserRepository } from '../../user/repositories/user.repository';
import { NotesRepository } from '../repositories/note.respository';

interface CreateNotesProps {
  titulo: string;
  descricao: string;
  type: NoteType;
  email: string;
}

export class CreateNoteUsecase implements Usecase {
  constructor(
    private cacheRepository: CacheRepository,
    private notesRepository: NotesRepository,
    private userRepository: UserRepository
  ) {}

  public async execute(props: CreateNotesProps): Promise<Result> {
    const user = await this.userRepository.get(props.email);

    if (!user) {
      return Return.notFound('Usuário');
    }

    const note = new Note(
      props.titulo,
      props.descricao,
      NoteType.overall,
      user
    );

    await this.notesRepository.create(note);
    await this.cacheRepository.delete(`notes-${props.email}`);

    return Return.success('Recado criado com sucesso', note.toJason());
  }
}
