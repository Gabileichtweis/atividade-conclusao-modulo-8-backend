import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { NoteEntity } from './note.entity';

@Entity('usuario')
export class UserEntity {
  @PrimaryColumn()
  email: string;

  @Column()
  senha: string;

  @Column({
    name: 'dthr_criacao',
  })
  dthrCriacao: Date;

  @OneToMany(() => NoteEntity, (note) => note.usuario)
  recados: NoteEntity[];
}
