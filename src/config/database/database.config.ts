import { ConfigService } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import { EnvConstants } from '../environment/env-constants.enum';
import { EnvVariables } from '../environment/env-variables.enum';

export const databaseConfigFactory = (
  configService: ConfigService,
): MysqlConnectionOptions => ({
  type: 'mariadb',
  host: configService.get(EnvVariables.DB_HOST),
  port: Number(configService.get(EnvVariables.DB_PORT)),
  username: configService.get(EnvVariables.DB_USERNAME),
  password: configService.get<string>(EnvVariables.DB_PASSWORD),
  database: configService.get(EnvVariables.DB_DATABASE),
  entities: [EnvConstants.TYPEORM_ENTITIES_DIR],
  // autoLoadEntities: true,
  // synchronize: true,
  logging: Boolean(configService.get<boolean>(EnvVariables.TYPEORM_LOGGING)),
  migrationsTableName: EnvConstants.TYPEORM_MIGRATIONS_TABLENAME,
  migrations: [EnvConstants.TYPEORM_MIGRATIONS_DIR],
  timezone: 'Z',
});
