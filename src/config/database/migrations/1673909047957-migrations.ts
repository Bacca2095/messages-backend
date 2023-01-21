import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1673909047957 implements MigrationInterface {
  name = 'migrations1673909047957';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `client` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `phoneNumber` varchar(255) NOT NULL, `defaultRegionCode` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `providerName` varchar(255) NOT NULL, UNIQUE INDEX `IDX_6436cc6b79593760b9ef921ef1` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      "CREATE TABLE `sms` (`id` int NOT NULL AUTO_INCREMENT, `message` varchar(255) NOT NULL, `status` enum ('accepted', 'scheduled', 'canceled', 'queued', 'sending', 'sent', 'failed', 'delivered', 'undelivered', 'receiving', 'received', 'read') NOT NULL DEFAULT 'accepted', `phoneNumber` varchar(255) NOT NULL, `price` int NULL, `segments` int NULL, `externalId` varchar(255) NOT NULL, `errorCode` int NULL, `errorMessage` varchar(255) NULL, `sendAt` datetime NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `clientId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'ALTER TABLE `sms` ADD CONSTRAINT `FK_95ff5c3ed80012cdb8b4114f6d7` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `sms` DROP FOREIGN KEY `FK_95ff5c3ed80012cdb8b4114f6d7`',
    );
    await queryRunner.query('DROP TABLE `sms`');
    await queryRunner.query(
      'DROP INDEX `IDX_6436cc6b79593760b9ef921ef1` ON `client`',
    );
    await queryRunner.query('DROP TABLE `client`');
  }
}
