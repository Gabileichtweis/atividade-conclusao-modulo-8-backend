import { Request, Response } from 'express';
import { HttpResponse } from '../../../shared/util/http-response.adapter';
import { UpdateNoteUsecase } from '../usecases/update-note.usecase';

export class UpdateNotesController {
  constructor(private updateNoteUsecase: UpdateNoteUsecase) {}

  public async updateNote(req: Request, res: Response) {
    try {
      const { email, id } = req.params;
      const { title, description, type } = req.body;

      const notes = await this.updateNoteUsecase.execute({
        email: email,
        id: id,
        title: title,
        description: description,
        type: type,
      });

      return res.status(notes.code).send(notes);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
