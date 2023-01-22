import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1674396078378 implements MigrationInterface {
    name = 'initial1674396078378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` varchar(255) NOT NULL, \`status\` enum ('accepted', 'scheduled', 'canceled', 'queued', 'sending', 'sent', 'failed', 'delivered', 'undelivered', 'receiving', 'received', 'read') NOT NULL DEFAULT 'accepted', \`phoneNumber\` varchar(255) NOT NULL, \`price\` float NULL, \`priceUnit\` varchar(255) NULL, \`segments\` int NULL, \`externalId\` varchar(255) NOT NULL, \`errorCode\` int NULL, \`errorMessage\` varchar(255) NULL, \`providerName\` varchar(255) NOT NULL, \`sendAt\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`clientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`emailVerified\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`phoneNumber\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`clientId\` int NULL, UNIQUE INDEX \`IDX_0f6c11be238ad75c8bd2bd0245\` (\`email\`, \`clientId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`emailVerified\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`defaultRegionCode\` enum ('CO') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_6436cc6b79593760b9ef921ef1\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sms\` ADD CONSTRAINT \`FK_95ff5c3ed80012cdb8b4114f6d7\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_56f28841fe433cf13f8685f9bc1\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_56f28841fe433cf13f8685f9bc1\``);
        await queryRunner.query(`ALTER TABLE \`sms\` DROP FOREIGN KEY \`FK_95ff5c3ed80012cdb8b4114f6d7\``);
        await queryRunner.query(`DROP INDEX \`IDX_6436cc6b79593760b9ef921ef1\` ON \`client\``);
        await queryRunner.query(`DROP TABLE \`client\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f6c11be238ad75c8bd2bd0245\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`sms\``);
    }

}
