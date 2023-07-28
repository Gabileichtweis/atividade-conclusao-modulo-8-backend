import { notesList } from '../data/notes';
import { Database } from '../database/config/database.connection';
import { NoteEntity } from '../database/entities/note.entity';
import { Note, NoteType } from '../models/note.model';
import { User } from '../models/user.model';
import { UserRepository } from './user.repository';

interface ListNotesProps {
  email: string;
  type?: NoteType;
}

export class NotesRepository {
  private connection = Database.connection;
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
    console.log(result);
  }

  public findIndex(id: string) {
    return notesList.findIndex((note) => note.id === id);
  }

  public getNote(id: string) {
    return notesList.find((note) => note.id === id);
  }

  public async delete(index: string) {
    const result = await this.repository.delete(index);

    return result.affected ?? 0;
  }

  private mapRowToModel(row: any) {
    const user = new User('gabriela@teste.com.br', '1234567');

    return Note.create(row, user);
  }
}
