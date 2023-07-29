import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { NoteType } from '../../models/note.model';

@Entity('recado')
export class NoteEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column({
    enum: NoteType,
  })
  type: string;

  @Column({
    name: 'dthr_criacao',
  })
  dthrCriacao: Date;

  @Column({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    name: 'id_usuario',
  })
  user: string;
}
