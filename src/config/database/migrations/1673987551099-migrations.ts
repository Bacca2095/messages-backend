import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1673987551099 implements MigrationInterface {
  name = 'migrations1673987551099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)',
    );
    await queryRunner.query(
      'ALTER TABLE `user` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)',
    );
    await queryRunner.query(
      'ALTER TABLE `user` ADD `deletedAt` datetime(6) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `user` DROP FOREIGN KEY `FK_56f28841fe433cf13f8685f9bc1`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_0f6c11be238ad75c8bd2bd0245` ON `user`',
    );
    await queryRunner.query(
      'ALTER TABLE `user` CHANGE `status` `status` tinyint NOT NULL DEFAULT 1',
    );
    await queryRunner.query(
      'ALTER TABLE `user` CHANGE `clientId` `clientId` int NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `client` CHANGE `emailVerified` `emailVerified` tinyint NOT NULL DEFAULT 0',
    );
    await queryRunner.query(
      'ALTER TABLE `client` CHANGE `deletedAt` `deletedAt` datetime(6) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `sms` DROP FOREIGN KEY `FK_95ff5c3ed80012cdb8b4114f6d7`',
    );
    await queryRunner.query(
      'ALTER TABLE `sms` CHANGE `price` `price` float NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `sms` CHANGE `priceUnit` `priceUnit` varchar(255) NULL',
    );
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
      'CREATE UNIQUE INDEX `IDX_0f6c11be238ad75c8bd2bd0245` ON `user` (`email`, `clientId`)',
    );
    await queryRunner.query(
      'ALTER TABLE `user` ADD CONSTRAINT `FK_56f28841fe433cf13f8685f9bc1` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
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
      'ALTER TABLE `user` DROP FOREIGN KEY `FK_56f28841fe433cf13f8685f9bc1`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_0f6c11be238ad75c8bd2bd0245` ON `user`',
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
    await queryRunner.query(
      "ALTER TABLE `sms` CHANGE `priceUnit` `priceUnit` varchar(255) NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      "ALTER TABLE `sms` CHANGE `price` `price` float(12) NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      'ALTER TABLE `sms` ADD CONSTRAINT `FK_95ff5c3ed80012cdb8b4114f6d7` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      "ALTER TABLE `client` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      'ALTER TABLE `client` CHANGE `emailVerified` `emailVerified` tinyint NOT NULL',
    );
    await queryRunner.query(
      "ALTER TABLE `user` CHANGE `clientId` `clientId` int NULL DEFAULT 'NULL'",
    );
    await queryRunner.query(
      'ALTER TABLE `user` CHANGE `status` `status` tinyint NOT NULL',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX `IDX_0f6c11be238ad75c8bd2bd0245` ON `user` (`email`, `clientId`)',
    );
    await queryRunner.query(
      'ALTER TABLE `user` ADD CONSTRAINT `FK_56f28841fe433cf13f8685f9bc1` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `deletedAt`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `updatedAt`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `createdAt`');
  }
}
