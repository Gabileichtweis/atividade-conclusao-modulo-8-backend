import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('usuario')
export class UserEntity {
  @PrimaryColumn()
  email: string;

  @Column()
  senha: string;

  @Column({
    name: 'dthr_criacao',
    default: 'now()',
  })
  dthrCriacao: Date;
}
