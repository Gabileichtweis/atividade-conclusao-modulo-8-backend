import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1690741450184 implements MigrationInterface {
    name = 'Generate1690741450184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recados_2"."usuario" ("email" character varying NOT NULL, "senha" character varying NOT NULL, "dthr_criacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2863682842e688ca198eb25c124" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TABLE "recados_2"."recado" ("id" uuid NOT NULL, "titulo" character varying NOT NULL, "descricao" character varying NOT NULL, "type" character varying NOT NULL, "dthr_criacao" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id_usuario" character varying NOT NULL, CONSTRAINT "PK_f60545f7289a677f98f820c0c33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recados_2"."recado" ADD CONSTRAINT "FK_c9a770b975c1a5fbdbfd20e0edb" FOREIGN KEY ("id_usuario") REFERENCES "recados_2"."usuario"("email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recados_2"."recado" DROP CONSTRAINT "FK_c9a770b975c1a5fbdbfd20e0edb"`);
        await queryRunner.query(`DROP TABLE "recados_2"."recado"`);
        await queryRunner.query(`DROP TABLE "recados_2"."usuario"`);
    }

}
