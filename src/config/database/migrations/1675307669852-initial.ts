import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1675307669852 implements MigrationInterface {
    name = 'initial1675307669852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`custom_field\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`clientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` varchar(255) NOT NULL, \`status\` enum ('accepted', 'scheduled', 'canceled', 'queued', 'sending', 'sent', 'failed', 'delivered', 'undelivered', 'receiving', 'received', 'read') NOT NULL DEFAULT 'accepted', \`phoneNumber\` varchar(255) NOT NULL, \`price\` float NULL, \`priceUnit\` varchar(255) NULL, \`segments\` int NULL, \`externalId\` varchar(255) NOT NULL, \`errorCode\` int NULL, \`errorMessage\` varchar(255) NULL, \`providerName\` varchar(255) NOT NULL, \`sendAt\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`clientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`emailVerified\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`phoneNumber\` varchar(255) NOT NULL, \`regionCode\` enum ('CO') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`clientId\` int NULL, UNIQUE INDEX \`IDX_0f6c11be238ad75c8bd2bd0245\` (\`email\`, \`clientId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`emailVerified\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`defaultRegionCode\` enum ('CO') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_6436cc6b79593760b9ef921ef1\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`campaign\` (\`id\` int NOT NULL AUTO_INCREMENT, \`clientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`campaign_contact\` (\`id\` int NOT NULL AUTO_INCREMENT, \`contactId\` int NULL, \`campaignId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`regionCode\` enum ('CO') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`clientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact_custom_field\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` varchar(255) NOT NULL, \`contactId\` int NULL, \`customFieldId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`custom_field\` ADD CONSTRAINT \`FK_1456c038f8835c6088a60af5dbf\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sms\` ADD CONSTRAINT \`FK_95ff5c3ed80012cdb8b4114f6d7\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_56f28841fe433cf13f8685f9bc1\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`campaign\` ADD CONSTRAINT \`FK_8b505fe88bb56324050b293d21e\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`campaign_contact\` ADD CONSTRAINT \`FK_cb49cd9fc28410f741961d8bd43\` FOREIGN KEY (\`contactId\`) REFERENCES \`contact\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`campaign_contact\` ADD CONSTRAINT \`FK_8c3cc7d5cc88c8561a3c6fa0cd3\` FOREIGN KEY (\`campaignId\`) REFERENCES \`campaign\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contact\` ADD CONSTRAINT \`FK_e99f8e5bcbccaec7b0b7ed65526\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contact_custom_field\` ADD CONSTRAINT \`FK_f1cb7b553eebddf6908b308e3ee\` FOREIGN KEY (\`contactId\`) REFERENCES \`contact\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contact_custom_field\` ADD CONSTRAINT \`FK_41c071903ad304892ea53a7569d\` FOREIGN KEY (\`customFieldId\`) REFERENCES \`custom_field\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_custom_field\` DROP FOREIGN KEY \`FK_41c071903ad304892ea53a7569d\``);
        await queryRunner.query(`ALTER TABLE \`contact_custom_field\` DROP FOREIGN KEY \`FK_f1cb7b553eebddf6908b308e3ee\``);
        await queryRunner.query(`ALTER TABLE \`contact\` DROP FOREIGN KEY \`FK_e99f8e5bcbccaec7b0b7ed65526\``);
        await queryRunner.query(`ALTER TABLE \`campaign_contact\` DROP FOREIGN KEY \`FK_8c3cc7d5cc88c8561a3c6fa0cd3\``);
        await queryRunner.query(`ALTER TABLE \`campaign_contact\` DROP FOREIGN KEY \`FK_cb49cd9fc28410f741961d8bd43\``);
        await queryRunner.query(`ALTER TABLE \`campaign\` DROP FOREIGN KEY \`FK_8b505fe88bb56324050b293d21e\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_56f28841fe433cf13f8685f9bc1\``);
        await queryRunner.query(`ALTER TABLE \`sms\` DROP FOREIGN KEY \`FK_95ff5c3ed80012cdb8b4114f6d7\``);
        await queryRunner.query(`ALTER TABLE \`custom_field\` DROP FOREIGN KEY \`FK_1456c038f8835c6088a60af5dbf\``);
        await queryRunner.query(`DROP TABLE \`contact_custom_field\``);
        await queryRunner.query(`DROP TABLE \`contact\``);
        await queryRunner.query(`DROP TABLE \`campaign_contact\``);
        await queryRunner.query(`DROP TABLE \`campaign\``);
        await queryRunner.query(`DROP INDEX \`IDX_6436cc6b79593760b9ef921ef1\` ON \`client\``);
        await queryRunner.query(`DROP TABLE \`client\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f6c11be238ad75c8bd2bd0245\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`sms\``);
        await queryRunner.query(`DROP TABLE \`custom_field\``);
    }

}
