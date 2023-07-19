import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { TransactionEntity } from "./transaction.entity";

@Entity("user")
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    cpf: number;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column()
    password: string;

    @Column({
        name: "created_at",
    })
    createdAt: Date;

    @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
    transactions: TransactionEntity[];
}
