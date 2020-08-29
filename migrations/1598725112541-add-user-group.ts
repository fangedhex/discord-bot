import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserGroup1598725112541 implements MigrationInterface {
  name = "addUserGroup1598725112541";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `discordId` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `group` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `isTag` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE `group`");
    await queryRunner.query("DROP TABLE `user`");
  }
}
