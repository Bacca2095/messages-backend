import { MigrationInterface, QueryRunner } from "typeorm";

export class nullableResets1675648176977 implements MigrationInterface {
    name = 'nullableResets1675648176977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordExpires\` \`resetPasswordExpires\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordExpires\` \`resetPasswordExpires\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NOT NULL`);
    }

}
