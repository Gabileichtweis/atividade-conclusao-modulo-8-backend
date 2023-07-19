import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { TransactionType } from "../../models/transaction.model";
import { UserEntity } from "./user.entity";

@Entity("transaction")
export class TransactionEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    value: number;

    @Column({
        enum: TransactionType,
    })
    type: string;

    @Column({
        name: "created_at",
    })
    createdAt: Date;

    @Column({
        name: "id_user",
    })
    idUser: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({
        name: "id_user",
    })
    user: UserEntity;
}
