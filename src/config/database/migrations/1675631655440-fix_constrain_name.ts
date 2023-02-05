import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixConstrainName1675631655440 implements MigrationInterface {
  name = 'fixConstrainName1675631655440';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`constrains\` (\`id\` int NOT NULL AUTO_INCREMENT, \`field\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`condition\` enum ('between', 'equal', 'less', 'more', 'contain') NOT NULL, \`campaignId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`constrains\` ADD CONSTRAINT \`FK_f71e2fc6351e037701da7be9cdb\` FOREIGN KEY (\`campaignId\`) REFERENCES \`campaign\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`constrains\` DROP FOREIGN KEY \`FK_f71e2fc6351e037701da7be9cdb\``,
    );
    await queryRunner.query(`DROP TABLE \`constrains\``);
  }
}
