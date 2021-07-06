import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1625556836962 implements MigrationInterface {
    name = 'InitialMigration1625556836962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "keywords" ("keywordText" character varying NOT NULL, CONSTRAINT "PK_b0975398c2a30e9f51c4a026c4f" PRIMARY KEY ("keywordText"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "questionTitle" character varying NOT NULL, "questionText" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "userID" uuid, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("token" character varying NOT NULL, "userUUID" uuid, CONSTRAINT "PK_4542dd2f38a61354a040ba9fd57" PRIMARY KEY ("token"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9abe3b4b255ed8b917323ba303" ON "refresh_tokens" ("userUUID") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "firstName" character varying, "lastName" character varying, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
        await queryRunner.query(`CREATE TABLE "answers" ("id" SERIAL NOT NULL, "answerText" character varying NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "questionID" integer, "userID" uuid, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_tags" ("keywordText" character varying NOT NULL, "questionId" integer NOT NULL, CONSTRAINT "PK_a38d976dede2fab5be71c731337" PRIMARY KEY ("keywordText", "questionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bfd4017f1f029c808d1163c5a1" ON "question_tags" ("keywordText") `);
        await queryRunner.query(`CREATE INDEX "IDX_944c6b5fe5501f2cab65ab3218" ON "question_tags" ("questionId") `);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_31908c5ffb01294276ef9d80c41" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_9abe3b4b255ed8b917323ba3036" FOREIGN KEY ("userUUID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_3ac111452731285c85ca2d3f722" FOREIGN KEY ("questionID") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_fc05bf60d572bf12ea7f3bcb677" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_tags" ADD CONSTRAINT "FK_bfd4017f1f029c808d1163c5a11" FOREIGN KEY ("keywordText") REFERENCES "keywords"("keywordText") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_tags" ADD CONSTRAINT "FK_944c6b5fe5501f2cab65ab32181" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_tags" DROP CONSTRAINT "FK_944c6b5fe5501f2cab65ab32181"`);
        await queryRunner.query(`ALTER TABLE "question_tags" DROP CONSTRAINT "FK_bfd4017f1f029c808d1163c5a11"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_fc05bf60d572bf12ea7f3bcb677"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_3ac111452731285c85ca2d3f722"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_9abe3b4b255ed8b917323ba3036"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_31908c5ffb01294276ef9d80c41"`);
        await queryRunner.query(`DROP INDEX "IDX_944c6b5fe5501f2cab65ab3218"`);
        await queryRunner.query(`DROP INDEX "IDX_bfd4017f1f029c808d1163c5a1"`);
        await queryRunner.query(`DROP TABLE "question_tags"`);
        await queryRunner.query(`DROP TABLE "answers"`);
        await queryRunner.query(`DROP INDEX "IDX_fe0bb3f6520ee0469504521e71"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "IDX_9abe3b4b255ed8b917323ba303"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "keywords"`);
    }

}
