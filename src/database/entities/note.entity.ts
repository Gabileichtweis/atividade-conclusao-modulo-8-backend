import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { NoteType } from '../../models/note.model';
import { UserEntity } from './user.entity';

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

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'id_usuario',
  })
  usuario: UserEntity;
}
