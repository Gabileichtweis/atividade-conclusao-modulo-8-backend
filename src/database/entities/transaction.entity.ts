import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('recados')
export class TransactionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  /*  @Column({
    enum: TransactionType,
  })
  type: string; */

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
  idUsuario: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'id_user',
  })
  user: UserEntity;
}
