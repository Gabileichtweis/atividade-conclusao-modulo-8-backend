import { Request, Response } from 'express';
import { DeleteNoteUsecase } from '../usecases/delete-note.usecase';
import { Result } from '../../../shared/util/result.contract';
import { HttpResponse } from '../../../shared/util/http-response.adapter';

export class DeleteNoteController {
  constructor(private deleteNoteUsecase: DeleteNoteUsecase) {}

  public async deleteNote(req: Request, res: Response) {
    try {
      const { email, id } = req.params;

      const notes = await this.deleteNoteUsecase.execute({
        email: email,
        id: id,
      });

      return res.status(notes.code).send(notes);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
