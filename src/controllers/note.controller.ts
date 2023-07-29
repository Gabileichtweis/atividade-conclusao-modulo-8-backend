import { Request, Response } from 'express';
import { HttpResponse } from '../util/http-response.adapter';
import { Note, NoteType } from '../models/note.model';
import { UserRepository } from '../repositories/user.repository';
import { NotesRepository } from '../repositories/note.respository';

export class NotesController {
  public async listNotes(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const { type } = req.query;

      let notes = await new NotesRepository().list({
        email: email,
        type: type as NoteType,
      });

      return HttpResponse.success(
        res,
        'Recados listados com sucesso',
        notes.map((note) => note.toJason())
      );
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async createNote(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const { title, description, type } = req.body;

      const user = await new UserRepository().get(email);

      if (!user) {
        return HttpResponse.notFound(res, 'Usuário');
      }

      const newNote = await new Note(title, description, type, user);
      new NotesRepository().create(newNote);

      return HttpResponse.created(
        res,
        'Recado criado com sucesso',
        newNote.toJason()
      );
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async deleteNote(req: Request, res: Response) {
    try {
      const { email, id } = req.params;

      const user = await new UserRepository().get(email);

      if (!user) {
        return HttpResponse.notFound(res, 'Usuário');
      }

      const noteRepository = new NotesRepository();
      const deletedNotes = await noteRepository.delete(id);

      if (deletedNotes == 0) {
        return HttpResponse.notFound(res, 'Recado');
      }

      const notes = await noteRepository.list({
        email,
      });

      return HttpResponse.success(
        res,
        'Recado deletado com sucesso',
        notes.map((notes) => notes.toJason())
      );
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public async updateNote(req: Request, res: Response) {
    try {
      const { email, id } = req.params;
      const { title, description, type } = req.body;

      const user = new UserRepository().get(email);

      if (!user) {
        return HttpResponse.notFound(res, 'Usuário');
      }

      const noteRepository = new NotesRepository();

      const note = await noteRepository.getNote(id);

      if (!note) {
        return HttpResponse.notFound(res, 'Recado');
      }

      if (title) {
        note.title = title;
      }

      if (description) {
        note.description = description;
      }

      if (type) {
        note.type = type as NoteType;
      }

      await noteRepository.update(note);

      const notes = await noteRepository.list({
        email,
      });

      return HttpResponse.created(
        res,
        'Recado atualizado com sucesso',
        notes.map((note) => note.toJason())
      );
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
