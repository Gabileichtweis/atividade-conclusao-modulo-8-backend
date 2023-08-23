import { Request, Response, Router } from 'express';
import { UserMiddleware } from '../../user/validators/user.validator';
import { NoteMiddleware } from '../validators/note.validator';
import { ListNotesController } from '../controllers/list-notes.controller';
import { NotesControllerFactory } from '../util/notes.factory';

export const noteRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  const notesController = new NotesControllerFactory();

  app.get(
    '/',
    [UserMiddleware.validateUserExists],
    (req: Request, res: Response) =>
      notesController.listNotesFactory.listNotes(req, res)
  );

  app.post(
    '/',
    [NoteMiddleware.validateFieldsCreate],
    (req: Request, res: Response) =>
      notesController.createNoteFactory.createNote(req, res)
  );

  app.delete('/:id', (req: Request, res: Response) =>
    notesController.deleteNoteFactory.deleteNote(req, res)
  );

  app.put('/:id', (req: Request, res: Response) =>
    notesController.updateNoteFactory.updateNote(req, res)
  );

  return app;
};
