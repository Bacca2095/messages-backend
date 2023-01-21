import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1673914568050 implements MigrationInterface {
  name = 'migrations1673914568050';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `sms` DROP FOREIGN KEY `FK_95ff5c3ed80012cdb8b4114f6d7`',
    );
    await queryRunner.query('ALTER TABLE `sms` DROP COLUMN `price`');
    await queryRunner.query('ALTER TABLE `sms` ADD `price` float NULL');
    await queryRunner.query(
      'ALTER TABLE `sms` CHANGE `segments` `segments` int NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `sms` CHANGE `errorCode` `errorCode` int NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `sms` CHANGE `errorMessage` `errorMessage` varchar(255) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `sms` CHANGE `sendAt` `sendAt` datetime NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `sms` CHANGE `deletedAt` `deletedAt` datetime(6) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `sms` CHANGE `clientId` `clientId` int NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `client` DROP COLUMN `defaultRegionCode`',
    );
    await queryRunner.query(
      "ALTER TABLE `client` ADD `defaultRegionCode` enum ('CO') NOT NULL",
    );
    await queryRunner.query(
      'ALTER TABLE `client` CHANGE `deletedAt` `deletedAt` datetime(6) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `sms` ADD CONSTRAINT `FK_95ff5c3ed80012cdb8b4114f6d7` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `sms` DROP FOREIGN KEY `FK_95ff5c3ed80012cdb8b4114f6d7`',
    );
    await queryRunner.query(
      "ALTER TABLE `client` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      'ALTER TABLE `client` DROP COLUMN `defaultRegionCode`',
    );
    await queryRunner.query(
      'ALTER TABLE `client` ADD `defaultRegionCode` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      "ALTER TABLE `sms` CHANGE `clientId` `clientId` int NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      "ALTER TABLE `sms` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      "ALTER TABLE `sms` CHANGE `sendAt` `sendAt` datetime NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      "ALTER TABLE `sms` CHANGE `errorMessage` `errorMessage` varchar(255) NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      "ALTER TABLE `sms` CHANGE `errorCode` `errorCode` int NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      "ALTER TABLE `sms` CHANGE `segments` `segments` int NULL DEFAULT 'NULL'",
    );
    await queryRunner.query('ALTER TABLE `sms` DROP COLUMN `price`');
    await queryRunner.query(
      "ALTER TABLE `sms` ADD `price` int NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      'ALTER TABLE `sms` ADD CONSTRAINT `FK_95ff5c3ed80012cdb8b4114f6d7` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }
}
