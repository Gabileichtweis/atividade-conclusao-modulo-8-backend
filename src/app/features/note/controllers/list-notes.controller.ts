import { NoteType } from '../../../models/note.model';
import { HttpResponse } from '../../../shared/util/http-response.adapter';
import { ListNotesUsecase } from '../usecases/list-notes.usecase';
import { Request, Response } from 'express';

export class ListNotesController {
  constructor(private listNotesUsecase: ListNotesUsecase) {}

  public async listNotes(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const { type } = req.query;

      const notes = await this.listNotesUsecase.execute({
        email: email,
        type: type as NoteType,
      });

      /* let notes = await new NotesRepository().list({
            email: email,
            type: type as NoteType,
          }); */

      return HttpResponse.success(res, 'Recados listados com sucesso', notes);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
