import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('usuario')
export class UserEntity {
  @PrimaryColumn()
  email: string;

  @Column()
  senha: string;

  @CreateDateColumn({
    name: 'dthr_criacao',
  })
  dthrCriacao: Date;
}
