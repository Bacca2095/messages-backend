import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1675635674450 implements MigrationInterface {
  name = 'initial1675635674450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`contact\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`regionCode\` enum ('CO') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`clientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`contact_custom_field\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` varchar(255) NOT NULL, \`contactId\` int NULL, \`customFieldId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`custom_field\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`inputType\` enum ('TEXT', 'TEXTAREA', 'SELECT', 'DATE', 'TIME') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`clientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`emailVerified\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`phoneNumber\` varchar(255) NOT NULL, \`regionCode\` enum ('CO') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`clientId\` int NULL, UNIQUE INDEX \`IDX_0f6c11be238ad75c8bd2bd0245\` (\`email\`, \`clientId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` timestamp NOT NULL, \`amount\` decimal NOT NULL, \`clientSubscriptionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`subscription\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` decimal NOT NULL, \`smsPrice\` int NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`client-subscription\` (\`id\` int NOT NULL AUTO_INCREMENT, \`startDate\` timestamp NOT NULL, \`endDate\` timestamp NOT NULL, \`smsRemaining\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`clientId\` int NULL, \`subscriptionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`emailVerified\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`defaultRegionCode\` enum ('CO') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_6436cc6b79593760b9ef921ef1\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` varchar(255) NOT NULL, \`status\` enum ('accepted', 'scheduled', 'canceled', 'queued', 'sending', 'sent', 'failed', 'delivered', 'undelivered', 'receiving', 'received', 'read') NOT NULL DEFAULT 'accepted', \`phoneNumber\` varchar(255) NOT NULL, \`price\` float NULL, \`priceUnit\` varchar(255) NULL, \`segments\` int NULL, \`externalId\` varchar(255) NOT NULL, \`errorCode\` int NULL, \`errorMessage\` varchar(255) NULL, \`providerName\` varchar(255) NOT NULL, \`sendAt\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`clientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`campaign\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`startTime\` time NOT NULL, \`endTime\` time NOT NULL, \`days\` text NOT NULL, \`status\` enum ('pending', 'finalized', 'paused', 'sending') NOT NULL DEFAULT 'pending', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`clientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`constrains\` (\`id\` int NOT NULL AUTO_INCREMENT, \`field\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`condition\` enum ('between', 'equal', 'less', 'more', 'contain') NOT NULL, \`campaignId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact\` ADD CONSTRAINT \`FK_e99f8e5bcbccaec7b0b7ed65526\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact_custom_field\` ADD CONSTRAINT \`FK_f1cb7b553eebddf6908b308e3ee\` FOREIGN KEY (\`contactId\`) REFERENCES \`contact\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact_custom_field\` ADD CONSTRAINT \`FK_41c071903ad304892ea53a7569d\` FOREIGN KEY (\`customFieldId\`) REFERENCES \`custom_field\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_field\` ADD CONSTRAINT \`FK_1456c038f8835c6088a60af5dbf\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_56f28841fe433cf13f8685f9bc1\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_192fc09aa38cc8c0ec778d4b90d\` FOREIGN KEY (\`clientSubscriptionId\`) REFERENCES \`client-subscription\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`client-subscription\` ADD CONSTRAINT \`FK_e70fa3a0132a87e05b663d47087\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`client-subscription\` ADD CONSTRAINT \`FK_1a16a6680f64bd94f446a58ab29\` FOREIGN KEY (\`subscriptionId\`) REFERENCES \`subscription\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms\` ADD CONSTRAINT \`FK_95ff5c3ed80012cdb8b4114f6d7\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`campaign\` ADD CONSTRAINT \`FK_8b505fe88bb56324050b293d21e\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`constrains\` ADD CONSTRAINT \`FK_f71e2fc6351e037701da7be9cdb\` FOREIGN KEY (\`campaignId\`) REFERENCES \`campaign\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`constrains\` DROP FOREIGN KEY \`FK_f71e2fc6351e037701da7be9cdb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`campaign\` DROP FOREIGN KEY \`FK_8b505fe88bb56324050b293d21e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms\` DROP FOREIGN KEY \`FK_95ff5c3ed80012cdb8b4114f6d7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`client-subscription\` DROP FOREIGN KEY \`FK_1a16a6680f64bd94f446a58ab29\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`client-subscription\` DROP FOREIGN KEY \`FK_e70fa3a0132a87e05b663d47087\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_192fc09aa38cc8c0ec778d4b90d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_56f28841fe433cf13f8685f9bc1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_field\` DROP FOREIGN KEY \`FK_1456c038f8835c6088a60af5dbf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact_custom_field\` DROP FOREIGN KEY \`FK_41c071903ad304892ea53a7569d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact_custom_field\` DROP FOREIGN KEY \`FK_f1cb7b553eebddf6908b308e3ee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact\` DROP FOREIGN KEY \`FK_e99f8e5bcbccaec7b0b7ed65526\``,
    );
    await queryRunner.query(`DROP TABLE \`constrains\``);
    await queryRunner.query(`DROP TABLE \`campaign\``);
    await queryRunner.query(`DROP TABLE \`sms\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_6436cc6b79593760b9ef921ef1\` ON \`client\``,
    );
    await queryRunner.query(`DROP TABLE \`client\``);
    await queryRunner.query(`DROP TABLE \`client-subscription\``);
    await queryRunner.query(`DROP TABLE \`subscription\``);
    await queryRunner.query(`DROP TABLE \`payment\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_0f6c11be238ad75c8bd2bd0245\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`custom_field\``);
    await queryRunner.query(`DROP TABLE \`contact_custom_field\``);
    await queryRunner.query(`DROP TABLE \`contact\``);
  }
}
