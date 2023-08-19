import { NoteType } from '../../../models/note.model';
import { CacheRepository } from '../../../shared/database/repositories/cache.repository';
import { Result } from '../../../shared/util/result.contract';
import { Return } from '../../../shared/util/return.adapter';
import { Usecase } from '../../../shared/util/usecase.contract';
import { NotesRepository } from '../repositories/note.respository';

interface ListNotesProps {
  email: string;
  type?: NoteType;
}

export class ListNotesUsecase implements Usecase {
  constructor(
    private cacheRepository: CacheRepository,
    private notesRepository: NotesRepository
  ) {}
  public async execute(props: ListNotesProps): Promise<Result> {
    const cacheNotes = await this.cacheRepository.get(`notes-${props.email}`);

    if (cacheNotes) {
      return Return.success('Recados listados com sucesso', cacheNotes);
    }

    let notes = await this.notesRepository.list({
      email: props.email,
      type: props.type,
    });

    const result = {
      notes: notes.map((note) => note.toJason()),
    };

    await this.cacheRepository.setEx(`notes-${props.email}`, result, 3600);

    return Return.success('Recados listados com sucesso', result);
  }
}
