import { notesList } from '../data/notes';
import { Database } from '../database/config/database.connection';
import { NoteEntity } from '../database/entities/note.entity';
import { Note, NoteType } from '../models/note.model';
import { User } from '../models/user.model';

interface ListNotesProps {
  email: string;
  type?: NoteType;
}

export class NotesRepository {
  private repository = Database.connection.getRepository(NoteEntity);

  public async list(props: ListNotesProps) {
    const result = await this.repository.findBy({
      user: props.email,
      type: props.type,
    });

    return result.map((row) => this.mapRowToModel(row));
  }

  public async create(note: Note) {
    const noteEntity = this.repository.create({
      id: note.id,
      type: note.type,
      titulo: note.title,
      descricao: note.description,
      user: note.user.email,
    });

    const result = await this.repository.save(noteEntity);
  }

  public findIndex(id: string) {
    return notesList.findIndex((note) => note.id === id);
  }

  public async getNote(id: string) {
    const result = await this.repository.findOneBy({
      id,
    });

    if (!result) {
      return undefined;
    }

    return this.mapRowToModel(result);
  }

  public async delete(index: string) {
    const result = await this.repository.delete(index);

    return result.affected ?? 0;
  }

  public async update(note: Note) {
    await this.repository.update(
      {
        id: note.id,
      },
      {
        type: note.type,
        titulo: note.title,
        descricao: note.description,
      }
    );
  }

  private mapRowToModel(row: any) {
    const user = new User('gabriela@teste.com.br', '1234567');

    return Note.create(row, user);
  }
}
