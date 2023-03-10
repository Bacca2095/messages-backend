import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

import { AuthModule } from '@auth/auth.module';
import { CampaignModule } from '@campaign/campaign.module';
import { ClientModule } from '@client/client.module';
import { databaseConfigFactory } from '@config/database/database.config';
import {
  EnvVariables,
  NodeEnv,
  envValidationSchema,
} from '@config/environment';
import { ContactModule } from '@contact/contact.module';
import { CustomFieldModule } from '@custom-fields/custom-field.module';
import { SmsModule } from '@sms/sms.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV}.env`,
      validationSchema: envValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseConfigFactory,
      inject: [ConfigService],
    }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    ScheduleModule.forRoot(),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transports: [
          new winston.transports.Console({
            level:
              config.get('NODE_ENV') === NodeEnv.PRODUCTION ? 'info' : 'debug',
            format: winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike(),
            ),
          }),
          new winston.transports.File({
            filename: 'logs/info.log',
            level: 'info',
          }),
          new winston.transports.File({
            filename: 'logs/errors.log',
            level: 'error',
          }),
          new winston.transports.File({
            filename: 'logs/debug.log',
            level: 'debug',
          }),
        ],
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get(EnvVariables.REDIS_HOST),
          port: config.get(EnvVariables.REDIS_PORT),
          password: config.get(EnvVariables.REDIS_PASSWORD),
        },
      }),
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          transport: {
            host: config.get(EnvVariables.EMAIL_HOST),
            port: config.get(EnvVariables.EMAIL_PORT),
            auth: {
              user: config.get(EnvVariables.EMAIL_USER),
              pass: config.get(EnvVariables.EMAIL_PASSWORD),
            },
          },
          template: {
            dir: `${process.cwd()}/dist/shared/email/templates`,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    AuthModule,
    ClientModule,
    UserModule,
    SmsModule,
    ContactModule,
    CustomFieldModule,
    CampaignModule,
  ],
  controllers: [],
  providers: [],
  exports: [WinstonModule],
})
export class AppModule {}
