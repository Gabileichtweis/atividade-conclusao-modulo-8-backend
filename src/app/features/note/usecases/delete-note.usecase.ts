import { CacheRepository } from '../../../shared/database/repositories/cache.repository';
import { Result } from '../../../shared/util/result.contract';
import { Return } from '../../../shared/util/return.adapter';
import { UserRepository } from '../../user/repositories/user.repository';
import { NotesRepository } from '../repositories/note.respository';

interface DeleteNoteProps {
  email: string;
  id: string;
}

export class DeleteNoteUsecase {
  constructor(
    private userRepository: UserRepository,
    private noteRepository: NotesRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(props: DeleteNoteProps): Promise<Result> {
    const user = await this.userRepository.get(props.email);

    if (!user) {
      return Return.notFound('Usuário');
    }

    const deletedNote = await this.noteRepository.delete(props.id);

    if (deletedNote == 0) {
      return Return.notFound('Recado');
    }

    await this.cacheRepository.delete(`notes-${props.email}`);
    await this.cacheRepository.delete(`notes-${props.id}`);

    const notes = await this.noteRepository.list({
      email: user.email,
    });

    return Return.success(
      'Recado deletado com sucesso',
      notes.map((note) => note.toJason())
    );
  }
}
