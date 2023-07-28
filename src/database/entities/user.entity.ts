import { Entity, Column, PrimaryColumn } from 'typeorm';

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
}
