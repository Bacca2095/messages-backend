/* eslint-disable import/namespace */
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import * as Joi from '@hapi/joi';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

import { AuthModule } from '@auth/auth.module';
import { ClientModule } from '@client/client.module';
import { databaseConfigFactory } from '@config/database/database.config';
import { EnvVariables, NodeEnv } from '@config/environment';
import { SmsModule } from '@sms/sms.module';
import { UserModule } from '@user/user.module';

const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION)
    .required(),
  APP_PORT: Joi.number().required(),
  TWILIO_ACCOUNT_SID: Joi.string().required(),
  TWILIO_AUTH_TOKEN: Joi.string().required(),
  TWILIO_MESSAGING_SERVICE_SID: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});

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
    AuthModule,
    ClientModule,
    UserModule,
    SmsModule,
  ],
  controllers: [],
  providers: [],
  exports: [WinstonModule],
})
export class AppModule {}
