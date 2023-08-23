import { NoteType } from '../../../models/note.model';
import { HttpResponse } from '../../../shared/util/http-response.adapter';
import { CreateNoteUsecase } from '../usecases/create-note.usecase';
import { Request, Response } from 'express';

export class CreateNoteController {
  constructor(private createNoteUsecase: CreateNoteUsecase) {}

  public async createNote(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const { title, description, type } = req.body;

      const newNote = await this.createNoteUsecase.execute({
        titulo: title,
        descricao: description,
        type: NoteType.overall,
        email: email,
      });

      /* const user = await new UserRepository().get(email);
    
          if (!user) {
            return HttpResponse.notFound(res, 'Usuário');
          }
    
          const newNote = await new Note(title, description, type, user);
          new NotesRepository().create(newNote);
     */
      return HttpResponse.created(res, 'Recado criado com sucesso', newNote);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
