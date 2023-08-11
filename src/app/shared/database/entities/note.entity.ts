import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NoteType } from '../../../models/note.model';
import { UserEntity } from './user.entity';

@Entity('recado')
export class NoteEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column({
    enum: NoteType,
  })
  type: string;

  @CreateDateColumn({
    name: 'dthr_criacao',
  })
  dthrCriacao: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    name: 'id_usuario',
  })
  user: string;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn({
    name: 'id_usuario',
  })
  usuario: UserEntity;
}
